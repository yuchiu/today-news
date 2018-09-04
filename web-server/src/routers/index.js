import express from "express";

import { userController, newsController } from "../controllers";
import { authPolicy } from "../policies";

export default app => {
  /* apiRoutes */
  const apiRoutes = express.Router();
  const userRoutes = express.Router();
  const newsRoutes = express.Router();

  /* append apiRoutes to app */

  app.use("/api/v1", apiRoutes);

  /* append user routes to api v1 routes */
  apiRoutes.use("/users", userRoutes);

  userRoutes.get("/:username", userController.getUser);
  userRoutes.get(
    "/auth",
    authPolicy.bearerTokenAuth,
    userController.bearerTokenAuthUser
  );
  userRoutes.post("/", authPolicy.registerRule, userController.createUser);
  userRoutes.post("/:username", userController.loginUser);
  userRoutes.put("/:username", userController.updateUser);
  userRoutes.delete("/:username", userController.deleteUser);

  /* append news routes to api v1 routes */
  apiRoutes.use("/news", newsRoutes);
  newsRoutes.get("/", newsController.getNews);
};
