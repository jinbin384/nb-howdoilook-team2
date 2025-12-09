// src/utils/errorHandler.js
import { CustomError } from "../utils/CustomError.js";

export const errorHandler = (err, req, res, next) => {
  // 커스텀 에러 검증
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      name: err.name,
      errors: err.errors,
    });
  }

  // 예상치 못한 서버 에러인 경우
  console.error("Critical Server Error:", err.stack);

  return res.status(500).json({
    message: "내부 서버 오류가 발생했습니다.",
    name: "InternalServerError",
  });
};
