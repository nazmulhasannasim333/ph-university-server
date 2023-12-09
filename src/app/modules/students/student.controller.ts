import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await StudentServices.getAllStudentsFromDB(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Students are retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is retrieved successfully",
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req, res) => {
  const { student: studentData } = req.body;
  const { id } = req.params;
  const result = await StudentServices.updateStudentsFromDB(id, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is updated successfully",
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentsFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
