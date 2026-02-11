# FSD-Study Project

Conduit(Medium 클론) 앱을 Feature-Sliced Design으로 구현하는 학습 프로젝트

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **API Client**: openapi-fetch (타입 안전)
- **Styling**: Conduit CSS (외부 CDN)
- **Linter**: Biome

## Project Structure (FSD)

```
src/
├── app/           # Next.js App Router (라우트)
├── views/         # 페이지 컴포넌트
├── widgets/       # 재사용 가능한 UI 블록 (Header 등)
├── features/      # 사용자 액션/기능 (auth, article 등)
├── entities/      # 비즈니스 도메인 (article, user 등)
└── shared/        # 공통 유틸리티
    ├── api/       # API 클라이언트 & 타입
    └── config/    # 환경 설정
```

## FSD 레이어 규칙

- 상위 레이어는 하위 레이어만 import 가능
- app → views → widgets → features → entities → shared
- 각 슬라이스는 `index.ts`로 public API 노출

## API 사용법

```typescript
import { GET, POST, PUT, DELETE } from "@/shared/api";

// GET 예시
const { data, error } = await GET("/articles", {
  params: { query: { limit: 10, offset: 0 } }
});

// POST 예시
const { data, error } = await POST("/users/login", {
  body: { user: { email, password } }
});
```

## 슬라이스 구조

각 슬라이스(feature, entity, view)는 다음 세그먼트를 포함:

```
feature-name/
├── api/       # API 호출 함수
├── ui/        # React 컴포넌트
├── model/     # 상태 관리, 훅
└── index.ts   # Public API
```

## Commands

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # Biome 린트
```

## Backend API

- Base URL: `https://conduit-api.bondaracademy.com/api`
- 타입 정의: `src/shared/api/v1.d.ts` (OpenAPI 자동 생성)

### 주요 엔드포인트

- `POST /users/login` - 로그인
- `POST /users` - 회원가입
- `GET /user` - 현재 사용자
- `GET /articles` - 게시글 목록
- `GET /tags` - 태그 목록

## 현재 구현 상태

- [x] Feed 페이지 (/, 태그 필터, 페이지네이션)
- [x] 로그인 페이지 (/login)
- [ ] 회원가입 페이지 (/register)
- [ ] 토큰 저장 & 인증 상태 관리
- [ ] Header 위젯
- [ ] Article 상세 페이지
- [ ] Profile 페이지
- [ ] Settings 페이지
