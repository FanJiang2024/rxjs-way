"use client";


import React from "react";
import { useCallback } from "react";
import { AiOutlineBars } from "react-icons/ai";

export const SiderToggle = React.memo(() => {
  const handleToggle = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  return (
    <a
      href='#'
      onClick={handleToggle}
      className='toggle peer relative focus:text-sky-500'>
      <AiOutlineBars className=' cursor-pointer z-10 h-8 text-inherit' />
    </a>
  );
});

SiderToggle.displayName = "SiderToggle";