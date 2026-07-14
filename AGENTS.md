# 포트폴리오 대시보드 프로젝트 규칙

## 프로젝트 목표

아버지의 주식 포트폴리오를 관리하고 조회할 수 있는 한국 주식 포트폴리오 대시보드 웹 애플리케이션을 구축한다.

이 프로젝트는 완전히 새로운 구현이어야 한다.

기존 구현을 직접 마이그레이션하거나 재사용하지 않는다.

최종 구현은 현대적인 아키텍처와 코드베이스를 기반으로 해야 한다.

---

## 디자인 기준 (중요)

디자인의 기준은 기존 HTML 파일이다. 디자인 결정에 관한 세부 규칙은 별도의 디자인 문서/레퍼런스를 따른다. 이 문서에서는 디자인 자체를 다시 정의하지 않는다.

이 프로젝트에서 지켜야 할 디자인 관련 원칙은 단 하나다:

* **기존 HTML 파일의 시각적 결과물을 훼손하지 않는다.** 색감, 둥근 정도, 그림자, 간격, 위젯/카드 모양, 라이트·다크 테마의 느낌, 마스코트와 말풍선 UI 등 화면에 보이는 결과는 기존 HTML과 동일하게 보여야 한다.
* 코드 구조·기술 방식은 새로 구현하되, **눈에 보이는 디자인은 바꾸지 않는다.** 임의로 색을 바꾸거나 레이아웃을 "개선"하지 않는다.
* 기존 HTML 파일은 디자인 확인용 참조로만 사용하고, 그 안의 코드(CDN imports, inline Babel, DOM 직접 조작, 전역 window 변수, 옛 drag/drop 구현 등)는 복사하지 않는다.

판단이 어려우면 기존 HTML의 화면을 기준으로 맞추고, 모호하면 멈추고 묻는다.

---

## 코드 변경 시 4가지 원칙 (우선순위와 무관하게 모든 코드 변경 작업에 적용)

* 가정하지 말고 표면화하라 — 불확실하면 멈추고 묻는다. 해석이 여러 개라면 모두 제시한다.
* 단순함이 우선 — 요청된 것만 구현한다. 추측성 추상화·과도한 유연성·불필요한 방어 코드 금지.
* 외과적 변경 — 요청과 직접 관련 없는 코드는 건드리지 않는다. 본인이 만든 orphan만 정리한다.
* 검증 가능한 목표 — 작업 시작 전 성공 기준을 명시하고, 종료 후 그 기준으로 자체 검증한다.

출처: https://goddaehee.tistory.com/597 [갓대희의 작은공간:티스토리]

---

# Codex 작업 컨텍스트

코딩을 시작하기 전에 반드시 아래 순서대로 읽는다.

## 1순위 — Codex 표준 파일

1. 현재 파일 (`AGENTS.md`) — 프로젝트 규칙
2. 상위 경로와 사용자 전역의 `AGENTS.md` — 공통 Codex 규칙(있는 경우)
3. `.codex/skills/*/SKILL.md` — 관련 작업 또는 명시적 `$name` 호출 시 사용하는 프로젝트 스킬

## 2순위 — 이 프로젝트의 커스텀 문서 (있을 때만, 표준 파일 아님)

아래는 프로젝트 보조 문서다. 존재할 경우에만 이 순서로 읽고, 없으면 건너뛴다.

4. `docs/FRONTEND_GUIDELINES.md` — React 프론트엔드 구현 및 리뷰 기준
5. `docs/SPEC.md` — 기능 명세(있는 경우)
6. `docs/TASKS.md` — 작업 목록(있는 경우)
7. 디자인 레퍼런스 — `legacy/index.html`(기준 HTML)

아키텍처와 디자인 기준을 충분히 이해하기 전까지 구현을 시작하지 않는다.

> 프로젝트 작업은 Codex와 OMX를 기준으로 한다. 다른 에이전트 전용 설정이나 경로를 새로 추가하지 않는다.

---

# 기술 스택

## 프론트엔드

필수:

* React
* TypeScript
* Vite 또는 Next.js
* Tailwind CSS
* CSS Variables
* react-grid-layout
* Recharts
* Zustand
* TanStack Query

선택:

* Framer Motion
* React Hook Form
* Zod
* clsx
* cva

---

## 백엔드

MVP 아키텍처:

* 고정 egress IP를 지원하는 Node.js API 서버
* Better Auth 기반 카카오 OAuth와 서버 세션
* Neon Postgres
* 증권사별 adapter 경계

Mock 데이터는 개발과 테스트 fixture로 유지하되 실제 API 전환을 허용한다.
초기 실연동은 계좌·잔고·보유종목·거래내역 조회만 지원하고 주문과 자동매매는 구현하지 않는다.
증권사 자격증명과 접근 토큰은 브라우저 또는 클라이언트 번들에 저장하지 않는다.

## Package Manager

이 프로젝트는 pnpm을 사용한다.

필수:

