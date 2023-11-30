import express from "express";
import { UserController } from "./user.controller";
import { StudentZodValidations } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// call controller function
router.post(
  "/create-student",
  validateRequest(StudentZodValidations.createStudentValidationSchema),
  UserController.createStudent
);

export const UserRoutes = router;
