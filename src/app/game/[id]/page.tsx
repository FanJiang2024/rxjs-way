"use client";

import GameView, { GameViewId } from "@/components/GameView";
import { notFound } from "next/navigation";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  const isGame = ["mineSweepers", "snake", "tetris"].includes(params.id);
  if (!isGame) {
    notFound();
  }
  return <GameView id={params.id as GameViewId} />;
}

const MemoPage = React.memo(Page);
export default MemoPage;