import express from "express";
import {
  getStylesController,
  findStyleController,
} from "../controllers/style.controller.js";

const router = express.Router();

router.get("/", getStylesController);

router.get("/:id", findStyleController);

export default router;
