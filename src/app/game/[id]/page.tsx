"use client";

import GameView, { GameViewId } from "@/components/GameView";
import { notFound } from "next/navigation";
import React, {use} from "react";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isGame = ["mineSweepers", "snake", "tetris"].includes(id);
  if (!isGame) {
    notFound();
  }
  return <GameView id={id as GameViewId} />;
}

const MemoPage = React.memo(Page);
export default MemoPage;