import { EmployeeDataService } from "../../../data/employee-data.service";

export const isEmployeeExist = (
  service: EmployeeDataService,
  id: number
): void | Error => {
  const data = service.getOne(id);
  if (!data) throw new Error("Employee not found");
};
