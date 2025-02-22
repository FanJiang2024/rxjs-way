import { Header } from "@/components/server-side/header";

export const ContentWithHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div
        className='flex flex-col mx-auto items-center w-full relative box-border
        sm:w-3/5 p-2 pt-1 gap-2'>
        <div className={`h-10 rounded-md peer header-wrapper`}>
          <Header />
        </div>

        {children}
      </div>
    </>
  );
};
