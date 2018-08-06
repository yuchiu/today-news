import { authController, newsController } from "../controllers";

export default app => {
  app.get("/api/v1/news", newsController.getNews);
  app.post("/auth/register", authController.register);
  app.post("/auth/login", authController.login);
};
