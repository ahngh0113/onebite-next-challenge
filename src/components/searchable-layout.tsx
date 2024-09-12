import React, { useRef } from "react";
import { useRouter } from "next/router";

import style from "@/components/searchable-layout.module.css";

function SearchableLayout({ children }: { children: React.ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    if (!inputRef.current || !inputRef.current.value) {
      return;
    }

    const value = inputRef.current.value;

    router.push(`/search?q=${value}`);
  };

  return (
    <div>
      <div className={style.searchable_container}>
        <input
          type="text"
          ref={inputRef}
          onKeyUp={onKeyUp}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={submit}>검색</button>
      </div>
      {children}
    </div>
  );
}

export default SearchableLayout;
