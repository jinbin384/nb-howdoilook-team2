// src.utils/CustomError.js
export class CustomError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    // 스택 트레이스를 캡처 (Node.js 환경에서 유용)
    Error.captureStackTrace(this, this.constructor);
  }
}

// 클라이언트 에러
export class ValidationError extends CustomError {
  constructor(message, errors = {}) {
    super(message, 400);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

// 인증 실패 에러
export class UnauthorizedError extends CustomError {
  constructor(message = "인증에 실패했습니다.") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}
