// #[issue-number] [type]: [commit message] -> 해당 형식에 맞춘 커밋 메시지 작성을 강제하는 commitlint 설정값
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-pattern": [
      2,
      "always",
      "^#\\d+\\s+(feat|fix|docs|style|refactor|test|chore):\\s.+$",
    ],
    "type-case": [0], // type 대소문자 검사 비활성화 (직접 추출 어려움)
    "subject-empty": [2, "never"],
    "header-max-length": [2, "always", 120],
    "header-min-length": [2, "always", 15], // 예: 최소 15자
  },
};
