import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import fetchOneMovie from "@/utils/fetch-one-movie";

import style from "./[id].module.css";

export const getServerSideProps = async (
  content: GetServerSidePropsContext
) => {
  const movieId = Number(content.params!.id);

  const oneMovie = await fetchOneMovie(movieId);

  return {
    props: {
      oneMovie,
    },
  };
};

export default function Page({
  oneMovie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const movieId = Number(router.query.id);

  if (!oneMovie) {
    return (
      <div className={style.not_found}>
        &quot;ID: {movieId}&quot;에 해당하는 영화는 없습니다.
      </div>
    );
  }

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = oneMovie;

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
