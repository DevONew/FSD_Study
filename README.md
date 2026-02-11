# FSD Study

FSD(Feature-Sliced Design) 학습

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## FSD 핵심 개념

### 레이어 (위 → 아래로만 import 가능)

| 레이어 | 역할 | 예시 |
|--------|------|------|
| **app** | 라우팅, Provider, 전역 설정 | layout.tsx, globals.css |
| **pages** | 페이지 컴포넌트 조립 | FeedPage, ProfilePage |
| **widgets** | 독립적 UI 블록 | Header, ArticleList |
| **features** | 사용자 행동 (동사) | 로그인, 좋아요, 팔로우 |
| **entities** | 비즈니스 데이터 (명사) | Article, User, Comment |
| **shared** | 공용 코드 | Button, Input, API 클라이언트 |

### 세그먼트 (각 슬라이스 내부 구조)

| 세그먼트 | 역할 |
|----------|------|
| **ui/** | 컴포넌트 (화면에 보이는 것) |
| **model/** | 타입, 상태, 비즈니스 로직 |
| **api/** | 서버 통신 |

## 프로젝트 구조

```
src/
├── app/                          # Next.js 라우팅
│
├── pages/                        # 페이지 조립
│   ├── feed/ui/                  # 홈 (기사 피드)
│   ├── sign-in/ui/               # 로그인/회원가입
│   ├── article-read/ui/          # 기사 읽기
│   ├── article-edit/ui/          # 기사 작성/수정
│   ├── profile/ui/               # 유저 프로필
│   └── settings/ui/              # 설정
│
├── widgets/                      # UI 블록
│   ├── header/ui/                # 헤더 (로고, 네비, 로그인버튼)
│   ├── article-list/ui/          # 기사 목록 + 좋아요 + 페이지네이션
│   ├── tag-list/ui/              # 태그 목록 + 필터
│   └── comment-list/ui/          # 댓글 목록 + 작성폼
│
├── features/                     # 사용자 행동
│   ├── auth/                     # 로그인/회원가입/로그아웃
│   ├── create-article/           # 기사 작성
│   ├── like-article/             # 기사 좋아요
│   ├── write-comment/            # 댓글 작성
│   ├── follow-user/              # 유저 팔로우
│   └── filter-by-tag/            # 태그 필터링
│
├── entities/                     # 비즈니스 데이터
│   ├── article/                  # 기사 (타입, 카드 UI, API)
│   ├── user/                     # 유저 (타입, 프로필 UI, API)
│   ├── comment/                  # 댓글 (타입, UI, API)
│   └── tag/                      # 태그 (타입, UI, API)
│
└── shared/                       # 공용 코드
    ├── ui/                       # Button, Input, Card 등
    ├── api/                      # API 클라이언트 (axios 등)
    ├── lib/                      # 유틸 함수
    └── config/                   # 환경변수, 상수
```

## FSD vs 기존 구조 비교

### 기존 방식 (컴포넌트 중심)

```
src/
├── components/
│   ├── Header.tsx
│   ├── ArticleCard.tsx
│   ├── LoginForm.tsx
│   └── Button.tsx
├── pages/
├── hooks/
├── utils/
└── types/
```

### FSD 방식 (기능/도메인 중심)

```
src/
├── features/auth/          # 인증 관련 모든 것
│   ├── ui/LoginForm.tsx
│   ├── model/authStore.ts
│   └── api/authApi.ts
├── entities/article/       # 기사 관련 모든 것
│   ├── ui/ArticleCard.tsx
│   ├── model/types.ts
│   └── api/articleApi.ts
└── shared/ui/Button.tsx
```

### 장단점 비교

| | 기존 방식 | FSD |
|--|----------|-----|
| **장점** | 단순함, 러닝커브 낮음 | 도메인별 응집도 높음, 의존성 명확 |
| **단점** | 규모 커지면 파일 찾기 어려움, 의존성 꼬임 | 러닝커브 있음, 작은 프로젝트엔 과함 |
| **적합한 경우** | 소규모, 단순한 프로젝트 | 중대형, 팀 프로젝트, 장기 유지보수 |

### FSD의 핵심 이점

1. **"이 기능 어디있지?"** → 바로 찾을 수 있음 (auth 기능 → features/auth/)
2. **의존성 방향 강제** → 순환 참조 방지, 리팩토링 안전
3. **팀 협업** → 각자 다른 feature/entity 작업 가능, 충돌 최소화
4. **삭제 용이** → 기능 삭제 시 폴더만 지우면 끝

## 현재 구현 상태

- [x] Feed 페이지 (/, 태그 필터, 페이지네이션)
- [x] 로그인 페이지 (/login)
- [ ] 회원가입 페이지 (/register)
- [ ] 토큰 저장 & 인증 상태 관리
- [ ] Header 위젯
- [ ] Article 상세 페이지
- [ ] Profile 페이지
- [ ] Settings 페이지

## 실행

```bash
npm run dev
```
