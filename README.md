# Next.JS 

> [한 입 크기로 잘라먹는 Next.js(15+)](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-nextjs)강의 학습 후 정리한 내용입니다.

# 목차
1. [What NextJS](#what-nextjs)
2. [pre-rendering](#pre-rendering)
3. [pre-fetching](#pre-fetching)
4. [Router](#router)
5. [API Router](#api-router)
6. [global layout](#global-layout)
7. [global layout by page](#global-layout-by-page)
8. [data fetching](#data-fetching)
9. [pre-rendering-method-of-next](#pre-rendering-method-of-next)

# What NextJS

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

<details>
  <summary>App Router</summary>
  <hr/>
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
<details>
  <summary>App Router</summary>
  <hr/>
</details>
<br>

# data fetching
기존 리액트에서의 데이터 통신을 알아보면 [초반 pre-rendering](#pre-rendering)에서 이야기 했듯이 FCP이후 JS번들을 통해 TTI가 가능해져서 길어진 랜더링과 그 후에 통신을 하다보니 데이터를 받아오는 시점이 늦게된다. 넥스트의 경우 초반 사전 렌더링 된 화면을 받아 올 때 그 화면에 필요한 데이터까지도 미리 받아서 전달해주는 매커니즘을 가지고 있다. 그 또한 개발자가 설정해 줄 수 있다. 또한 오래걸리는 데이터 패칭도 빌드 타임에 미리 패칭하는 매커니즘도 제공하고 있다. 

정리하면 리액트의 경우 화면 마운트 후 데이터 패칭을 한다면, 넥스트는 사전 렌더링할 때에 데이터 패칭도 발생하게 할 수 있어서 훨씬 빠르게 사용자가 데이터를 패칭할 수 있다.

# pre-rendering method of next

## 1. SSR
> Server Side Rendering으로, 요청이 들어올 때 사전 렌더링을 진행한다. 
<details>
  <summary>Page Router</summary>
  <hr/>
  
  ```jsx
    export const getServerSideProps = () => {}
  ```
  위와 같이 파일 중 컴포넌트 외부에 `getServerSideProps`라는 이름으로 함수를 지정하고 내부에 로직을 적어주면 사전 렌더일 때 컴포넌트의 props로 자동으로 들어간다. 

  ```jsx
    export const getServerSideProps = () => {
      const data = 통신으로 받아온 데이터()

      return {
        props: {
          data
        }
      }
    }
  ```
  `inferGetServerSidePropsType`이라고 자동으로 서버  사이드에서 props로 넘겨주는 데이터 타입을 추론하는 타입을 지원해줘서 편리하게 사용할 수 있다.

  ```jsx
    //...
    export const getServerSideProps = () => {
      const data = 통신으로 받아온 데이터()

      return {
        props: {
          data
        }
      }
    }

    //...

    export default Page({
      data
    }: inferGetServerSidePropsType<typeof getServerSideProps>)

    //...
  ```

  `getServerSideProps`는 서버측에서 실행되는 함수이기 때문에 내부에 `console.log()`를 사용해도 클라이언트측인 브라우저에서는 출력되지 않고, 실행시킨 터미널에서 확인 할 수 있다.

  컴포넌트는 총 2번 실행된다. 
  1. 서버에서 사전 렌더링을 위해
  2. JS번들을 통해 하이드레이션을 위해
  그래서 컴포넌트 내부에 `console.log(window)`를 실행 시키면 위의 1번은 서버에서 실행이 될 때에는 `window`가 `undefined`이기 때문에 에러를 보내준다. 그래서 컴포넌트 내부에서 사용할 때에는 `useEffect`를 사용해줘야 한다.
</details>
<details>
  <summary>App Router</summary>
  <hr/>
</details>


## 2. SSG
> Static Site Generation, 정적 사이트 생성으로, 빌드 타임에 사전 렌더링을 진행하여 좀 더 정적인 페이지를 접할 수 있다.

SSR은 페이지 요청 시 매번 서버에 새로운 JS렌더링 번들을 요청하고 받아와야 한다. 그말은 서버의 상태가 안좋으면 요청이 늦게 걸릴 수도 있다. 이러한 SSR의 단점을 보안하고자 빌드 타임에 페이지를 미리 만들어두는 메커니즘이다.

SSG의 단점은 빌드 때 페이지가 생성되기 떄문에 실시간 성으로 바뀌는 데이터에 대한 대응이 쉽지 않다.

<details>
  <summary>Page Router</summary>
  <hr/>

  ## 기본 설정
  ```jsx
    export const getStaticProps = () => {}
  ```
  위와 같이 파일 중 컴포넌트 외부에 `getServerSideProps`라는 이름으로 함수를 지정하고 내부에 로직을 적어주면 사전 렌더일 때 컴포넌트의 props로 자동으로 들어간다. 

  ```jsx
    export const getStaticProps = () => {
      const data = 통신으로 받아온 데이터()

      return {
        props: {
          data
        }
      }
    }
  ```
  `InferGetStaticPropsType`이라고 자동으로 서버 사이드에서 props로 넘겨주는 데이터 타입을 추론하는 타입을 지원해줘서 편리하게 사용할 수 있다.

  ```jsx  
    //...
    export const getStaticProps = () => {
      const data = 통신으로 받아온 데이터()

      return {
        props: {
          data
        }
      }
    }
    //...
  ```

  SSR과 다르게 `getStaticProps`라는 네이밍을 통해 SSG를 선택할 수 있다.

  ```tsx
    //...
    export const getStaticProps = () => {
      const data = 통신으로 받아온 데이터()

      if(!data) {
        return {
          notFound: true
        }
      }

      return {
        props: {
          data
        }
      }
    }
    //...
  ```
    
  위와 같이 data가 없을 경우 `Not Found - 404`페이지를 보여주도록 설정 할 수도 있다.

  ```tsx
    export default Page({
      data
    }: InferGetStaticPropsType<typeof getStaticProps>)

    //...
  ```
  ## 테스트 하는 법
  넥스트에서 개발 모드로 실행(`npm run dev`)하면 편의상 새로고침마다 페이지를 새로 만들어서 불러온다. 그래서 SSG를 실제로 경험하려면 `npm run build` 후 `npm run start`를 해줘야 한다.

  ## 동적 페이지 SSG 설정 (like. `[id].tsx`)
  ```tsx
    export const getStaticPaths = async () => {
      return {
        paths: [
          // 동적으로 할당할 내용
          // ex) {params: {id: 12345}}
        ],
        // 동적으로 설정한 path가 없을 경우 
        // 'false', 'blocking', 'true' 중 선택할 수 있다.
        fallback -> [false, 'blocking', true]
      }
    }
  ```

  ### fallback 타입 설명
  |타입|설명|
  |--|--|
  |false|404페이지가 보여진다.|
  |'blocking'|SSR을 접목 시킨 방식으로 빌드 타임에 id에 맞게 계산된 페이지가 없을 시 서버에 요청하여 사전 렌더링을 실시한다. <br/> 추가된 데이터 대응에 용이하다. 하지만 SSR의 단점처럼 서버에서 오래걸리면 사용자도 그만큼 기다려야 한다.|
  |true|일단 데이터가 없는 페이지를 출력 후 서버에 요청하여 사전 렌더링을 실시한다. `'blocking'`과 다른 점은 먼저 데이터가 없는 페이지를 출력하여 FCP를 줄일 수 있다.|

  ## fallback 체킹하는 법
  ```tsx
  export default function Page() {
    //...
    const isFallback = router.isFallback;
    //...
  }
  ```
  `router.isFallback`으로 fallback 상태인지 체크할 수 있다.

</details>
<details>
  <summary>App Router</summary>
  <hr/>
</details>

## 3. ISR
> Incremental Static Regeneration, 점진적 정적 재생성으로, SSR의 장점과 SSG의 장점만을 살려 SSG처럼 사전 렌더링 된 페이지를 보내고 시간이 지나면 SSR처럼 요청 후 다시 SSG처럼 페이지를 전달하는 매커니즘이다.

<details>
  <summary>Page Router</summary>
  <hr/>
  SSG의 방식을 그대로 사용하면서 return의 속성으로 `revalidate`를 넣어주여 value로 시간(초 단위)을 설정해 주면된다.

  ```jsx  
    //...
    export const getStaticProps = () => {
      const data = 통신으로 받아온 데이터()

      return {
        props: {
          data
        },
        revalidate: 원하는 시간
      }
    }
    //...
  ```

  ## On-Demand-ISR
  게시글 같은 경우는 시간마다 수정이 일어나는 것이 아닌 수정을 할때 이루어진다. 이것을 대응하기위해 시간 뿐만 아니라 강제로 업데이트 해주는 방법이 있다.

  ```tsx
    // pages/api/revalidate.ts
    import { NextApiRequest, NextApiResponse } from "next";

    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse
    ) {
      try {
        await res.revalidate("/"); // 업데이트 하기 원하는 url
        return res.json({ revalidate: true });
      } catch (error) {
        res.status(500).send("Revalidation Failed");
      }
    }
  ```

  `/api/revalidate`요청을 하면 설정해 놓은 url을 업데이트 해준다.
</details>
<details>
  <summary>App Router</summary>
  <hr/>
</details>

### 3-1. 

# npm run build 아이콘 살펴보기

|기호|방식|설명|
|---|---|---|
|○  |Static |prerendered as static content, 아무런 설정을 하지 않은 사전 렌더링된 정적인 페이지, SSG|
|●  |SSG    |prerendered as static HTML (uses getStaticProps), `getStaticProps`를 사용하여 HTML로 사전 렌더링된 페이지, SSG|
|ƒ  |Dynamic|server-rendered on demand, 브라우저에서 요청을 받을 떄마다 사전 렌더링, SSR|
| |ISR|incremental static regeneration (uses revalidate in getStaticProps), `getStaticProps`내부에 `revalidate`를 이용하여 ISR 렌더링 설정|

- 기본적으로 아무 설정을 하지 않으면 SSG방식으로 동작한다.

# 페이지별 SEO 설정하기

```tsx
// index.tsx

import Head from "next/head";

// ...

return (
  <>
    <Head>
      <title>원하는 페이지 title 이름</title>
      <meta property="og:image" content="/{썸네일 url}" /> -> public이 /로 인지한다.
      <meta property="og:title" content="{title}" />
      <meta property="og:description" content="{description}" />
    </Head>
    /* ... */
  </>
)
```