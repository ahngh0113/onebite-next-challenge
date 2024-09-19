import { MovieData } from "@/typesc";

export default async function fetchRecommendMovies(): Promise<MovieData[]> {
  const url = process.env.NEXT_PUBLIC_MOVIE_API_URL;

  try {
    const response = await fetch(`${url}/random`);
    if (!response.ok) {
      throw new Error("영화를 불러오는데 실패했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
