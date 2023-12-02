import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// automated generated id
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(6, 8);
  const lastStudentYear = lastStudentId?.substring(2, 6);
  const currentSemesterCode = payload.code;
  const currentStudentYear = payload.year;

  // console.log(
  //   { lastStudentId },
  //   { lastStudentSemesterCode },
  //   { currentSemesterCode },
  //   { currentYear },
  //   { lastStudentYear }
  // );

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    currentId = lastStudentId.substring(8);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `PH${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
