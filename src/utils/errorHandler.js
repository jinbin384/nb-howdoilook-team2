// utils/errorHandler.js
import { HttpError } from "./CustomError.js";

// Express 에러 처리 미들웨어
// 에러 핸들러는 반드시 (err, req, res, next) 4개의 인자를 받습니다.
export const errorHandler = (err, req, res, next) => {
   // 1. HttpError 클래스 계열인지 확인
   if (err instanceof HttpError) {
      // 커스텀 에러 (BadRequestError, NotFoundError 등)인 경우
      const { statusCode, message } = err;

      // 에러를 콘솔에 로그 (개발 및 디버깅 용도)
      console.error(`[${statusCode} - ${err.name}] ${message}`);

      // 클라이언트에게 에러 응답 전송
      return res.status(statusCode).json({
         success: false,
         message: message,
      });
   }

   // 2. 그 외 예상치 못한 일반 에러 처리
   // HttpError 인스턴스가 아닌 경우 (e.g., ReferenceError, DB 쿼리 에러 등)
   console.error("[500 - Internal Server Error] Unexpected Error:", err.message);
   console.error(err.stack); // 스택 트레이스는 서버 로그에만 남깁니다.

   // 클라이언트에게는 일반적인 500 에러 메시지 전송
   return res.status(500).json({
      success: false,
      message: "예상치 못한 서버 오류가 발생했습니다.",
   });
};
