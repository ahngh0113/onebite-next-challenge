import { ReactNode, useMemo } from "react";
import Link from "next/link";

import type { MovieData } from "@/typesc";

import dummyData from "@/mocks/dummy.json";

import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";

import style from "./index.module.css";

export default function Home() {
  const getRecommendMovies = (movies: MovieData[], count: number = 3) => {
    if (movies.length < count) {
      throw new Error("배열의 길이가 선택하려는 갯수보다 적습니다.");
    }

    if (movies.length === count) {
      return movies;
    }

    const result = movies.slice();

    for (let i = movies.length - 1; i > movies.length - 1 - count; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
    }

    return result.slice(-count);
  };

  const recommendMovie = useMemo(() => getRecommendMovies(dummyData), []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.movie_items}>
          {recommendMovie.map((movie) => {
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
          {dummyData.map((movie) => {
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
