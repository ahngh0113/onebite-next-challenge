import { ReactNode } from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

import fetchMovie from "@/utils/fetch-movie";
import fetchRecommendMovies from "@/utils/fetch-recommend-movie";

import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";

import style from "./index.module.css";

export const getStaticProps = async () => {
  const [allMovies, recommendMovies] = await Promise.all([
    fetchMovie(),
    fetchRecommendMovies(),
  ]);

  return {
    props: {
      allMovies,
      recommendMovies,
    },
    revalidate: 10,
  };
};
export default function Home({
  allMovies,
  recommendMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.movie_items}>
          {recommendMovies.map((movie) => {
            return (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className={style.recommend_movie_item}
              >
                <MovieItem {...movie} />
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.movie_items}>
          {allMovies.map((movie) => {
            return (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className={style.all_movie_item}
              >
                <MovieItem {...movie} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
