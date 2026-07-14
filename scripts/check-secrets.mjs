import { readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const trackedFiles = readFileSync(0, 'utf8')
  .split('\0')
  .filter(Boolean)

const forbiddenFilePatterns = [
  /(^|\/)\.env(?:\..+)?$/,
  /\.(?:key|pem|p12|pfx|jks|keystore)$/i,
  /(^|\/)(?:credentials|service-account)[^/]*\.json$/i,
]

const allowedExamplePattern = /\.env(?:\..+)?\.example$/
const findings = []

for (const file of trackedFiles) {
  if (
    forbiddenFilePatterns.some((pattern) => pattern.test(file)) &&
    !allowedExamplePattern.test(file)
  ) {
    findings.push(`${file}: 비밀정보 파일은 Git으로 추적할 수 없습니다.`)
    continue
  }

  let content
  try {
    content = readFileSync(path.join(root, file), 'utf8')
  } catch {
    continue
  }

  const checks = [
    [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, '개인키 본문'],
    [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key'],
    [/\bgh(?:p|o|u|s|r)_[A-Za-z0-9]{36,255}\b/, 'GitHub token'],
    [
      /postgres(?:ql)?:\/\/[^\s/:]+:(?!PASSWORD(?:@|%40))[^\s/@]+@[^\s]+/i,
      '비밀번호가 포함된 PostgreSQL URL',
    ],
  ]

  for (const [pattern, label] of checks) {
    if (pattern.test(content)) {
      findings.push(`${file}: ${label} 패턴이 발견되었습니다.`)
    }
  }
}

if (findings.length > 0) {
  console.error('비밀정보 검사가 실패했습니다:\n')
  for (const finding of findings) console.error(`- ${finding}`)
  console.error('\n노출된 값은 Git 기록에서 지우기 전에 먼저 폐기하고 회전하세요.')
  process.exit(1)
}

console.log(`비밀정보 검사 통과 (${trackedFiles.length}개 추적 파일)`)
