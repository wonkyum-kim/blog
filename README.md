# Wonkyum | blog

```shell
npm install --force
npm run dev
```

## Tech

- Next.js 14
- TypeScript
- Contentlayer
- Shadcn/ui
- TailwindCSS

## 마크다운 파일을 HTML 파일로 변환

`remark`는 마크다운을 처리할 때 사용하는 라이브러리이고, `rehype`은 HTML을 처리할 때 사용하는 라이브러리입니다.

### TOC(Table of Contents)

[rehype-slug](https://www.npmjs.com/package/rehype-slug)를 사용해서 파싱된 모든 `<h*>` 태그에 id를 추가하도록 하였습니다.

이후 다음과 같은 정규 표현식을 사용해 id들을 불러올 수 있습니다.

```js
const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
const headings = Array.from(doc.body.raw.matchAll(regXHeader));
```

1. `\n`: 줄 바꿈 문자에 대응합니다.
2. `(?<flag>#{1,6})`: `#` 문자가 1개부터 6개까지 반복되는 부분에 대응합니다. 이 부분은 제목의 레벨을 나타냅니다. `?<flag>`는 해당 부분을 "flag"라는 이름으로 그룹화하겠다는 의미입니다.
3. `\s+`: 하나 이상의 공백 문자에 대응합니다.
4. `(?<content>.+)`: 어떠한 문자가 1개 이상 포함된 부분에 대응합니다. 이 부분은 제목의 내용을 나타냅니다. `?<content>`는 해당 부분을 "content"라는 이름으로 그룹화하겠다는 의미입니다.
5. `g`: 전역 검색을 나타내며, 문자열 내에서 모든 일치하는 패턴을 찾도록 합니다.

따라서 다음과 같은 문자열 패턴을 찾게 됩니다.

```text
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

TOC를 만들기 위해서 rehype-slug가 만든 id와 같은 id들을 불러와야 합니다.

rehype-slug의 구현 코드를 살펴보면 내부적으로 [github-slugger](https://www.npmjs.com/package/github-slugger)를 사용하고 있습니다.

따라서 github-slugger를 사용하여 같은 id들을 얻을 수 있게 됩니다.

```js
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level:
                flag?.length == 1 ? 'one' : flag?.length == 2 ? 'two' : 'three',
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );
        return headings;
      },
    },
```

### 코드 타이틀

[rehype-code-titles](https://www.npmjs.com/package/rehype-code-titles)를 사용해서 코드 블록에 파일 명을 명시할 수 있도록 설정하였습니다.

```css
.rehype-code-title {
  @apply text-slate-200;
  @apply bg-zinc-900;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  padding: 5px 16px;
  font-weight: 700;
  margin-top: 8px;
  font-size: 14px;
  margin-bottom: -35px;
}
```

### 코드 블록

[rehype-pretty-code](https://www.npmjs.com/package/rehype-pretty-code)를 사용해서 코드 블록에 몇 가지 기능들을 추가하였습니다.

- line number 표시 기능 (e.g. `js showLineNumbers`)
- line highlight 표시 기능 (e.g. `js {1-2,4,6}`)
- github-dark theme 적용

### 수학 수식

[remark-math](https://www.npmjs.com/package/remark-math)와 [rehype-katex](https://www.npmjs.com/package/rehype-katex)를 사용해서 수학 수식(`KaTeX`)를 지원하도록 설정할 수 있습니다.

- KaTeX: 빠르고 사용하기 쉬우며 서버 사이드 렌더링을 지원하는 수학 수식 렌더링 라이브러리
- remark-math: 마크다운 파일에 있는 수학 수식을 파싱하고 이를 특수한 노드 유형으로 변환
- remark-katex: remark-math가 생성한 노드를 가져와서 KaTeX 라이브러리를 사용하여 HTML로 렌더링

### 태그

23/12/31

각 글에 태그를 추가할 수 있도록 하였으며 태그를 선택 시 관련 글만 모아 볼 수 있습니다.

## 파일명 기반으로 페이지 생성

글을 마크다운 형식으로 쓰고 맨 위에 글의 정보를 작성해줍니다.

```mdx
---
title: Windows WSL2에서 리눅스 커널 설치해보기
date: 2023-06-10
description: 커널 모듈을 설치해보기 위한 사전 작업
---

## 1. Install WSL2

