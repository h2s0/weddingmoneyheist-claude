# 작업 목록

진행 상태를 추적한다. 완료된 항목은 `[x]`로 표시하고, 커밋 해시를 기록한다.

---

## 기반 작업

- [x] `chore: 프로젝트 초기화` — Vite + React + TS, pnpm, Tailwind, ESLint/tsc/build 스크립트 (72c2b4e)
- [x] `feat: 테마 시스템` — CSS 변수 토큰, 라이트/다크, Pretendard + Jua 폰트 (4cf60b6)
- [x] `feat: mock 데이터/타입` — 7개 타입 정의, 키움증권풍 mock 데이터 (954d852)
- [x] `feat: 데이터 레이어` — TanStack Query hooks (portfolio/holdings/transactions/chart/allocation) (c3105c0)
- [x] `feat: 대시보드 grid` — react-grid-layout, Zustand store, drag handle, 레이아웃 저장/초기화 (83e552d)

## 위젯 구현

- [x] `feat: summary widget 구현` — 아빠 자산 💰 (acb47f3)
- [x] `feat: today widget 구현` — 오늘 변동 ✨ (acb47f3)
- [x] `feat: bestworst widget 구현` — 효자/효녀 🏆 (acb47f3)
- [x] `feat: equity-chart widget 구현` — 수익률 추이 📈 (acb47f3)
- [x] `feat: allocation widget 구현` — 자산 배분 🥧 (acb47f3)
- [x] `feat: holdings widget 구현` — 보유 종목 🛒 (acb47f3)
- [x] `feat: transactions widget 구현` — 매매 기록 📒 (acb47f3)
- [x] `feat: mascot widget 구현` — 딸 한마디 💌 (acb47f3)

## 마감

- [x] `feat: tweaks panel 구현` — 위젯 on/off 토글, 테마 전환 (d37231b)
- [x] `feat: 반응형 마감` — 데스크탑/태블릿/모바일 (d37231b)
- [ ] `refactor: QA` — 다크모드, loading/empty/error, 중복 제거

---

## 사용자 계정·증권사 연동 로드맵

목표 사용자 흐름:

`로그인 → 증권사 API 연결(미등록 시) → 대시보드 → 매수법 선택/설정`

초기 릴리스는 **계좌 조회와 매수법 설정·시뮬레이션만** 지원한다. 실제 주문과 자동매매는 아래 단계가 모두 검증된 뒤 별도 프로젝트로 결정하며, 증권사 API 키·시크릿·접근 토큰은 브라우저 저장소에 보관하지 않는다.

### 0. 제품·아키텍처 결정

- [x] `docs: DB provider 확정` — 사용자·세션·연결·전략 데이터는 Neon Postgres에 저장
- [ ] `docs: 인증·백엔드 ADR 작성` — 고정 IP Node backend + Better Auth 구성을 확정하고 Neon Auth Beta는 현재 범위에서 제외
- [x] `docs: OAuth 제공자 확정` — MVP는 카카오 단일 provider로 확정하고 Google·네이버는 현재 범위에서 제외
- [ ] `docs: 최초 지원 증권사 확정` — 공식 API, 모의투자, 조회 API, 허용 IP, 사용자 소유 키 위임/제휴 약관을 확인해 1곳만 먼저 선정
- [x] `docs: 금융 기능 범위 확정` — 조회 전용, 주문 미지원, 자동매매 미지원, 투자 조언이 아닌 사용자 설정 도구임을 명시
- [x] `docs: 프로젝트 규칙 갱신` — `AGENTS.md`와 `HANDOFF.md`의 mock-only 제한을 조회 전용 실연동 범위로 변경

### 1. 테스트·보안 기반

