# HANDOFF — 포트폴리오 대시보드 프로젝트 인수인계

이 문서는 Codex CLI가 현재 구현된 프로젝트의 작업을 이어받기 위한 핸드오프다.
대시보드 기본 구현은 완료되어 있으며, 디자인 레퍼런스와 프로젝트 규칙을 기준으로 기능을 확장한다.

---

## 0. 가장 먼저 할 일 (순서 고정)

1. 이 문서(`HANDOFF.md`)를 끝까지 읽는다.
2. `AGENTS.md`를 읽는다 — 프로젝트의 모든 규칙이 여기 있다.
3. `.codex/skills/add-widget/SKILL.md`를 확인한다 — 위젯 추가 표준 절차.
4. `legacy/index.html`을 열어 디자인 기준을 눈으로 확인한다(색·둥근정도·그림자·마스코트·말풍선·라이트/다크 느낌).
5. 구현 전 성공 기준, 영향 파일, 리스크를 정리한다. (`AGENTS.md` "코딩 전 반드시 생각할 것")

---

## 1. 프로젝트 한 줄 요약

아버지의 한국 주식 포트폴리오를 보여주는 대시보드 웹앱.
**기존 HTML의 디자인은 그대로 재현하되, 코드는 현대적 React/TypeScript 아키텍처로 완전히 새로 구현한다.** 기존 코드는 복사하지 않는다.

---

## 2. 주요 프로젝트 파일

```
.
├── AGENTS.md                          ← 프로젝트 규칙 (최우선 권위 문서)
├── HANDOFF.md                         ← 지금 읽는 문서
├── .codex/
│   └── skills/
│       ├── add-widget/SKILL.md         ← "새 위젯 추가" 표준 절차
│       └── commit/SKILL.md             ← 검증 및 커밋 절차
├── src/                               ← React/TypeScript 애플리케이션
├── docs/TASKS.md                      ← 구현 작업 현황
└── legacy/
    └── index.html                     ← 디자인 기준 원본 (참조 전용, 코드 복사 금지)
```

### 파일별 설명

**HANDOFF.md (이 문서)**
인수인계용. 어디서부터 어떻게 시작할지의 진입점. 작업 방향이 헷갈리면 여기로 돌아온다.

**AGENTS.md**
프로젝트의 헌법. 기술 스택, 폴더 구조, 상태관리 분리(Zustand vs TanStack Query),
타입 안정성, 금지 패턴, git/commit 규칙, 완료 정의 등이 들어 있다.
이 문서와 충돌하는 판단이 생기면 AGENTS.md가 우선이다.

**.codex/skills/add-widget/SKILL.md**
위젯을 하나 추가할 때마다 따르는 단계별 절차(타입→mock→query hook→유틸→컴포넌트→레지스트리 등록→토글→검증).
"위젯 추가/카드 추가/~위젯 만들어줘" 류 요청에서 사용하거나 `$add-widget`으로 명시적으로 호출한다.
새 위젯 작업은 반드시 이 스킬을 따른다.

**legacy/index.html**
React UMD + Babel-standalone CDN으로 짜인 단일 파일 원본. **디자인 확인용으로만** 본다.
이 안의 CDN import, inline Babel, DOM 직접 조작, 전역 window 변수, 옛 drag/drop 구현은 복사하지 않는다.
색감·레이아웃·위젯 모양·마스코트·말풍선·라이트/다크 톤만 동일하게 재현한다.

---

## 3. 기술 스택 (`AGENTS.md` 확정)

- 프론트: React + TypeScript + Vite + Tailwind CSS + CSS Variables
- 대시보드: `react-grid-layout` (드래그 핸들 기반, 리사이즈, 레이아웃 저장/초기화)
- 차트: Recharts
- 클라이언트 UI 상태: Zustand (테마/다크모드/레이아웃/위젯 표시여부 등)
- 서버 상태: TanStack Query (portfolio/holdings/transactions/chart 데이터, mock 단계)
- 패키지 매니저: **pnpm 전용** (npm/yarn/bun 금지, `pnpm-lock.yaml`만 유지)
- 백엔드: 아직 구현 안 함. 초기엔 **mock 데이터만**. 키움증권 실연동은 나중에.