...
```

`Contentlayer`는 해당 mdx 파일을 읽어서 데이터 객체로 변환하게 되어 글을 페이지에 렌더링할 수 있게 됩니다.

글을 올리게 되면 Next.js에서 지원하는 `dynamic routes` 기능을 사용하여 `blog/[fileName]` 구조로 페이지를 생성합니다.

## SEO, sitemap

meta 태그에 HTML 문서의 주요 정보를 제공해주면 검색엔진 등록, SNS 공유 시 도움이 됩니다.

`Open Graph Protocol`도 함께 사용하였습니다.

```js
export default function metadata({
  title,
  description: desc,
  path,
}: MetadataProps): Metadata {
  const description = desc + ' | wonkyum';

  return {
    metadataBase: new URL('http://blog-wonkyum-kim.vercel.app'),
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'wonkyum',
      locale: 'ko_KR',
    },
  };
}
```

그리고 sitemap과 robots.txt를 생성하고 google search console에 등록하였습니다.

- sitemap: 사이트에 있는 페이지, 동영상 및 기타 파일과 그 관계에 관한 정보를 제공하는 파일입니다. Google과 같은 검색엔진은 이 파일을 읽고 사이트를 더 효율적으로 크롤링합니다. 사이트맵은 내가 사이트에서 중요하다고 생각하는 페이지와 파일을 Google에 알리고 중요한 관련 정보를 제공합니다. 관련 정보의 예로는 페이지가 마지막으로 업데이트된 시간, 페이지의 대체 언어 버전이 있습니다.
- robots.txt: 크롤러가 사이트에서 액세스할 수 있는 URL을 검색엔진 크롤러에 알려 줍니다.
- google search console: 구글 검색 엔진에 내 sitemap을 등록하여 봇들이 수집할 수 있도록 등록하는 곳입니다.

Next.js의 문서를 보면서 직접 파일들을 생성하였습니다.

- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

## 댓글 기능

`Giscus`로 깃허브의 `Discussions(토론)` 기능을 사용하여 댓글을 작성할 수 있게 하였습니다.

23년 12월 30일 기준으로 giscus 서버에 오류가 발생해서 당분간 댓글 기능을 사용할 수 없다고 합니다. https://github.com/giscus/giscus/issues/1269

## 발생한 문제와 해결 과정

### Next.js 14 미지원 라이브러리

블로그를 만드는데 사용한 대부분의 라이브러리가 Next.js 13까지만을 지원하고 있어서 `npm install`로 설치가 되지 않는 문제가 발생하였습니다.

따라서 로컬에서는 `npm install [library] --force`로 설치한 다음 큰 문제가 발생하지 않는 것을 확인하고 진행하였고,

vercel에 배포 시, Settings -> General -> Install Command에 `npm install --force`로 오버라이드 하도록 설정하여 해결하였습니다.

### 다크 모드 적용 시 재렌더링이 발생하지 않음

댓글 기능을 추가하기 전 까지는 문제가 발생하지 않았지만, 적용 후 giscus의 댓글 테마가 변경되지 않는 문제가 발생했습니다.

이는 직접 `html` 엘리먼트의 클래스를 변경하여 재렌더링이 발생하지 않아서 생기는 문제였기 때문에 몇 가지 해결책을 생각해봤습니다.

1. MutationObserver
2. useRef
3. 상태 관리 라이브러리

일단 `MutationObsever`가 먼저 떠오르기는 했지만 적용하기엔 조금 부담스러웠습니다.

MutationObsever은 비동기 작업이므로 클라이언트 컴포넌트에서 적용하고 싶지 않았고,

예전에 텍스트 에디터 코드를 살펴본 경험으로는 리액트가 가상 돔을 사용하고 있기 때문에 재렌더링을 잘 캐치하지 못할 가능성도 있었습니다.

다음으로 layout에 있는 html 요소에 `useRef`를 사용해서 값의 변화를 읽을 수 있을지 고민해보았으나, 첫 layout은 반드시 서버 컴포넌트여야 하므로 접었습니다.

마지막으로 상태 관리 라이브러리가 재렌더링을 유발하기에 가장 적합하다고 생각해서 적용하게 되었습니다.

제가 [분석했던 상태 관리 라이브러리](https://blog-gray-omega-81.vercel.app/blog/20231220-Zustand) 중 가장 가볍고 간단한 `Zustand`를 선택하여 재렌더링 문제를 해결하였습니다.

## TODO

- [ ] 블로그 소개 페이지 작성

## References

https://yusuf.fyi/posts/contentlayer-table-of-contents

https://kilee.dev/blog/next-js-blog-codeblock-styling

https://bepyan.github.io/blog/nextjs-blog/1-boilerplate

https://www.fronttigger.dev/2022/browser/sitemap
