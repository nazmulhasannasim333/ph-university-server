// search
export const studentSearchableFields = [
  "email",
  "name.middleName",
  "presentAddress",
];

// const queryObj = { ...query };
// let searchTerm = "";
// if (query?.searchTerm) {
//   searchTerm = query?.searchTerm as string;
// }

// const searchQuery = Student.find({
//   $or: studentSearchableFields.map((field) => ({
//     [field]: { $regex: searchTerm, $options: "i" },
//   })),
// });

// // filter
// const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
// excludeFields.forEach((el) => delete queryObj[el]);
// console.log({ query, queryObj });

// const filterQuery = searchQuery
//   .find(queryObj)
//   .populate("admissionSemester")
//   .populate({
//     path: "academicDepartment",
//     populate: "academicFaculty",
//   });

// // sort
// let sort = "-createdAt";
// if (query?.sort) {
//   sort = query.sort as string;
// }
// const sortQuery = filterQuery.sort(sort);

// // pagination
// let page = 1;
// let limit = 1;
// let skip = 0;

// if (query?.limit) {
//   limit = Number(query.limit);
// }

// if (query?.page) {
//   page = Number(query.page);
//   skip = (page - 1) * limit;
// }
// const paginateQuery = sortQuery.skip(skip);
// const limitQuery = paginateQuery.limit(limit);

// // fields limiting
// let fields = "-__v";
// if (query?.fields) {
//   fields = (query.fields as string).split(",").join(" ");
// }
// const fieldQuery = await limitQuery.select(fields);

// return fieldQuery;
