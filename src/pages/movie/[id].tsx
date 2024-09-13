import { useRouter } from "next/router";

import type { MovieData } from "@/typesc";

import dummyData from "@/mocks/dummy.json";

import style from "./[id].module.css";

export default function Page() {
  const router = useRouter();
  const movieId = Number(router.query.id);
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = dummyData.find(({ id }) => id === movieId) as MovieData;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={`${title} 포스터 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(", ")} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
