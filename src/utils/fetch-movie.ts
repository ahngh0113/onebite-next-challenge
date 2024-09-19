import { MovieData } from "@/typesc";

export default async function fetchMovie(q?: string): Promise<MovieData[]> {
  const url = process.env.NEXT_MOVIE_API_URL as string;

  try {
    const response = await fetch(q ? `${url}/search?q=${q}` : url);
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
