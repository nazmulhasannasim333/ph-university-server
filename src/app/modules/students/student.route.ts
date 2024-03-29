import express from "express";
import { StudentController } from "./student.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../Faculty/faculty.validation";
import { StudentZodValidations } from "./student.validation";

const router = express.Router();

// call controller function
// router.post("/create-student", StudentController.createStudent);
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getAllStudents
);
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getSingleStudent
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(StudentZodValidations.updateStudentValidationSchema),
  StudentController.updateSingleStudent
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.deleteSingleStudent
);

export const StudentRoutes = router;