- [ ] `test: 테스트 기반 구성` — Vitest + Testing Library 단위/통합 테스트와 Playwright E2E 스크립트 추가
- [x] `feat: 환경변수 경계 구성` — 공개/서버 변수를 분리하고 `.env.example`, Git 제외, secret 검사, 최소 권한 CI 구성
- [ ] `chore: Neon Postgres 구성` — 프로젝트/리전 생성, pooled `DATABASE_URL`, migration용 direct URL, preview branch 운영 규칙 설정
- [ ] `feat: Node backend 기반 구성` — 카카오 OAuth와 증권사 adapter를 함께 실행할 API 서버, secure cookie, CORS, health check 구성
- [ ] `feat: 고정 egress 네트워크 구성` — 선정 증권사가 IP allowlist를 요구하면 고정 공인 IP를 가진 backend/proxy를 구성
- [ ] `feat: 사용자 데이터 스키마 구성` — Better Auth 테이블과 `profiles`, `broker_connections`, `investment_strategies`, `user_strategy_settings`, `audit_events`를 Neon migration으로 관리
- [ ] `feat: 사용자별 권한 경계 구성` — 모든 query에 인증된 user ID를 강제하고 DB 제약과 integration test로 교차 사용자 접근 차단
- [ ] `feat: 증권사 비밀정보 저장소 구성` — API 키·시크릿·토큰을 KMS 기반으로 암호화한 뒤 Neon에 저장하고 응답·로그·분석 이벤트에서 마스킹
- [ ] `test: 보안 회귀 테스트` — 비로그인 접근, 다른 사용자 데이터 접근, 비밀값 응답 노출, 로그 노출을 실패 케이스로 고정

### 2. 카카오 OAuth 로그인

- [ ] `feat: 앱 라우팅 구성` — `/login`, `/auth/callback`, `/onboarding/broker`, `/dashboard`, `/settings` 경로와 not-found 화면 추가
- [ ] `chore: Kakao Developers 앱 구성` — REST API 키, 활성화한 Client Secret, Better Auth backend callback URL, 카카오 로그인과 동의항목 설정
- [ ] `feat: 카카오 OAuth 세션 구성` — Better Auth `kakao` provider, Neon session 저장, secure cookie, callback, 복원, 로그아웃, 만료/취소/실패 처리
- [ ] `feat: 카카오 로그인 화면 구현` — 기존 디자인 토큰을 사용한 카카오 로그인 버튼과 개인정보·이용 안내 링크 제공
- [ ] `feat: 카카오 프로필 정규화` — 고유 사용자 ID를 기준으로 profile을 생성하고 이메일 미동의·미제공 사용자를 허용
- [ ] `feat: 인증 가드 구현` — 미로그인 사용자는 `/login`으로 보내고 로그인 완료 후 원래 목적지 복원
- [ ] `test: 카카오 OAuth 흐름 검증` — 로그인 성공, 이메일 미제공, 동의 취소, callback 오류, 세션 만료, 로그아웃 E2E 통과

### 3. 증권사 API 온보딩

- [ ] `feat: broker adapter 계약 정의` — 증권사별 인증/계좌/잔고/보유종목/거래내역 응답을 공통 타입으로 정규화
- [ ] `feat: 증권사 선택 화면 구현` — 지원 증권사, 실전/모의투자 환경, 준비물, 연결 상태 표시
- [ ] `feat: API 입력 화면 구현` — 증권사별 필드, 비밀번호 표시 토글, 민감정보 안내, 취소/재시도 제공
- [ ] `feat: 서버 측 연결 검증 구현` — 입력값을 브라우저에 저장하지 않고 서버에서 검증한 뒤 성공한 연결만 저장
- [ ] `feat: 연결 관리 구현` — 연결 상태 조회, 재검증, 키 교체, 연결 해제, 마지막 동기화 시각 제공
- [ ] `feat: 온보딩 가드 구현` — 로그인했지만 유효한 증권사 연결이 없으면 `/onboarding/broker`로 이동
- [ ] `test: 증권사 연결 흐름 검증` — 누락/잘못된 키, API 장애, rate limit, 토큰 만료, 연결 해제 E2E 통과

### 4. 실제 포트폴리오 조회

