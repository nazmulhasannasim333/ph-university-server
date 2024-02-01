import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getAllCourses
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getSingleCourse
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse
);

router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseController.deleteCourse
);

export const CourseRoutes = router;
