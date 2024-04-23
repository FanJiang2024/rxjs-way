"use client";

import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { usePathname } from "next/navigation";

const CanvasBg = dynamic(() => import("@/components/canvas"), {
  ssr: true,
  loading: () => <Loading />,
});

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <>
      <Link
        href={"/canvas"}
        className={`fixed z-10 peer canvas hidden cursor-pointer  sm:left-[80%] text-blue-300 hover:text-blue-400 hover:underline transition-all bg-transparent sm:flex items-center gap-1 ${
          path === "/canvas" ? "sm:hidden" : ""
        }`}>
        Stars <AiOutlineArrowRight />
      </Link>
      <div
        className={`peer page-wrapper peer-[.canvas:hover]:opacity-0 
        transition-all ease-in-out duration-300 ${
          path === "/canvas" ? "hidden" : ""
        }`}>
        {children}
      </div>
      <CanvasBg />
    </>
  );
};
