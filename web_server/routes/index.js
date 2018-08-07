import { authController, newsController } from "../controllers";
import { authPolicy } from "../utils";

export default app => {
  app.get("/api/v1/news", authPolicy.register, newsController.getNews);
  app.post("/auth/register", authController.register);
  app.post("/auth/login", authController.login);
};