npm, yarn, bun을 사용하지 않는다.
dependency 설치는 반드시 pnpm install로 한다.
script 실행은 반드시 pnpm 명령어를 사용한다.
lockfile은 pnpm-lock.yaml만 유지한다.

금지:

package-lock.json 생성
yarn.lock 생성
bun.lockb 생성

---

# 핵심 아키텍처 원칙

## 1. 관심사 분리 (Separation of Concerns)

다음 영역을 엄격히 분리한다.

* UI 렌더링
* 레이아웃 관리
* 상태 관리
* API 요청 처리
* 비즈니스 로직
* 포맷팅 유틸리티

비즈니스 로직은 UI 컴포넌트 내부에 존재하면 안 된다.

---

## 2. 타입 안정성

TypeScript를 엄격하게 사용한다.

금지 사항:

* any 사용
* unsafe cast
* 느슨한 nullable 처리

항상 타입 정의를 먼저 작성한다.

---

## 3. 컴포넌트 아키텍처

위젯은 반드시 다음 조건을 만족해야 한다.

* 독립적이어야 함
* 재사용 가능해야 함
* 개별 테스트 가능해야 함
* 레이아웃에 의존하지 않아야 함

위젯은 다음 행위를 하면 안 된다.

* 대시보드 상태를 직접 변경
* 글로벌 데이터를 직접 fetch
* 관련 없는 비즈니스 로직 보유

---

## 4. 대시보드 아키텍처

`react-grid-layout`을 사용한다.

필수 요구사항:

* 드래그 가능한 위젯
* 크기 조절 가능한 위젯
* 반응형 브레이크포인트
* 레이아웃 저장
* 레이아웃 초기화
* 안정적인 widget ID

전체 위젯이 아니라 drag handle 기반으로 드래그해야 한다.

---

# 폴더 구조

다음 구조를 사용한다.

```txt
src/
  app/
  components/
    dashboard/
    widgets/
    common/
    layout/
  stores/
  hooks/
  api/
  lib/
  mocks/
  styles/
  types/
```

---

# 상태 관리 규칙

## Zustand

Zustand는 클라이언트 UI 상태 전용으로 사용한다.

* 테마
* 다크모드
* 대시보드 레이아웃
* 위젯 표시 여부
* sidebar open state (sidebar 가 존재할 경우에만)
* modal state
* filter UI state
* 사용자 UI 환경설정

금지:

* API 응답 데이터 저장
* portfolio data 저장
* holdings 저장
* 서버 캐시 저장
* 비동기 서버 상태 저장

Zustand는 서버 상태 저장소로 사용하지 않는다.

---

## TanStack Query

TanStack Query는 서버 상태 전용으로 사용한다.

사용 대상:

* portfolio data
* holdings
* transaction history
* chart data
* API fetching
* caching
* loading/error state
* background refetch
* stale data 관리

서버 데이터의 source of truth는 TanStack Query이다.

컴포넌트는 직접 fetch하지 말고 query hook을 통해 접근한다.

---

# 데이터 규칙

초기 단계에서는 Mock 데이터만 사용한다.

다음 타입을 정의한다.

* PortfolioSummary
* Holding
* Transaction
* EquityCurvePoint
* AllocationItem
* DashboardLayout
* DashboardWidget

Mock 데이터는 키움증권 기반 포트폴리오처럼 보이도록 구성한다.

실제 증권사 연동은 아직 구현하지 않는다.

---

# 위젯 규칙

모든 위젯은 다음 상태를 지원해야 한다.

* loading state
* empty state
* error state
* responsive layout
* overflow handling

모든 위젯은 `react-grid-layout` 내부에서도 독립적으로 동작해야 한다.

---

# 금지 패턴

다음 행위를 금지한다.

* any 사용
* 300줄이 넘는 거대한 컴포넌트 생성
* 데이터 fetching과 presentation 혼합
* 위젯 레이아웃 로직 중복
* Zustand state 직접 mutate
* unnamed export 사용
* circular import 생성
* 컴포넌트 내부에 비즈니스 로직 작성
* 과도한 prop drilling
* 서로 관련 없는 책임 혼합
* unstable key 사용
* 전역 mutable state 생성
* TypeScript 우회
* 기존 HTML의 시각적 결과를 임의로 변경

---

# 성능 규칙

필수:

* 비용이 큰 차트 계산은 memoization 적용
* 불필요한 rerender 방지
* stable reference 사용
* render 내부 inline object 재생성 방지
* 필요 시 무거운 컴포넌트 lazy-load

다음은 피한다.

* 불필요한 state
* 불필요한 context 사용
* 과도한 부모 컴포넌트 rerender

---

# 접근성 규칙

필수:

* 키보드 내비게이션
* 포커스 가시성
* 올바른 버튼 semantics
* 필요한 aria-label 제공
* 충분한 명도 대비
* 터치 친화적인 컨트롤

---

# 반응형 규칙

다음 환경을 지원해야 한다.

* 데스크탑
* 태블릿
* 모바일

위젯은 다음 조건을 만족해야 한다.

