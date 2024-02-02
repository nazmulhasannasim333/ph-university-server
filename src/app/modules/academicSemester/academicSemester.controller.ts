import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;

  const result =
    await AcademicSemesterServices.createAcademicSemesterDB(
      academicSemesterData
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester created successfully",
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB(
    req.query
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterDB(semesterId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester is retrieved successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterDB(
    semesterId,
    academicSemesterData
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester is updated successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
