import { ReactNode } from "react";
import { useRouter } from "next/router";

import SearchableLayout from "@/components/searchable-layout";

export default function Page() {
  const router = useRouter();

  return <h1>검색 결과 : {router.query.q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
