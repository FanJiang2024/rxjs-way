import "@/app/globals.css";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github.css";
import { ContentWithHeader } from "@/components/server-side/ContentWithHeader";
import { ContentWrapper } from "@/components/content-wrapper";


export const metadata = {
  title: "Programming Journal",
  description: "crazy thoughts",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className='relative'>
        {/* <ContentWithHeader>{children}</ContentWithHeader>
        <CanvasBg /> */}
        <ContentWrapper>
          <ContentWithHeader>{children}</ContentWithHeader>
        </ContentWrapper>
      </body>
    </html>
  );
};

export default Layout;
