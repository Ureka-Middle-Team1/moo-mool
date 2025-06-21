import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:3000/api"
    : "/api";

/**
 * 인증이 필요하지 않은 공개적인 요청에 사용되는 axios 인스턴스.
 */
export const client = axios.create({
  baseURL,
  timeout: 30000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
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
