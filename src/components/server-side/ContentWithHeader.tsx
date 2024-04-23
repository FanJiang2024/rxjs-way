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
        sm:w-3/5 p-2 gap-2
        bg-[rgba(236,231,231,0.4)]'>
        <div className={`h-10 rounded-md peer header-wrapper`}>
          <Header />
        </div>

        {children}
      </div>
    </>
  );
};
