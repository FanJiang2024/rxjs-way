"use client";

import Image from "next/image";
import Scrolling from "@public/scroll-2.webp";
import ScrollingBak from "@public/scroll.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export const ArrowsScrollingClose = () => {
  const router = useRouter();
  const path = usePathname();

  const handleBack = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.back();
  }, [router])

  return (
    <div className=' hidden sm:block'>
      {/* close icon */}
      {/* <a
        href='#'
        className='peer close top-16 right-4 h-fit -z-20 sm:z-10 sm:top-0 sm:right-[calc(20vw-2rem)] fixed transition-all bg-transparent text-sky-500 duration-500 ease-in peer-[.arrow:visible]:invisible peer-[.close:focus]:invisible'>
        <AiFillCloseCircle className='rounded-full text-2xl' />
      </a> */}

      {/* 鼠标滚轮 */}
      <Image
        className={`fixed invisible right-0 bottom-0 h-24 w-fit bg-transparent sm:top-0 transition-all duration-500 ease-in text-sky-500 ${
          path === "/canvas" ? "sm:visible" : ""
        }`}
        src={Scrolling || ScrollingBak}
        alt='scrolling'
        width={100}
        height={100}
        priority
      />

      {/* canvas 页面链接 */}
      {/* <Link
        className='top-24 z-10 arrow right-4 focus:-z-10 sm:top-28 h-fit sm:invisible sm:right-8 sm:peer-[.close:focus]:visible fixed transition-all duration-500 bg-transparent text-sky-500 ease-in'
        href='/canvas'>
        <AiOutlineArrowRight className='rounded-full text-2xl' />
      </Link> */}

      {/* 返回按钮 */}
      <div
        className='top-24 z-10 back-arrow left-4 focus:-z-10 sm:top-4 h-fit sm:invisible sm:right-8 sm:peer-[.close:focus]:visible fixed transition-all duration-500 bg-transparent text-sky-500 ease-in cursor-pointer'
        onClick={handleBack}>
        <AiOutlineArrowLeft className='rounded-full text-2xl' />
      </div>
    </div>
  );
};
