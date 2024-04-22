import "server-only";

import "@/app/globals.css";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github.css";
import { ContentWithHeader } from "@/components/server-side/ContentWithHeader";
import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
// import CanvasBg from "@/components/canvas";

const CanvasBg = dynamic(() => import("@/components/canvas"), {
  ssr: true,
  loading: () => <Loading />
})


export const metadata = {
  title: "Programming Journal",
  description: "crazy thoughts",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className='relative'>
        <ContentWithHeader>{children}</ContentWithHeader>
        <CanvasBg />
      </body>
    </html>
  );
};

export default Layout;
