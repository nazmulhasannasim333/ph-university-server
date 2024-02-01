import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemesterRegistrationController.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.updateSemesterRegistration
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationController.deleteSemesterRegistration
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemesterRegistrationController.getAllSemesterRegistrations
);

export const semesterRegistrationRoutes = router;
