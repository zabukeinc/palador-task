import { EmployeeEntity } from "../../entities/employee.entity";

const throwValidation = (): Error => {
  throw new Error("Invalid object payload.");
};

export const isValidPayload = (entity: EmployeeEntity): void | Error => {
  const requiredKeys = ["name", "employeeId", "managerId"];

  const currentKeys = Object.keys(entity);

  if (!currentKeys.length) throwValidation();

  const totalPassedKeys = currentKeys.reduce((total: number, key: string) => {
    return requiredKeys.includes(key) ? total + 1 : total;
  }, 0);

  if (totalPassedKeys !== requiredKeys.length) throwValidation();
};
