import { EmployeeDataService } from "../../../data/employee-data.service";
import { EmployeeEntity } from "../../entities/employee.entity";

export const getDirectlyReportByEmployee = (
  service: EmployeeDataService,
  employee: EmployeeEntity
): EmployeeEntity | undefined => {
  // clone employees because for prevent cached data
  const employees = JSON.parse(JSON.stringify(service.getAll()));

  return getMainDirectlyReports(employees, employee!);
};

/**
 * Recursion function used for checking if there is direct reports for the current employee
 * @param employees Original data of All Employees
 * @param currentEmployee Source Data Employee for search direct reports
 * @param result Data Employee that merge with direct reports
 * @returns
 */
const getMainDirectlyReports = (
  employees: EmployeeEntity[],
  currentEmployee: EmployeeEntity,
  result?: EmployeeEntity
): EmployeeEntity | undefined => {
  if (!currentEmployee?.employeeId) return currentEmployee;

  const relatedEmployees = getRelatedEmployees(employees, currentEmployee);

  const child = getChildDirectlyReports(employees, relatedEmployees);

  if (!child && !result) return undefined;

  if (!child) return result;
  else {
    Object.assign(currentEmployee, { directReports: [child] });
    if (!result) result = currentEmployee;

    return getMainDirectlyReports(employees, child, result);
  }
};

/**
 * Recursion function used for checking if there is direct reports for the related employees
 * @param employees Original data of All Employees
 * @param primaryRelateds Employee subsequently report to the Employee (The related employees from main direct report)
 * @param currentResult Employee with all directly report
 * @returns Employee with all directly report
 */
const getChildDirectlyReports = (
  employees: EmployeeEntity[],
  primaryRelateds: EmployeeEntity[],
  currentResult?: EmployeeEntity
): EmployeeEntity | undefined => {
  if (!primaryRelateds.length) return currentResult!;

  const totalPrimary = primaryRelateds.length;

  let totalEmptySecondary = 0;

  for (let idx = 0; idx < totalPrimary; idx++) {
    const secondaryRelateds = getRelatedEmployees(
      employees,
      primaryRelateds[idx]
    );

    if (!secondaryRelateds.length && totalPrimary === 1) {
      return primaryRelateds[0];
    }

    if (!secondaryRelateds.length) totalEmptySecondary++;
    else {
      currentResult = primaryRelateds[idx];

      const hasDirectlyReportOnChild = getChildDirectlyReports(
        employees,
        secondaryRelateds,
        secondaryRelateds[0]
      );

      if (hasDirectlyReportOnChild) {
        primaryRelateds.splice(idx, 1);
        return getChildDirectlyReports(
          employees,
          primaryRelateds,
          currentResult
        );
      }
    }
  }

  if (!currentResult && totalPrimary === totalEmptySecondary)
    return primaryRelateds[0];

  return currentResult;
};

const getRelatedEmployees = (
  sources: EmployeeEntity[],
  target: EmployeeEntity
): EmployeeEntity[] => {
  return sources.filter((source) => source.managerId === target?.employeeId);
};
