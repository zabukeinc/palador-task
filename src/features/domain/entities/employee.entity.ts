export enum EmployeeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type DirectReportEntity = EmployeeEntity;

export interface EmployeeEntity {
  employeeId: number;
  name: string;
  status?: EmployeeStatus;
  managerId?: number;
  manager?: this;
  directReports?: DirectReportEntity[];
}
