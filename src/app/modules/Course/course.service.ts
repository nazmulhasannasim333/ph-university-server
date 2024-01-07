import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await courseQuery.countTotal();
  const result = await courseQuery.modelQuery;
  return { meta, result };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaining } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // basic update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaining,
      { session, new: true, runValidators: true }
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    // check there is any pre requisite course
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted field
      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el?.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { session, new: true, runValidators: true }
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }

      // filter out the deleted field
      const newPreRequisite = preRequisiteCourses?.filter(
        (el) => el?.course && !el.isDeleted
      );
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { session, new: true, runValidators: true }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Field to update course");
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
