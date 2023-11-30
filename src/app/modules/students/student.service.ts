import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const updateStudentsFromDB = async (id: string, student: Partial<TStudent>) => {
  console.log(student.name);
  const result = await Student.updateOne(
    { id },
    {
      $set: {
        name: {
          firstName: student.name?.firstName,
          middleName: student.name?.middleName,
          lastName: student.name?.lastName,
        },
      },
    }
  );
  return result;
};

const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentsFromDB,
};
