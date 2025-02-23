import path from "path";
import matter from "gray-matter";
import fs from "fs";
import { isProd } from "./utils";
import { remark } from "remark";
import html from 'remark-html';
import remarkImages from 'remark-images'


export interface FileStructure {
  id: string;
  label: string;
  subMenus?: FileStructure[] | null;
}


const parent = isProd() ? "" : "";
const postsDirectory = path.join(process.cwd(), "src", "@content");

// 递归获取目录解构
export function getDirStructure(
  dirPath: string = path.join(postsDirectory),
  ind: number = 0,
): FileStructure[] {

  if (!fs.existsSync(dirPath)) {
    dirPath = path.join(process.cwd(), parent, "posts");
    if (!fs.existsSync(dirPath)) {
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
        id: encodeURIComponent(filePath.replace(postsDirectory, "")),
        // id: Buffer.from(filePath, "utf8").toString("base64url"),
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

  return res;
}

export interface FileContent {
  content: string;
  title: string;
  date: string;
}

// 根据文件路径获取并解析markdown文件内容
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, id);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(remarkImages)
    .process(matterResult.content);
  
  
  const contentHtml = processedContent.toString();


  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
