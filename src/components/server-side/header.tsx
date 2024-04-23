import React from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineGithub,
} from "react-icons/ai";
import Link from "next/link";
import { SiderToggle } from "@/components/sider-toggle";
import { Sider } from "@/components/server-side/sider";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className='global-header mx-auto opacity-[0.95] w-[calc(100%-1rem)] sm:w-[calc(60%-1rem)] h-12 px-2 grow flex gap-1 xs:gap-4 items-center justify-between rounded-md top-0 fixed z-50 left-1/2 -translate-x-1/2'>
      <div className='relative'>
        <SiderToggle />
        <Sider />
      </div>

      <h2 className='font-bold text-xl xs:text-2xl grow text-center'>
        <Link href='/'>Programming Journal</Link>
      </h2>

      <div className='grow-0 flex gap-1 xs:gap-4'>
        <a
          className='relative'
          href='https://github.com/FanJiang2024'
          target='_blank'>
          <AiOutlineGithub className='text-2xl' />
        </a>
      </div>
    </div>
  );
};

// set display name
Header.displayName = "Header";
