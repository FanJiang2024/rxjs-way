import { Header } from "@/components/server-side/header";
// import { ArrowsScrollingClose } from "../arrows-close-scrolling";

export const ContentWithHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div
        className='flex flex-col mx-auto items-center w-full relative box-border
        sm:w-3/5 p-2 gap-2'>
        <div className='h-10 rounded-md'>
          <Header />
        </div>

        {children}
      </div>
      {/* <ArrowsScrollingClose /> */}
    </>
  );
};
