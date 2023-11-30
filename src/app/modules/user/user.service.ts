import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

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
    throw new Error("Semester ID not found");
  }
  userData.id = await generateStudentId(admissionSemester);

  // check this email has already account or not
  const existEmail = await Student.findOne({
    email: payload.email,
  });

  if (existEmail) {
    throw new Error("This email has already an account");
  }
  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentDB,
};
