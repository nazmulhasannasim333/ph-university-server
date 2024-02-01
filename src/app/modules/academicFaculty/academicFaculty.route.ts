import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicFacultyControllers.getAllAcademicFaculties
);

router.get(
  "/:facultyId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicFacultyControllers.getSingleAcademicFaculty
);

router.patch(
  "/:facultyId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
