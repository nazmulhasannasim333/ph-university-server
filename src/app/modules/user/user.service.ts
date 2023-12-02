import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";

const createStudentDB = async (password: string, payload: TStudent) => {
  // for static method
  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists!");
  // }

  // create a user object
  const userData: Partial<TUser> = {};

  //  if password is not given, user default password
  userData.password = password || (config.default_password as string);

  //  set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester ID not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated Id
    userData.id = await generateStudentId(admissionSemester);

    // check this email has already account or not
    const existEmail = await Student.findOne({
      email: payload.email,
    });

    if (existEmail) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This email has already an account"
      );
    }

    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //  create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // commit transaction
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create student");
  }
};

export const UserServices = {
  createStudentDB,
};
