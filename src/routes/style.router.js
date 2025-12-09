import express from "express";
import {
  getStylesController,
  findStyleController,
} from "../controllers/style.controller.js";
// src/routes/style.router.js
import express from "express";
import StyleController from "../controllers/style.controller.js";
import { validateRegisterStyle } from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/", getStylesController);

router.get("/:id", findStyleController);

// POST /styles 엔드포인트: 미들웨어를 먼저 실행 후 컨트롤러 호출
router.post(
  "/",
  validateRegisterStyle, // 💡 유효성 검사 미들웨어 적용
  StyleController.createStyle
);

export default router;
