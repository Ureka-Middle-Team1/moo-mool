import axios from "axios";

// Axios 인스턴스 생성, 필요 시 환경 변수 기반 기본 설정을 추가할 수도 있음
const axiosInstance = axios.create({
  baseURL: "/api", // 내부 API 라우트에 접근
  timeout: 30000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: false, // 쿠키 인증 진행 X, 공개 API이므로 불필요
});

// 모든 API 요청 오류를 공통으로 처리하기 위한 전역 interceptor 활용
axiosInstance.interceptors.response.use(
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

export default axiosInstance;
