import React from "react";
import Link from "next/link";

import style from "./global-layout.module.css";

function GlobaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>
          <h1>ONEBITE CINEMA</h1>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default GlobaLayout;
