import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculties);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch(
  "/:facultyId",
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
