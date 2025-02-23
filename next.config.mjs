import createMDX from '@next/mdx';
import path from "path";
import {remark} from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';

// const repo = "https://jiangfan233.github.io/rxjs-way";
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const isProd = process.env.NODE_ENV === "production";

if (isGithubActions) {
  // 去掉 `<owner>/`
  console.log("GITHUB_REPOSITORY: ", process.env.GITHUB_REPOSITORY);
}

/** @type {import('next').NextConfig} */
const nextConfig = (...rest) => {
  return {
    // experimental: {
    //   serverActions: true,
    // },
    // distDir: "docs",
    
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below

    reactStrictMode: false,
    output: process.env.NEXT_PUBLIC_OUTPUT || undefined,
    compiler: {
      // removeConsole: isProd,
    },
    cleanDistDir: true,
    // swcMinify: true,
    env: {},
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
    ) => {
      // isServer &&
        // config.plugins.push(
        //   new CopyPlugin({
        //     patterns: [
        //       {
        //         from: "./posts",
        //         to: "./static/chunks/posts",
        //       },
        //     ],
        //   }),
        // );

      return config;
    },
  };
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // 使用 remark 插件
  remarkPlugins: [
    remarkHtml,    // 将 Markdown 转换为 HTML
    remarkPrism,
  ]
})

export default withMDX(nextConfig);