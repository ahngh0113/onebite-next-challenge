import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import fetchMovie from "@/utils/fetch-movie";

import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";

import style from "./index.module.css";
import { MovieData } from "@/typesc";

export default function Page() {
  const [searchMovieDate, setSearchMovieDate] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const getQueryMovieDate = async () => {
    const searchMovies = await fetchMovie(q as string);

    setSearchMovieDate(searchMovies);
  };

  useEffect(() => {
    if (q) {
      getQueryMovieDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  if (searchMovieDate.length === 0) {
    return (
      <div className={style.not_found}>
        &quot;{q}&quot;에 대한 검색 결과가 없습니다.
      </div>
    );
  }
  return (
    <div className={style.movie_items}>
      {searchMovieDate.map((movie) => {
        return (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className={style.movie_item}
          >
            <MovieItem {...movie} />
          </Link>
        );
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
