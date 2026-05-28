---
name: add-widget
description: 포트폴리오 대시보드에 새 위젯을 추가한다. 사용자가 위젯 추가, 새 위젯, 대시보드 카드 추가, "~위젯 만들어줘", "대시보드에 ~보여주는 거 넣어줘" 같은 요청을 하면 반드시 이 스킬을 사용한다. 위젯 비슷한 화면 구성요소(카드/패널/차트 블록)를 대시보드에 새로 붙이는 모든 작업에 적용한다.
---

# 새 위젯 추가

이 프로젝트의 대시보드에 위젯 하나를 추가하는 표준 절차다. 매번 같은 순서로
파일을 만들고 등록해야 하며, `CLAUDE.md`의 아키텍처 규칙을 위반하면 안 된다.
시작 전에 `CLAUDE.md`를 이미 읽었다고 가정한다. 모호하면 멈추고 묻는다.

## 성공 기준 (시작 전 확인, 종료 후 자체 검증)

- 위젯이 `react-grid-layout` 안에서 드래그·리사이즈된다
- loading / empty / error / 정상 상태를 모두 처리한다
- 데이터는 컴포넌트가 직접 fetch하지 않고 query hook으로만 받는다
- 비즈니스 로직·포맷팅이 컴포넌트 안에 들어 있지 않다
- 색·간격을 하드코딩하지 않고 디자인 토큰(CSS 변수)을 쓴다
- 기존 HTML의 시각적 느낌을 훼손하지 않는다
- `any` 없음, named export, 300줄 이하
- `pnpm run lint && pnpm run typecheck && pnpm run build` 통과

## 시작 전 물어볼 것 (확실하지 않으면 진행하지 말 것)

1. 위젯이 무엇을 보여주는가? (예: 배당 일정, 섹터 비중)
2. 어떤 데이터가 필요한가? 기존 mock 타입으로 충분한가, 새 타입이 필요한가?
3. 기본 grid 크기(가로 칸 수 / 세로 높이)는?
4. 기본 레이아웃에 바로 노출할 것인가, 토글로만 켜는 위젯인가?

답이 비면 임의로 가정하지 말고 사용자에게 확인한다.

## 단계

순서대로 진행한다. 각 단계는 작은 단위로, CLAUDE.md의 commit 규칙에 맞춰 커밋한다.

### 1. 타입 정의 (필요한 경우)
- 새 데이터 형태가 필요하면 `src/types/`에 인터페이스를 먼저 정의한다.
- 기존 타입(`Holding`, `Transaction` 등)으로 충분하면 새로 만들지 않는다.
- 타입을 항상 코드보다 먼저 작성한다.

### 2. Mock 데이터 (서버 데이터가 필요한 경우)
- `src/mocks/`에 키움증권 기반 포트폴리오처럼 보이는 mock을 추가한다.
- 실제 증권사 연동은 하지 않는다.

### 3. Query hook (서버 데이터가 필요한 경우)
- `src/hooks/` 또는 `src/api/`에 TanStack Query 기반 hook을 만든다
  (예: `useDividendSchedule`).
- 서버 상태의 source of truth는 TanStack Query다. Zustand에 넣지 않는다.
- 컴포넌트는 이 hook을 통해서만 데이터에 접근한다.

### 4. 포맷팅/계산 유틸 (필요한 경우)
- 금액·퍼센트 포맷이나 파생 계산은 `src/lib/`의 유틸로 분리한다.
- 컴포넌트 내부에 계산 로직을 넣지 않는다. 무거운 계산은 memoize한다.

### 5. 위젯 컴포넌트
- `src/components/widgets/<WidgetName>Widget.tsx`에 만든다. named export.
- props는 레이아웃에 의존하지 않게 한다. 위젯은 대시보드 상태를 직접 바꾸지 않는다.
- loading / empty / error / 정상 4가지 상태를 모두 렌더한다.
- 스타일은 Tailwind + CSS 변수 토큰. 색·간격 하드코딩 금지. overflow 처리.
- drag handle 영역을 두어 위젯 전체가 아니라 핸들로만 드래그되게 한다.
- 디자인은 기존 위젯들과 같은 카드 모양·둥근 정도·그림자·말풍선 톤을 따른다.

### 6. 위젯 레지스트리 / 카탈로그에 등록
- 위젯 목록을 관리하는 곳(예: `src/components/dashboard/`의 위젯 카탈로그)에
  안정적인 widget id와 함께 등록한다. id는 절대 바뀌면 안 된다(레이아웃 저장 키).
- 기본 grid 레이아웃에 위치·크기를 추가한다.

### 7. 표시 여부 토글 (토글 위젯인 경우)
- 위젯 on/off는 UI 상태이므로 Zustand store에서 관리한다.
- 레이아웃·표시 여부는 저장되고 초기화 가능해야 한다.

### 8. 검증
- 데스크탑/태블릿/모바일에서 크기 조절·overflow 확인.
- 라이트/다크 테마 모두 확인.
- loading/empty/error 상태가 실제로 보이는지 확인.
- `pnpm run lint && pnpm run typecheck && pnpm run build` 통과시킨 뒤 커밋한다.
  하나라도 실패하면 고치기 전에는 커밋하지 않는다.

## 커밋

CLAUDE.md의 Conventional Commit 규칙을 따른다. 예:
- `feat: dividend-schedule widget 구현`

위젯 하나가 1개의 집중된 작업 단위다. 여러 위젯을 한 커밋에 섞지 않는다.

## 절대 하지 말 것

- 컴포넌트에서 직접 fetch (반드시 query hook 경유)
- Zustand에 서버 데이터 저장
- 색·간격 하드코딩, 거대한 inline style
- 위젯 레이아웃 로직 중복
- unstable key / id 변경
- 기존 HTML 디자인을 임의로 "개선"
- `any`, unsafe cast, 타입 우회

## 마무리 보고

작업 종료 시 다음을 출력한다: 무엇을/왜 변경했는지, 추가한 파일 목록,
내린 아키텍처 결정, lint/typecheck/build 검증 결과.
