---
name: commit
description: 작업 단위가 완성될 때마다 자동으로 커밋한다. 기능 구현, 테마 설정, 타입 정의, 위젯 추가 등 의미 있는 단위가 끝날 때마다 이 스킬을 따른다. 사용자가 "커밋해줘", "저장해줘", "반영해줘"라고 하거나, 작업 단계(feat/chore/refactor 등)가 완료될 때 자동으로 실행한다.
---

# 커밋 절차

CLAUDE.md의 커밋 규칙을 기반으로 한 실행 절차다.
작업 단위가 완성될 때마다 이 순서를 따른다.

## 커밋 타이밍 (언제 커밋하는가)

다음 중 하나가 완료되면 즉시 커밋한다:

- 프로젝트 초기화 완료
- 테마/스타일 시스템 완성
- 타입 정의 또는 mock 데이터 완성
- 데이터 레이어(query hook) 완성
- 대시보드 grid/레이아웃 완성
- **위젯 하나** 완성 (loading/error/empty 상태 포함)
- 반응형 마감 완성
- QA/리팩토링 단위 완성
- 사용자가 명시적으로 요청할 때

절대 하지 말 것:
- 여러 위젯을 한 커밋에 묶기
- 깨진 상태(lint/build 실패)로 커밋
- 관련 없는 파일을 같이 스테이징

## 커밋 전 필수 검증 (하나라도 실패하면 먼저 고친다)

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

## 커밋 메시지 형식

Conventional Commit을 따른다.

```
<prefix>: <한글 설명>
```

허용 prefix:
- `feat:` — 새 기능/위젯/레이어
- `fix:` — 버그 수정
- `refactor:` — 동작 변화 없는 코드 개선
- `chore:` — 빌드/설정/의존성
- `style:` — 스타일·포맷 (기능 변화 없음)
- `test:` — 테스트

예시:
```
feat: summary widget 구현
feat: 테마 시스템 — CSS 변수 토큰 추출
chore: 프로젝트 초기화
fix: allocation 퍼센트 계산 수정
refactor: widget card 컴포넌트 분리
```

## 커밋 후 할 일

1. `docs/TASKS.md`에서 해당 항목을 `[x]`로 체크하고 커밋 해시를 기록한다.
2. 커밋 결과를 사용자에게 한 줄로 보고한다: 해시, 메시지, 변경 파일 수.

## 커밋 명령어 템플릿

```bash
# 검증
pnpm run lint && pnpm run typecheck && pnpm run build

# 스테이징 (관련 파일만)
git add <파일들>

# 커밋
git commit -m "$(cat <<'EOF'
feat: 설명

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```
