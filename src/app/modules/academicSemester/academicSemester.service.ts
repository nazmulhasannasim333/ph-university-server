import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  // check semester name and code.
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateAcademicSemesterDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterDB,
  getAllAcademicSemesterDB,
  getSingleAcademicSemesterDB,
  updateAcademicSemesterDB,
};
