# 성향테스트 기반 AI 요금제 추천 서비스, 무물
> LG 유플러스 유레카 SW 교육과정 2기 프론트엔드 종합프로젝트 1조

## 💡 개요
무물(Moo-mool)은 성향 테스트와 챗봇을 통해 **나에게 딱 맞는 통신사 요금제를 추천**해주는 AI 맞춤형 서비스입니다.  


![무물배너](https://github.com/user-attachments/assets/540f7747-c3a8-434c-bc23-88ef7bf35f7b)

### 🔗 [무물 바로가기 ](https://moo-mool.com/)

### 🔗 [무물 시연 영상 보기](https://www.youtube.com/watch?v=edAW9odsNyo)
![_-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e18e4c18-609d-4eef-8b96-4bea9b5c811b)



</div>

<br/>
<br/>

## 🔧 기능 소개
**1. 🔐 소셜 로그인 & 인증 시스템 (NextAuth + Middleware)**
<br/>
- `NextAuth.js + Kakao/Google/Naver OAuth2`: 다양한 소셜 로그인 구현
- `JWT (HttpOnly Cookie 저장)`: 안전한 인증 정보 관리
- `Next.js Middleware`: 인증된 사용자만 접근 가능한 경로 보호
- `Zustand + localStorage`: 인증 상태 및 사용자 정보 전역 관리
- `Axios Interceptor`: 401 응답 시 자동으로 Refresh Token 재요청 처리
<br/>
<br/>

**2.💡요금제 탐색 및 비교** : 필터, 정렬 기능 포함한 리스트 및 상세 비교
<br/>
- `Next.js + Prisma (MySQL)` : 서버 API 및 DB 연동
- `Chart.js` : 사용 요금제와 추천 요금제 비교 시각화
- `Tailwind CSS + Framer Motion` : 리스트/카드 기반 UI 구성 및 애니메이션
- `TanStack Query (React Query)` : 요금제 리스트 페이지네이션 및 Lazy Loading
- `URL 쿼리 기반 필터링` : 통신망(LTE/5G), 가격, OTT 포함 여부 서버 필터링
<br/>
<br/>

**3. 챗봇** : 텍스트·음성 입력을 통해 요금제 추천 대화 진행 (OpenAI 연동) 
중간에 대화를 이탈해도 

<br/>
<br/>

**4. 🎭 밈 테스트 기반 무너 캐릭터와 요금제 추천**
<br/>
- 6가지 카테고리`(SNS, Youtube, Call, Chat, Books, Savings)`의 질문을 통해 사용자 통신 성향 도출
- `Next.js App Router + Prisma` : 성향 분석 결과 저장 및 추천 흐름
- `CryptoJS (AES)` : 공유 링크 내 userId 암호화 및 복호화 처리
- `generateMetadata()` : 공유 페이지 별 OG 메타태그 동적 설정
- `KakaoTalk SDK` : 카카오톡 공유 기능 및 클릭 트래킹 구현
- `Zustand` : 테스트 결과 및 상태 전역 관리
- `OG Preview 최적화` : 공유자 이름 포함한 미리보기 문구 자동 반영
<br/>
<br/>

**5. 🧭 주변 사용자 탐색 & 실시간 상호작용**
<br/>
- `WebSocket (ws)` : 사용자 위치 실시간 공유 및 클릭 이벤트 전송
- `Geolocation API` : GPS 기반 사용자 위치 탐지 및 반경 100m 내 접속자 존재 탐지
- `Vibration API + 하트 애니메이션` : 상대방 클릭 시 피드백 제공
- `Zustand + useRef/useMemo` : 상태 캐시 및 렌더링 최적화
- `Framer Motion` : 아바타 등장 및 클릭 시 동적 애니메이션 처리
- `Sonner` : 커스텀 토스트로 근처 사용자 탐색 반경 100m 내 접속자 존재 시 Home 화면에 toast 알림

<br/>
<br/>

## ⚔️ 기술 스택
| 분야                         | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**               | ![React](https://img.shields.io/badge/React-61DAFB?style=flat\&logo=React\&logoColor=black) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat\&logo=Next.js\logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat\&logo=TypeScript\&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat\&logo=TailwindCSS\&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat\&logo=ReactQuery\&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat) ![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000?style=flat\&logo=shadcn\&logoColor=white) |
| **Backend**                | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=Node.js\&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat\&logo=Express\&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat\&logo=Prisma\&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat\&logo=MySQL\&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat\&logo=Swagger\&logoColor=black) |
| **Auth / Social Login**    | ![OAuth2](https://img.shields.io/badge/OAuth2-0052CC?style=flat) ![NextAuth](https://img.shields.io/badge/NextAuth.js-3ECF8E?style=flat) ![Kakao Login](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat\&logo=KakaoTalk\&logoColor=black) |
| **AI Integration**         | ![ChatGPT](https://img.shields.io/badge/ChatGPT_4.0-412991?style=flat\&logo=OpenAI\&logoColor=white) ![OpenAI API](https://img.shields.io/badge/OpenAI_API-412991?style=flat\&logo=OpenAI\&logoColor=white) |
| **Deployment / Infra**     | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat\&logo=Vercel\&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat\&logo=Render\&logoColor=black) ![Amazon RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=flat\&logo=AmazonAWS\&logoColor=white) |
| **Collaboration / Tools**  | ![Git](https://img.shields.io/badge/Git-F05032?style=flat\&logo=Git\&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat\&logo=GitHub\&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat\&logo=Notion\&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat\&logo=Discord\&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat\&logo=Figma\&logoColor=white) |
| **Code Quality / Testing** | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat\&logo=Prettier\&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=flat) |


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



## 👥 팀원 및 역할 소개


<table align="center">
  <tr>
    <td align="center"><b>이은비</b></td>
    <td align="center"><b>박은서</b></td>
    <td align="center"><b>박희준</b></td>
    <td align="center"><b>안민지</b></td>
    <td align="center"><b>정다희</b></td>
    <td align="center"><b>허준호</b></td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/silverain02"><img src="https://avatars.githubusercontent.com/u/108103346?v=4" width="120" height="120"/></a>
    </td>
    <td align="center">
      <a href="https://github.com/arty0928"><img src="https://avatars.githubusercontent.com/u/88071251?v=4" width="120" height="120"/></a>
    </td>
    <td align="center">
      <a href="https://github.com/heejun8"><img src="https://avatars.githubusercontent.com/u/198835896?v=4" width="120" height="120"/></a>
    </td>
    <td align="center">
      <a href="https://github.com/minji-38"><img src="https://avatars.githubusercontent.com/u/195983909?v=4" width="120" height="120"/></a>
    <td align="center">
      <a href="https://github.com/alotofhee"><img src="https://avatars.githubusercontent.com/u/55499429?v=4" width="120" height="120"/></a>
    <td align="center">
      <a href="https://github.com/gichulLimitLess"><img src="https://avatars.githubusercontent.com/u/127181459?v=4" width="120" height="120"/></a>
    </td>
  </tr>
  <tr>
  <td align="center">팀장<br>음성챗봇</td>
    <td align="center">풀스택<br>주변 친구 찾기</td>
    <td align="center">풀스택<br>요금제 시각화</td>
    <td align="center">풀스택, 디자인<br>밈테스트</td>
    <td align="center">풀스택<br>챗봇</td>
    <td align="center">풀스택, AI<br>챗봇</td>
  </tr>
</table>
