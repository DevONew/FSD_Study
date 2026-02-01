# FSD Study

FSD(Feature-Sliced Design) 학습 프로젝트

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## FSD 구조

```
src/
├── app/        # Next.js App Router (라우팅)
├── pages/      # 페이지 컴포넌트 조합
├── widgets/    # 독립적 UI 블록 (헤더, 사이드바)
├── features/   # 비즈니스 기능 (로그인, 검색)
├── entities/   # 비즈니스 엔티티 (user, product)
└── shared/     # 공유 코드 (ui, utils, api)
```

## 실행

```bash
npm run dev
```
