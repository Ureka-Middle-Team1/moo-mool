import axios from "axios";

/**
 *  기본 클라이언트 인스턴스
 *  인증이 필요하지 않은 요청에 사용됨.
 */
export const client = axios.create({
  baseURL: "/api", // 내부 API 라우트에 접근
  timeout: 30000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: false, // 쿠키 인증 진행 X, 공개 API이므로 불필요
});

// 모든 API 요청 오류를 공통으로 처리하기 위한 전역 interceptor 활용
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.log("에러 발생했어요! Error status: ", status);
      // TODO: global toaster, logging 등 구현
    }
    return Promise.reject(error);
  }
);
