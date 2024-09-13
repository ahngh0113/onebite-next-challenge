import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import dummyData from "@/mocks/dummy.json";

import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";

import style from "./index.module.css";

export default function Page() {
  const router = useRouter();
  const serachName = router.query.q as string;

  const searchMovie = dummyData.filter(({ title }) =>
    title.includes(serachName)
  );

  if (searchMovie.length === 0) {
    return (
      <div className={style.not_found}>
        &quot;{serachName}&quot;에 대한 검색 결과가 없습니다.
      </div>
    );
  }
  return (
    <div className={style.movie_items}>
      {searchMovie.map((movie) => {
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
