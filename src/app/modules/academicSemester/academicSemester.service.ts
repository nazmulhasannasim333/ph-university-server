import httpStatus from "http-status";
import {
  AcademicSemesterSearchableFields,
  academicSemesterNameCodeMapper,
} from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  // check semester name and code.
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async (
  query: Record<string, unknown>
) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
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
    throw new AppError(httpStatus.NOT_FOUND, "Invalid semester code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterDB,
  updateAcademicSemesterDB,
};