상세·예외는 `AGENTS.md`를 따른다.

---

## 4. 폴더 구조 (`AGENTS.md` 기준)

```
src/
  app/
  components/
    dashboard/
    widgets/
    common/
    layout/
  stores/        # Zustand (UI 상태 전용)
  hooks/
  api/           # TanStack Query 기반 데이터 접근
  lib/           # 포맷팅/계산 유틸
  mocks/         # mock 데이터
  styles/        # Tailwind + CSS 변수 토큰
  types/         # 타입 먼저 정의
```

---

## 5. 권장 작업 순서 (빈 프로젝트 → 동작하는 대시보드)

각 단계는 작은 단위로 끝내고, `AGENTS.md` commit 규칙대로 커밋한다.
각 커밋 전 `pnpm run lint && pnpm run typecheck && pnpm run build`를 통과시킨다.

1. **프로젝트 초기화** — Vite react-ts 스캐폴딩, pnpm 설치, Tailwind 연결, lint/typecheck/build 스크립트 확인. (`chore: 프로젝트 초기화`)
2. **테마 시스템** — `legacy/index.html`의 CSS 변수(라이트/다크)를 `src/styles`로 옮겨 디자인 토큰화. 색 하드코딩 금지. (`feat: 테마 시스템`)
3. **타입 + mock 데이터** — `AGENTS.md` "데이터 규칙"의 타입들(PortfolioSummary, Holding, Transaction, EquityCurvePoint, AllocationItem, DashboardLayout, DashboardWidget) 정의 후 `src/mocks`에 키움증권풍 mock. (`feat: mock 데이터/타입`)
4. **데이터 레이어** — `src/api`에 TanStack Query hook. 컴포넌트는 직접 fetch 금지. (`feat: 데이터 레이어`)
5. **대시보드 grid** — `react-grid-layout` 기반 레이아웃, 드래그 핸들, 리사이즈, 레이아웃 저장/초기화, 안정적 widget id. (`feat: 대시보드 grid`)
6. **위젯 구현** — 위젯마다 `add-widget` 스킬을 따라 하나씩. 위젯당 1커밋. (`feat: <name> widget 구현`)
7. **반응형 마감** — 데스크탑/태블릿/모바일, overflow, 터치. (`feat: 반응형 마감`)
8. **QA/리팩토링** — loading/empty/error 상태 점검, 다크모드 점검, 중복 제거. (`refactor:` / `fix:`)

---

## 6. 절대 지켜야 할 핵심 (자주 깨지는 것들)

- 컴포넌트에서 직접 fetch 금지 → 반드시 query hook 경유
- Zustand에 서버 데이터 저장 금지 → 서버 상태는 TanStack Query가 source of truth
- 색·간격 하드코딩 금지 → 디자인 토큰(CSS 변수) 사용
- `any` / unsafe cast / 타입 우회 금지, 항상 타입 먼저
- 300줄 넘는 거대 컴포넌트 금지, named export, unstable key 금지
- 기존 HTML 디자인을 임의로 "개선"하지 말 것 — 시각적 결과 동일 유지
- 거대 단일 커밋 금지 — 의미 단위로 쪼개기
- 모호하면 가정하지 말고 멈추고 사용자에게 물을 것

---

## 7. 완료 정의 (각 작업 단위)

구현 완료 + TypeScript 통과 + lint 통과 + build 통과 + 반응형 정상 +
다크모드 정상 + loading/error 상태 존재 + 기존 HTML과 시각적으로 동일 +
커밋 완료 + 작업 요약 출력. (전부 만족해야 done)

---

## 8. 막혔을 때

- 디자인 판단이 애매하면 → `legacy/index.html` 화면을 기준으로 맞추고, 그래도 모호하면 사용자에게 묻는다.
- 규칙 충돌이 생기면 → `AGENTS.md`가 최우선. 그다음 이 HANDOFF, 그다음 스킬.
- 새 위젯이면 → 무조건 `add-widget` 스킬 절차를 먼저 읽는다.
