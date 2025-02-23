
import { getDirStructure, getPostData } from "@lib/post";
import { notFound } from "next/navigation";


// Return a list of `params` to populate the [id] dynamic segment
// export async function generateStaticParams() {
//   const queue = [...getDirStructure()];
//   const posts = [];

//   while(queue.length > 0) {
//     const item = queue.shift()!;
//     posts.push(item.id);
//     if(item.subMenus) {
//       queue.push(...item.subMenus);
//     }
//   }

//   return posts.map((id) => ({
//     id,
//   }))
// }

export const dynamicParams = false



export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // alert(decodeURIComponent(id).replace(/\\/, "/"))
  // const { default: Post } = await import(`@/content/${decodeURIComponent(id).replace(/\\/, "")}`);
  const postData = await getPostData(decodeURIComponent(id));

  // console.log(Post)

  return (
    <div 
      className='markdown-body opacity-80 max-w-full w-full transition-all duration-300 ease-in box-border'
      dangerouslySetInnerHTML={{ __html: postData.contentHtml }}   
    >
    </div>
  );
}
