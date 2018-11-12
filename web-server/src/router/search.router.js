import express from "express";

import { searchController } from "../controllers";

const router = express.Router();
router.get("/:searchTerm", searchController.searchNews);

export default router;
