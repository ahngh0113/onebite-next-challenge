import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  
  return (
    <h1>{router.query.id} 영화 상세 페이지 </h1>
  )
}
