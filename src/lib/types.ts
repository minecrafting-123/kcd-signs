export type UserEntry = {
  UserID: string;
  FirstName: string;
  LastName: string;
  PublishUserProfile: boolean;
  LargeFileName: string;
  Email: string;
  EmailBad: boolean;
  PublishEmail: boolean;

  AddressLine1: string;
  City: string;
  Zip: string;
  HomePhone: string; // trim if used
  MyContactsId: number;

  HasRelationships: boolean; // no idea what this is for
  GradYear: string;
  Grade: string; // empty!
  GradeDisplay: string; // use this instead of Grade
  Department: string;
  SpouseId: number;
  GradeNumeric: number; // always 0!
  GradeNumericDisplay: string; // use this instead of ^
  TotalCount: number; // ??
  Deceased: boolean; // !!?
  IsStudentInd: boolean; // ?

  PreferredAddressId: number;
  PreferredAddressLat: number;
  PreferredAddressLng: number;

  JobTitle: string; // empty
};

export type Student = {
  name: string;
  lat: number;
  long: number;
};
