import express from "express";
import { UserController } from "./user.controller";
import { StudentZodValidations } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

// call controller function
router.post(
  "/create-student",
  validateRequest(StudentZodValidations.createStudentValidationSchema),
  UserController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
