# 보안 기준

## 환경변수 경계

- `.env.example`에는 변수명과 플레이스홀더만 기록한다. 실제 값은 Git에서 제외된 로컬 `.env` 또는 배포 플랫폼의 secret manager에 저장한다.
- `VITE_` 접두사가 붙은 값은 브라우저에 노출 가능한 공개 설정으로만 사용한다.
- `DATABASE_URL`, `BETTER_AUTH_SECRET`, `KAKAO_CLIENT_SECRET`, 증권사 API 키·시크릿·접근 토큰은 backend 전용이다.
- 증권사 자격증명은 브라우저 저장소, 응답 본문, 분석 이벤트, 오류 메시지, 로그에 남기지 않는다.

## 인증과 네트워크

- 인증 세션 쿠키는 `HttpOnly`, production의 `Secure`, 적절한 `SameSite`와 짧은 만료 시간을 적용한다.
- 카카오 OAuth callback은 `state`를 검증하고 등록된 redirect URI만 허용한다.
- credential 요청의 CORS origin은 명시적 allowlist로 제한하며 `*`를 사용하지 않는다.
- 상태 변경 요청에는 CSRF 방어와 사용자별 rate limit을 적용한다.

## 데이터와 권한

- Neon 연결은 TLS를 강제한다. runtime은 pooled URL, migration은 direct URL을 분리한다.
- 애플리케이션 DB 역할은 최소 권한으로 운영하고 모든 사용자 데이터 쿼리에 인증된 user ID 경계를 강제한다.
- 증권사 자격증명은 KMS envelope encryption 후 암호문만 Neon에 저장한다. 복호화 권한은 broker adapter 실행 주체에만 부여한다.
- 키 조회·교체·연결 해제와 인증 실패는 비밀값을 제외한 감사 이벤트로 남긴다.

## 로컬과 CI 검사

커밋 전 `pnpm security:secrets`를 실행한다. CI는 추적된 `.env`, 개인키 파일, 알려진 토큰·키 패턴을 발견하면 실패한다. GitHub 저장소에서는 secret scanning과 push protection도 활성화한다.

## 유출 대응

비밀값이 커밋되었다면 파일만 삭제해서는 해결되지 않는다. 먼저 공급자에서 키를 폐기·회전하고 세션과 토큰을 무효화한 다음, Git 기록 정리와 접근 로그 감사를 진행한다.
