"use client";

import { Loading } from "@/components/loading";
import React, { Suspense } from "react";

const mineSweepers = React.lazy(() => import(`@/games/mineSweepers/view`));
const snake = React.lazy(() => import(`@/games/snake/view`));
const tetris = React.lazy(() => import(`@/games/tetris/view`));

export type GameViewId = "mineSweepers" | "snake" | "tetris";
type GameViewType = {
  [key in GameViewId]: React.ComponentType<{}>;
};

let viewObj: GameViewType = {
  mineSweepers,
  snake,
  tetris,
};

function GameView({ id }: { id: GameViewId }) {
  // debugger;
  const Content = viewObj[id];

  return (
    <div key={id} className='flex items-center justify-center rounded-md'>
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </div>
  );
}

export default GameView;
