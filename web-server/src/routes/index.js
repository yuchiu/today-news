import { authController, newsController } from "../controllers";
import { formPolicy, authPolicy } from "../policies";

export default app => {
  app.get("/auth/auto-auth", authPolicy, authController.autoAuth);
  app.post("/auth/register", formPolicy.register, authController.register);
  app.post("/auth/login", authController.login);

  app.get("/api/v1/news", newsController.getNews);
};