* 올바르게 크기 조절될 것
* overflow 방지
* 터치 인터랙션 지원
* 작은 화면에서도 사용성 유지

---

# Git 워크플로우 규칙

의미 있는 작업 단위마다 반드시 commit을 생성해야 한다.

필수 commit 경계:

* 프로젝트 초기화
* 테마 시스템
* mock 데이터/타입
* 대시보드 grid
* 주요 위젯별 작업
* 데이터 레이어
* 반응형 마감 작업
* 리팩토링
* QA 수정

하나의 거대한 commit을 만들지 않는다.

---

# Commit 메시지 규칙

제목은 Conventional Commit 형식을 사용하고, 본문은 AGENTS 상위 지침의 Lore Commit Protocol을 따른다.

허용 prefix:

* feat:
* fix:
* refactor:
* chore:
* style:
* test:

예시:

* feat: responsive dashboard grid 추가
* feat: holdings widget 구현
* fix: allocation percentage 계산 수정
* refactor: widget card component 분리

필요한 의사결정 맥락은 `Constraint:`, `Rejected:`, `Confidence:`, `Scope-risk:`,
`Directive:`, `Tested:`, `Not-tested:` trailer로 기록한다. 자동 공동작성자 trailer는 추가하지 않는다.

---

# Commit 전 필수 실행

다음 명령어를 실행한다.

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

하나라도 실패하면:

* 먼저 문제를 수정한다.
* 깨진 상태로 commit하지 않는다.

---

# Commit 후 출력 사항

다음 정보를 출력한다.

* commit hash
* commit message
* 변경 사항 요약
* 검증 결과

---

# 최대 변경 크기 규칙

권장:

* commit당 1개의 기능
* 리뷰 가능한 작은 단위 변경
* PR 수준의 집중된 작업

다음은 피한다.

* 대규모 rewrite
* 관련 없는 cleanup
* architecture/UI/API를 한 번에 섞는 작업

---

# 완료 정의 (Done Definition)

다음 조건을 모두 만족해야 작업이 완료된 것으로 간주한다.

* 구현 완료
* TypeScript 통과
* lint 통과
* build 통과
* 반응형 동작 정상
* 다크 모드 정상
* loading/error state 존재
* 기존 HTML과 시각적으로 동일
* 변경 사항 commit 완료
* 작업 요약 출력 완료

---

# 내부 역할 분리

필요할 경우 아래 역할을 내부적으로 활용한다.

## Planner

책임:

* 작업 단계 분리
* 영향 받는 파일 식별
* 리스크 식별
* 구현 계획 수립

즉시 코딩부터 시작하지 않는다.

---

## UI Engineer

책임:

* 컴포넌트
* 레이아웃
* 스타일링
* 반응형 동작
* 인터랙션 완성도

---

## Data Engineer

책임:

* 타입
* API 레이어
* Mock 데이터
* Query hook
* 포맷팅 유틸리티

---

## QA Engineer

책임:

* lint/typecheck/build 검증
* loading state
* error state
* 모바일 레이아웃
* edge case
* 접근성

---

## Refactor Engineer

책임:

* 중복 제거
* 가독성 향상
* 아키텍처 단순화
* 유지보수성 향상

기능이 먼저 동작한 뒤에만 리팩토링한다.

---

# 전문 리뷰 역할

## Architecture Reviewer

검토 항목:

* dependency 방향
* 관심사 분리
* 폴더 구조
* 모듈 경계

---

## Accessibility Reviewer

검토 항목:

* keyboard navigation
* focus state
* aria 사용
* contrast
* semantics

---

## Performance Reviewer

검토 항목:

* rerender
* memoization
* bundle size
* heavy component
* 불필요한 state

---

## Type Safety Reviewer

검토 항목:

* any 사용 여부
* unsafe cast
* nullable 처리
* 중복 타입

---

## Responsive Reviewer

검토 항목:

* 모바일 레이아웃
* 위젯 리사이징
* overflow
* 터치 사용성
* breakpoint

---

# 코딩 전 반드시 생각할 것

구현 전에 다음 내용을 먼저 정리한다.

1. 작업 요약
2. 영향 받는 파일 식별
3. 리스크 식별
4. 구현 계획 제안

즉시 코딩부터 시작하지 않는다.

---

# PR 리뷰 기준

작업 종료 전 반드시 다음 내용을 설명한다.

1. 무엇이 변경되었는가
2. 왜 변경했는가
3. 어떤 아키텍처 결정을 내렸는가
4. 어떤 tradeoff가 있었는가
5. 향후 개선 가능 사항

---

# CI 규칙

모든 작업은 다음 검증을 통과해야 한다.

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

하나라도 실패하면 CI도 실패해야 한다.

---

# 최종 원칙

다음 가치를 우선한다.

1. 유지보수성
2. 명확성
3. 아키텍처
4. 일관성
5. UX 품질

다음보다 우선한다.

* 속도
* 임시방편
* 지름길
* 성급한 최적화
