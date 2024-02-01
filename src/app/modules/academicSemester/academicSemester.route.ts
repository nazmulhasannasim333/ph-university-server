import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicSemesterController.getAllAcademicSemester
);
router.get(
  "/:semesterId",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicSemesterController.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
