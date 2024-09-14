import { ReactNode } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import fetchMovie from "@/utils/fetch-movie";

import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";

import style from "./index.module.css";

export const getServerSideProps = async (
  content: GetServerSidePropsContext
) => {
  const q = content.query.q;

  const searchMovies = await fetchMovie(q as string);

  return {
    props: {
      searchMovies,
    },
  };
};

export default function Page({
  searchMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const serachName = router.query.q as string;

  if (searchMovies.length === 0) {
    return (
      <div className={style.not_found}>
        &quot;{serachName}&quot;에 대한 검색 결과가 없습니다.
      </div>
    );
  }
  return (
    <div className={style.movie_items}>
      {searchMovies.map((movie) => {
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
