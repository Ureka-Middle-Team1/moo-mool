## 성향테스트 기반 AI 요금제 추천 서비스, 무물🐙
<div align="center">

  ![무물배너](https://github.com/user-attachments/assets/540f7747-c3a8-434c-bc23-88ef7bf35f7b)

**성향 테스트와 챗봇을 통해 **나에게 딱 맞는 통신사 요금제를 추천**해주는 AI 맞춤형 서비스**  
 _유레카 프론트엔드 개발자 2기 종합 프로젝트 우수상🎖️_

</div>

### 🗣️ [발표 자료](https://www.canva.com/design/DAGrUWfVK6s/5B5iXslpYCPDJdLXwNfOYQ/edit?utm_content=DAGrUWfVK6s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### 🔗 [moo-mool.com](https://moo-mool.com/) 

### 🔗 [무물 시연 영상 Youtube](https://www.youtube.com/watch?v=edAW9odsNyo)
![_-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e18e4c18-609d-4eef-8b96-4bea9b5c811b)


</div>

<br/>
<br/>

## 프로젝트 개요

| 항목           | 내용                             |
| -------------- | -------------------------------- |
| **프로젝트명** | 무물 moo-mool                    |
| **팀명**       | YouGodIT                         |
| **주제**       | 성향테스트 기반 AI 요금제 추천 서비스 |
| **타겟층**     | SNS 트렌드에 민감한 MZ세대    |
| **개발 기간**  | 2025.06.04 ~ 2025.06.26 (약 3주) |
| **팀 구성**    | Frontend 6명 (Full-Stack + AI)   |

<br/>
<br/>

## 🔧 기능 소개

| 기능 미리보기 | 기능 설명 |
|:-------------:|-----------|
| <img src="https://github.com/user-attachments/assets/64b5383a-3844-4f9f-8867-339163413bdb" width="220"/> | **1. 🔐 소셜 로그인 & 인증 시스템 (NextAuth + Middleware)**<br/><br/>- `NextAuth.js + Kakao/Google/Naver OAuth2`: 다양한 소셜 로그인 구현<br/>- `JWT (HttpOnly Cookie 저장)`: 안전한 인증 정보 관리<br/>- `Next.js Middleware`: 인증된 사용자만 접근 가능한 경로 보호<br/>- `Zustand + localStorage`: 인증 상태 및 사용자 정보 전역 관리<br/>- `Axios Interceptor`: 401 응답 시 자동으로 Refresh Token 재요청 처리 |
| <img src="https://github.com/user-attachments/assets/fd9a339d-0034-4584-b373-7ec56dc4dd21" width="220"/> | **2. 💡요금제 탐색 및 비교**<br/><br/>- `Next.js + Prisma (MySQL)` : 서버 API 및 DB 연동<br/>- `Chart.js` : 사용 요금제와 추천 요금제 비교 시각화<br/>- `Tailwind CSS + Framer Motion` : 리스트/카드 기반 UI 구성 및 애니메이션<br/>- `TanStack Query (React Query)` : 요금제 리스트 페이지네이션 및 Lazy Loading<br/>- `URL 쿼리 기반 필터링` : 통신망(LTE/5G), 가격, OTT 포함 여부 서버 필터링 |
| <img src="https://github.com/user-attachments/assets/936460d7-b497-4be1-af16-c5be2657bd05" width="220"/> | **3. 🧠 AI 챗봇 요금제 추천 (텍스트/음성)**<br/><br/>- OpenAI 기반 챗봇과 대화하며 요금제 추천<br/>- 텍스트/음성 입력 모두 지원<br/>- 성향 질문 기반 요금제 추천 대화 흐름 구성<br/>- 대화 중 모드 전환(정확 / 자연) 가능<br/>- 챗봇 중간 이탈 후 재접속 시 대화 이어짐 |
| <img src="https://github.com/user-attachments/assets/05576cd0-3627-4088-b99c-670042d2c65c" width="220"/> | **4. 🎭 밈 테스트 기반 무너 캐릭터와 요금제 추천**<br/><br/>- 6가지 카테고리`(SNS, Youtube, Call, Chat, Books, Savings)`의 질문을 통해 사용자 통신 성향 도출<br/>- `Next.js App Router + Prisma` : 성향 분석 결과 저장 및 추천 흐름<br/>- `CryptoJS (AES)` : 공유 링크 내 userId 암호화 및 복호화 처리<br/>- `generateMetadata()` : 공유 페이지 별 OG 메타태그 동적 설정<br/>- `KakaoTalk SDK` : 카카오톡 공유 기능 및 클릭 트래킹 구현<br/>- `Zustand` : 테스트 결과 및 상태 전역 관리<br/>- `OG Preview 최적화` : 공유자 이름 포함한 미리보기 문구 자동 반영 |
| <img src="https://github.com/user-attachments/assets/4de03fa5-2ac3-4e57-9c32-95ba6a7ee11a" width="220"/> | **5. 🧭 주변 사용자 탐색 & 실시간 상호작용**<br/><br/>- `WebSocket (ws)` : 사용자 위치 실시간 공유 및 클릭 이벤트 전송<br/>- `Geolocation API` : GPS 기반 사용자 위치 탐지 및 반경 100m 내 접속자 존재 탐지<br/>- `Vibration API + 하트 애니메이션` : 상대방 클릭 시 피드백 제공<br/>- `Zustand + useRef/useMemo` : 상태 캐시 및 렌더링 최적화<br/>- `Framer Motion` : 아바타 등장 및 클릭 시 동적 애니메이션 처리<br/>- `Sonner` : 커스텀 토스트로 근처 사용자 탐색 반경 100m 내 접속자 존재 시 Home 화면에 toast 알림<br/><br/>🔗 [WebSocket 서버 바로가기](https://github.com/Ureka-Middle-Team1/nearby-wss-server) |

---

<br/>
<br/>

## ⚔️ 기술 스택
| 분야                         | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**               | ![React](https://img.shields.io/badge/React-61DAFB?style=flat\&logo=React\&logoColor=black) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat\&logo=Next.js\logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat\&logo=TypeScript\&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat\&logo=TailwindCSS\&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat\&logo=ReactQuery\&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat) ![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000?style=flat\&logo=shadcn\&logoColor=white) |
| **Backend**                | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=Node.js\&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat\&logo=Express\&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat\&logo=Prisma\&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat\&logo=MySQL\&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat\&logo=Swagger\&logoColor=black) |
| **Auth / Social Login**    | ![OAuth2](https://img.shields.io/badge/OAuth2-0052CC?style=flat) ![NextAuth](https://img.shields.io/badge/NextAuth.js-3ECF8E?style=flat) ![Kakao Login](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat\&logo=KakaoTalk\&logoColor=black) |
| **AI Integration**         | ![GPT-4.1-mini](https://img.shields.io/badge/GPT_4.1_mini-412991?style=flat\&logo=OpenAI\&logoColor=white) ![GPT-4.1-nano](https://img.shields.io/badge/GPT_4.1_nano-412991?style=flat\&logo=OpenAI\&logoColor=white) |
| **Deployment / Infra**     | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat\&logo=Vercel\&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat\&logo=Render\&logoColor=black) ![Amazon RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=flat\&logo=AmazonAWS\&logoColor=white) |
| **Collaboration / Tools**  | ![Git](https://img.shields.io/badge/Git-F05032?style=flat\&logo=Git\&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat\&logo=GitHub\&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat\&logo=Notion\&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat\&logo=Discord\&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat\&logo=Figma\&logoColor=white) |
| **Code Quality / Testing** | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat\&logo=Prettier\&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=flat) |


<br/>
<br/>

## 👥 팀원 및 역할 소개
| 프로필 | 이름 | 주요 역할 및 기여 내용 |
|--------|------|----------------------|
| <img src="https://avatars.githubusercontent.com/u/108103346?v=4" width="100" /> | **이은비**<br/>[@silverain02](https://github.com/silverain02) | **팀장 · 음성 챗봇 리드**<br/>- 프로젝트 기획 총괄 및 워크플로우 설계<br/>- 음성 입력 기반 AI 요금제 챗봇 구현<br/>- LangChain 기반 대화 흐름 설계 및 상태 관리<br/>- 음성 인식 처리 로직 및 UI 컴포넌트 구성<br/>- 요금제 추천 흐름 설계 및 테스트 |
| <img src="https://avatars.githubusercontent.com/u/88071251?v=4" width="100" /> | **박은서**<br/>[@arty0928](https://github.com/arty0928) | **풀스택 · 근거리 통신 & 공유 시스템 리드**<br/>- 서비스 전체 워크플로우 설계<br/>- [실시간 위치 공유 시스템 및 Node.js 서버 구현](https://github.com/Ureka-Middle-Team1/nearby-wss-server)<br/>- ERD 설계 기반 Prisma ORM으로 DB 스키마 및 관계형 모델링 구축<br/>- Kakao OAuth2 사용자 상태 Zustand 전역 관리<br/>- 위치 기반 사용자 정보 수집 및 클릭 이벤트 처리 로직 구현<br/>- 성향 테스트 제출 및 레벨업 시스템 API 구현<br/>- 공유 URL 내 userId AES 암호화 및 CryptoJS 기반 보안 처리 및 OG 메타 태그 동적 설정<br/>- 보상 시스템 로직 설계 및 클릭 이벤트 연동<br/>- 테스트 홈·결과 페이지, Nearby 위치 UI |
| <img src="https://avatars.githubusercontent.com/u/198835896?v=4" width="100" /> | **박희준**<br/>[@heejun8](https://github.com/heejun8) | **풀스택 · 요금제 시각화 및 추천 시스템**<br/>- Chart.js 기반 요금제 비교 시각화 구현<br/>- 사용자의 현재 요금제와 추천 요금제 시각적 비교 인터페이스 개발<br/>- 요금제 상세 정보 페이지 및 필터·정렬 기능 구현<br/>- 요금제 리스트 Pagination 및 Lazy Loading 처리<br/>- 추천 요금제 데이터 가공 및 백엔드 API 연동 |
| <img src="https://avatars.githubusercontent.com/u/195983909?v=4" width="100" /> | **안민지**<br/>[@minji-38](https://github.com/minji-38) | **풀스택 · 밈 테스트 UI 및 콘텐츠 리드**<br/>- 밈 테스트 디자인 총괄 및 문항 콘텐츠 제작<br/>- 문항 설계 및 결과 유형 매칭 로직 구현<br/>- 성향 테스트 결과 페이지, 마이페이지 UI 및 애니메이션 적용<br/>- 마이페이지 모달 및 공통 햄버거 메뉴 구현 |
| <img src="https://avatars.githubusercontent.com/u/55499429?v=4" width="100" /> | **정다희**<br/>[@alotofhee](https://github.com/alotofhee) | **풀스택 · AI 챗봇 플로우 & 인증 시스템 설계**<br/>- ERD 설계 및 Swagger API 문서 작성<br/>- Next.js `middleware.ts` 기반 인증 라우팅 구현<br/>- 로그인 여부에 따라 페이지 접근 제한 및 리디렉션 처리<br/>- 랜딩, 온보딩 페이지 UI 및 인터랙션 구현<br/>- AI 챗봇 단계별 로드맵 모달 UI 및 흐름 제어 로직 구현 |
| <img src="https://avatars.githubusercontent.com/u/127181459?v=4" width="100" /> | **허준호**<br/>[@gichulLimitLess](https://github.com/gichulLimitLess) | **풀스택 · AI 챗봇 & 요금제 추천 시스템 리드**<br/>- GPT API 연동 챗봇 대화 흐름 설계 및 질문 템플릿 구성<br/>- 추천 요금제 응답 JSON 파싱 및 카드형 UI 렌더링 처리<br/>- 자연스러운 모드 / 정확한 모드 전환 로직 구현<br/>- 요금제 추천 시스템 API 통합 및 응답 최적화<br/>- 사용자 챗봇 대화 기록 저장 및 AI 요약 기능 구현 |


<br/>
<br/>

## 🛠️ 시스템 아키텍쳐
<img width="1432" alt="image" src="https://github.com/user-attachments/assets/39333b56-7eb0-412d-98b1-b2e81d41f980" />

<br/>
<br/>

## 📌 ERD
<img width="1234" alt="image" src="https://github.com/user-attachments/assets/e6bf385b-800d-46cb-a77d-7d2382873719" />


<br/>
<br/>

## 🎯 서버 실행 방법
```
npm install
npm run dev
```

<br/>
<br/>

---
**Team YouGodIT** | LG U+ URECA 프론트엔드 개발자 과정 2기 종합프로젝트 1조
