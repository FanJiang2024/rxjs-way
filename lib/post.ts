import path from "path";
import matter from "gray-matter";
import fs from "fs";
import { Buffer } from "buffer";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { isProd } from "./utils";

const hljs = require("highlight.js/lib/core");

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript"),
);

const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: "“”‘’",

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
}).use(require("markdown-it-highlightjs"), { hljs });

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export interface FileStructure {
  id: string;
  label: string;
  subMenus?: FileStructure[] | null;
}

let memo: any = null;

const parent = isProd() ? "" : "";
const postsDirectory = path.join(process.cwd(), "_posts");

// 递归获取目录解构
export function getDirStructure(
  dirPath: string = path.join(postsDirectory),
  ind: number = 0,
): FileStructure[] {
  console.log(parent);
  if (memo) {
    // console.log("file structure hit!!");
    return memo;
  }

  if (!fs.existsSync(dirPath)) {
    dirPath = path.join(process.cwd(), parent, "posts");
    if(!fs.existsSync(dirPath)) {
      console.log(fs.readdirSync(path.join(process.cwd(), ".next"), { recursive: true }));
      return [];
    }
  }
  const res = fs
    .readdirSync(dirPath)
    .filter(
      (file) =>
        !file.endsWith(".pdf") && !!file.slice(0, file.lastIndexOf(".")),
    )
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.lstatSync(filePath);
      const fileName = file.slice(0, file.lastIndexOf("."));
      const menu = {
        // id: encodeURIComponent(filePath),
        id: Buffer.from(filePath, "utf8").toString("base64url"),
        label: stat.isDirectory() ? file : fileName,
        subMenus: stat.isDirectory() ? getDirStructure(filePath) : null,
      };

      // 把文件夹的 id 修改为 文件夹下 index.md 的 id
      if (stat.isDirectory()) {
        const { subMenus } = menu;
        const ind = subMenus?.find((item) => item.label.includes("index"));
        if (ind) menu.id = ind.id;
      }

      return menu;
    });

  memo = res;
  return res;
}

export interface FileContent {
  content: string;
  title: string;
  date: string;
}

// 根据文件路径获取并解析markdown文件内容
export const getFileContent = async (filePath: string) => {
  const fPath = Buffer.from(filePath, "base64url").toString("utf8");
  // const fPath = path.join(process.cwd(), decodeURIComponent(filePath));
  if (!fs.existsSync(fPath)) {
    return null;
  }
  const fileContent = fs.readFileSync(fPath, "utf-8");
  const matterResult = matter(fileContent);
  const content = DOMPurify.sanitize(md.render(matterResult.content));
  return {
    ...matterResult.data,
    content,
  } as FileContent;
};
