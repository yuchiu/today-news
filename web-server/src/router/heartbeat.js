import express from "express";
import {
  newsService,
  userService,
  searchService,
  recommendationService
} from "../config/rpcClient";

const router = express.Router();

const userServiceStatus = async (req, res) => {
  userService.request("heartbeat", null, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }

    if (response) {
      res.status(200).send(response.result);
    }
  });
};
const searchServiceStatus = async (req, res) => {
  searchService.request("heartbeat", null, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
    if (response) {
      res.status(200).send(response.result);
    }
  });
};

const newsServiceStatus = async (req, res) => {
  newsService.request("heartbeat", null, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
    if (response) {
      res.status(200).send(response.result);
    }
  });
};

const recommendationServiceStatus = async (req, res) => {
  recommendationService.request("heartbeat", null, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
    if (response) {
      res.status(200).send(response.result);
    }
  });
};

router.get("/user-service", userServiceStatus);
router.get("/search-service", searchServiceStatus);
router.get("/news-service", newsServiceStatus);
router.get("/recommendation-service", recommendationServiceStatus);

export default router;
