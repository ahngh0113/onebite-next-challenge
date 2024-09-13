# Next.JS 

> [한 입 크기로 잘라먹는 Next.js(15+)](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-nextjs)강의 학습 후 정리한 내용입니다.

# 목차
1. [NextJS](#nextJS)
2. [pre-rendering](#pre-rendering)
3. [pre-fetching](#pre-fetching)
4. [Router](#router)
5. [API Router](#api-router)
6. [global layout](#global-layout)
6. [global layout by page](#global-layout-by-page)

# NextJS

리액트 전용 프레임워크로 리액트의 확장판이라고 생각한다. 리액트는 UI, 즉 View를 위한 라이브러리이다. 그래서 라우팅, 최적화 등 그 외적인 것은 개발자의 역량이다. 그래서 그것들은 좀 더 편리하게 해주기 위해 넥스트가 나왔다고 생각한다. 리액트의 고립된 CSR을 입맛에 맞게 SSR, SSG, 하이드레이션 등의 메커니즘을 도입하여 좀 더 리액트를 맛깔나게 사용할 수 있도록 한다고 생각된다.

# pre-rendering

넥스트의 가장 중요한 기능 중 하나가 사전 렌더링이다. 리액트의 경우 빈 HTML을 먼저 보여주고 그 HTML을 그릴 JS번들을 통신하여 그것을 통해 뷰를 그리고, 사용자와 인터렉션을 한다. 즉 자바스크립트가 커지면 초기 렌더링이 엄청 오래 걸리고, 오래 걸릴 수록 빈 HTML이 사용자가 많이 보게된다. 즉, FCP와 TTI가 오래걸려 사용자 경험이 떨어진다. 하지만 넥스트는 이러한 경우의 문제점을 보완하고자 사전 렌더링을 한다. 넥스트에서는 처음 사용자가 사이트를 요청하면 해당 페이지에 맞는 JS번들로 렌더링이 완료된 HTML을 보내준다. 그리고 만들어진 뼈대, 즉 HTML에 JS번들을 입혀(하이드레이션) 리액트와는 다르게 FCP와 TTI가 굉장히 빨라진다. 그렇다면 이러한 생각이 들 수 있다. “초기 렌더링만 빠르고 나머지는 JS를 모두 갖고 있는 리액트가 더 빠른거 아닌가?”라고 생각하는 나같은 사람들 때문에 또한 pre-fetching이라는 기능이 있다. 현재 페이지에서 사용자가 이동할 수 있는 경우를 생각해 JS번들을 미리 받을 수 있다. 또한 앞서 말한 “사용자가 이동할 수 있는 경우”를 사용자가 핸들링하여 pre-fetching할 수 있다.

정리를 하자면 넥스트는 초기 렌더링의 경우 사전 렌더링을 통해 만들어진 HTML을 보내주고, JS번들을 받아 하이드레이션 하여 기존 리액트의 단점인 느린 FCP와 TTI를 단축시킬 수 있다. 그 후 페이지 전환은 미리 JS번들을 받아 좀 더 효율적이게 페이지 전환이 이루어진다.
# pre-fetching

> 페이지의 JS번들을 미리 불러오는 것

## Why

미리 불러오면 페이지 이동 시 통신이 없어서 빠르게 이동할 수 있다.

## How

- Link tag 사용 시
    
    ```jsx
    import Link from "next/link";
    
    export default function App () {
    	return (
    		<div>
    			<Link href={"/"}> Home </Link>
    		</div>
    	)
    }
    ```
    
- router 사용 시
    
    ```jsx
    import { useRouter } from "next/router";
    
    export default function App () {
    	const router = useRouter()
    	
    	const	onClickButton = () => {
    		router.push("/")
    	}
    	
    	useEffect(() => {
    		router.prefetch("/")
    	}, [])
    	
    	return (
    		<div>
    			<button onClick={onClickButton}>HOME</button>
    		</div>
    	)
    }
    ```
    

## Qustion

- prefetch를 false로 둘 수도 있는데 이러한 경우는 무엇이 있을까?

    ```jsx
    <Link href={"/video"} prefetch={false}> VIDEO </Link>
    ```

    위처럼 비디오나 이미지 등 용량이 큰 페이지를 미리 불러오면 현재 페이지에 로딩에 영향을 줄 수 있어 prefetch보다 클릭 시 불러오는 것이 더 나을 수 있다.

# Router

넥스트의 라우터 방법은 2가지가 있다. 페이지 라우터(page router)와 앱 라우터(app router)이다. 초기부터 채택한 방법은 페이지 라우터인데 넥스트13버전부터 앱 라우터를 도입하였다. 

<details>
  <summary>Page Router</summary>
  <hr/>
  페이지 라우터는 pages라는 폴더를 기반으로 라우팅 되는 것이다.

  예를 들어 /pages라는 폴더 아래에 ‘/index’ ‘/movie’ ‘/info’라는 파일이 있으면 ‘~/’ ‘~/movie’ ‘~/info’ 라는 path가 주어진다.

  또는 /pages라는 폴더 아래에 ‘/index’ ‘/movie/index’ ‘/info/index’라는 폴더 및 파일이 있으면 ‘~/’ ‘~/movie’ ‘~/info’ 라는 path가 주어진다.

  [id]라는 파일 명을 통해 동적 경로 설정도 가능하다. 여기서 id라는 이름을 개발자가 커스텀할 수 있다.

  또한 ~/book/123/ㅁㄴㅇ/123/ㅁㄴㅇ 처럼 경로 뒤에 여러가지 올 경우를 대비하기 위해서는 […id]로 이름을 지어주면 된다. 이것을 “catch all segment”라고 부른다. 하지만 여기서 ~/book으로 이동하면 404에러가 뜬다. index파일을 따로 만들어줄 수 있지만 하나로 모두 관리하고 싶다면 [[…id]]로 만들면 정상적으로 동작시킬 수 있다. 이를 “optional catch all segment”라고 불린다.
</details>

<details>
  <summary>App Router</summary>
  <hr/>
</details>
<br>

# API Router

> rest api를 내부에서 만들 수 있는 기능
> 

## 내가 생각한 활용 방법

- 기존 msw나 json server등의 mock server로 api 테스트를 만들 수 있었는데 이것으로 대체 할 수 있겠다는 생각을 했다.

# global layout

> 전체 페이지 공통으로 필요한 레이아웃을 설정할 수 있다.

<details>
  <summary>Page Router</summary>
  <hr/>
  src/pages/_app에서 설정할 수 있다.

  기본적으로 전역적으로 사용할 레이아웃은 따로 컴포넌트를 만들어줘서 관리한다. 나는 ‘GlobalLayout’이라는 이름으로 뺴줬다.

  ```jsx
  // _app

  import type { AppProps } from "next/app";

  import GlobalLayout from "@/components/global-layout";
  import "@/styles/globals.css";

  export default function App({ Component, pageProps }: AppProps) {
    return (
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    );
  }

  ```

  ```jsx
  // GlobalLayout

  import React from "react";
  import Link from "next/link";

  import style from "./global-layout.module.css";

  function GlobaLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className={style.container}>
        <header className={style.header}>
          <Link href={"/"}>
            <h1>ONEBITE CINEMA</h1>
          </Link>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  export default GlobaLayout;

  ```
</details>
<br>

# global layout by page

> 페이지별로 필요한 레이아웃을 설정할 수 있다.

<details>
  <summary>Page Router</summary>
  <hr>
  _app과 해당 레이아웃을 적용할 페이지 두 곳에 설정을 해줘야한다.

  getLayout()라는 함수를 통해 사용될 페이지 컴포넌트에 해당 레이아웃을 적용하는 것을 하단에 해줘야한다. 그 후 _app에서도 getLayout에 맞는 컴포넌트를 자동으로 대입하도록 설정을 해줘야 한다.

  ```jsx
  // _app

  import { ReactNode } from "react";
  import { NextPage } from "next";

  import type { AppProps } from "next/app";

  import GlobalLayout from "@/components/global-layout";
  import "@/styles/globals.css";

  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
  };

  export default function App({
    Component,
    pageProps,
  }: AppProps & {
    Component: NextPageWithLayout;
  }) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
  }

  ```

  ```jsx
  // serch

  export default function Page() {
  // ...
  }

  Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
  };
  ```
</details>
