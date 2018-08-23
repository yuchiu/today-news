import { authController, newsController } from "../controllers";
import { authPolicy } from "../policies";

export default app => {
  app.get("/api/v1/news", newsController.getNews);
  app.post("/auth/register", authPolicy.register, authController.register);
  app.post("/auth/login", authController.login);
};