- [ ] `feat: 서버 측 증권사 API client 구현` — 토큰 발급/갱신, timeout, 재시도, rate limit, 오류 매핑을 adapter 내부에 격리
- [ ] `feat: 포트폴리오 조회 API 구현` — summary, holdings, transactions, equity curve, allocation을 사용자 연결 기준으로 제공
- [ ] `refactor: query hook 실제 API 전환` — 기존 TanStack Query 계약은 유지하고 mock queryFn을 인증된 API client로 교체
- [ ] `feat: 동기화 상태 UI 구현` — 최초 로딩, stale 데이터, 부분 실패, 재동기화, 연결 만료 상태 표시
- [ ] `feat: 운영 관측성 구성` — 비밀값을 제외한 요청 ID, 증권사 오류 코드, 동기화 결과, 지연시간 기록
- [ ] `test: 포트폴리오 계약 검증` — adapter contract test와 mock/실제 API 응답 정규화 테스트 통과

### 5. 대시보드 진입 흐름

- [ ] `feat: 사용자 상태 해석 구현` — `anonymous`, `authenticated`, `broker_required`, `ready` 상태를 서버 데이터로 판정
- [ ] `feat: 대시보드 접근 순서 연결` — 로그인과 증권사 연결 완료 후에만 실제 데이터 대시보드 표시
- [ ] `feat: 첫 동기화 경험 구현` — 연결 직후 진행 상태를 보여주고 완료되면 대시보드로 전환
- [ ] `feat: 연결 오류 복구 UI 구현` — 대시보드에서 재연결·키 교체 화면으로 이동 가능
- [ ] `test: 전체 접근 흐름 검증` — 새 사용자, 기존 사용자, 연결 만료 사용자, 연결 해제 사용자 E2E 통과

### 6. 매수법 선택·설정

- [ ] `docs: 매수법 도메인 정의` — 이름, 설명, 출처, 적용 시장, 위험 수준, 파라미터, 면책 문구, 버전 필드 정의
- [ ] `feat: 매수법 카탈로그 구성` — 첫 템플릿으로 라오어의 무한매수법을 추가하되 원문 복제 없이 출처와 사용자 입력 파라미터만 관리
- [ ] `feat: 대시보드 첫 진입 안내 구현` — 대시보드를 먼저 보여준 뒤 매수법 미선택 사용자에게 선택 CTA/모달 표시
- [ ] `feat: 매수법 선택 화면 구현` — 상세 설명, 위험 안내, 필수 파라미터, 저장 전 확인 단계 제공
- [ ] `feat: 사용자 매수법 설정 저장` — 선택 전략, 파라미터, 버전, 활성/비활성 상태를 서버에 사용자별 저장
- [ ] `feat: 전략 요약 위젯 구현` — 선택한 매수법과 현재 설정을 대시보드에 표시하고 수정 화면 연결
- [ ] `feat: 전략 시뮬레이션 구현` — 실제 주문 없이 현재 보유 데이터 기반 회차·예산·가상 주문 계획만 계산
- [ ] `test: 매수법 흐름 검증` — 미선택/선택/수정/비활성화, 잘못된 파라미터, 버전 변경 E2E 통과

### 7. 출시 전 검증

- [ ] `security: 위협 모델 검토` — OAuth callback, CSRF/state, 세션 탈취, IDOR, secret leakage, rate limit, 계정 삭제 시나리오 점검
- [ ] `test: 핵심 사용자 여정 E2E` — 로그인부터 증권사 연결, 대시보드, 매수법 선택까지 CI에서 통과
- [ ] `test: 접근성·반응형 QA` — 키보드, 포커스, 오류 읽기, 모바일 API 입력, 다크모드 확인
- [ ] `docs: 운영 문서 작성` — OAuth/증권사 설정, 키 회전, 장애 대응, 사용자 데이터 삭제 절차 작성
- [ ] `chore: production readiness 검증` — lint, typecheck, unit/integration, E2E, build, secret scan 모두 통과
