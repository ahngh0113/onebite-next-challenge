import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()

  return (
    <h1>검색 결과 : {router.query.q}</h1>
  )
}
