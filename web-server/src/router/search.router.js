import express from "express";

import { searchController } from "../controllers";

const router = express.Router();
router.post("/:searchTerm", searchController.searchNews);

export default router;
