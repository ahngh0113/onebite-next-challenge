import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import fetchMovie from "@/utils/fetch-movie";
import fetchOneMovie from "@/utils/fetch-one-movie";

import style from "./[id].module.css";
import Head from "next/head";

export const getStaticPaths = async () => {
  const movies = await fetchMovie();

  return {
    paths: movies.map((movie) => ({
      params: { id: String(movie.id) },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (content: GetStaticPropsContext) => {
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const movieId = router.query.id;
  const isFallback = router.isFallback;

  if (isFallback) {
    return (
      <>
        <Head>
          <title>한입 씨네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 씨네마" />
          <meta
            property="og:description"
            content="한입 씨네마에서 원하는 영화를 찾아보세요."
          />
        </Head>
        <div className={style.is_fall_back}>
          <p>로딩중입니다.</p>
        </div>
      </>
    );
  }

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
    <>
      <Head>
        <title>한입 씨네마 | {title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={`한입 씨네마 | ${title}`} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
