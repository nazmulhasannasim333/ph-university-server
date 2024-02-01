import { TBloodGroup, TGender } from "./student.interface";

// search
export const Gender: TGender[] = ["male", "female", "other"];

export const BloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const studentSearchableFields = [
  "email",
  "name.firstName",
  "name.middleName",
  "name.lastName",
  "presentAddress",
];
