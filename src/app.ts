import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { StudentRoutes } from "./app/modules/students/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFount from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application routes
// Student Routes
app.use("/api/v1/", router);

const testRoute = async (req: Request, res: Response) => {
  res.send("First app running");
};
app.get("/", testRoute);

// global error handler middleware
app.use(globalErrorHandler);

// not found middleware
app.use(notFount);

export default app;
