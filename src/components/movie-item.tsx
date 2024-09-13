import React from "react";
import type { MovieData } from "@/typesc";
import style from "./movie-item.module.css";

function MovieItem({ title, posterImgUrl }: MovieData) {
  return (
    <>
      <img
        className={style.img}
        src={posterImgUrl}
        alt={`${title} 포스터 이미지`}
      />
    </>
  );
}

export default MovieItem;
