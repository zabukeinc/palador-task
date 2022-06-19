import { EmployeeEntity } from "../domain/entities/employee.entity";

export class EmployeeDataService {
  protected employees: EmployeeEntity[] = [
    {
      employeeId: 1,
      name: "Guy Gardner",
      managerId: 15,
    },
    {
      employeeId: 2,
      name: "Arthur Curry",
      managerId: 12,
    },
    {
      employeeId: 3,
      name: "John Stewart",
      managerId: 7,
    },
    {
      employeeId: 4,
      name: "Ray Palmer",
      managerId: 6,
    },
    {
      employeeId: 5,
      name: "Jessica Cruz",
      managerId: 15,
    },
    {
      employeeId: 6,
      name: "Shayera Hol",
      managerId: 12,
    },
    {
      employeeId: 7,
      name: "Bruce Wayne",
      managerId: 17,
    },
    {
      employeeId: 8,
      name: "Kyle Rayner",
      managerId: 15,
    },
    {
      employeeId: 9,
      name: "Billy Batson",
      managerId: 6,
    },
    {
      employeeId: 10,
      name: "Kiliwog",
      managerId: 3,
    },
    {
      employeeId: 11,
      name: "Dinah Drake",
      managerId: 7,
    },
    {
      employeeId: 12,
      name: "Diana Prince",
      managerId: 17,
    },
    {
      employeeId: 13,
      name: "Sinestro",
      managerId: 3,
    },
    {
      employeeId: 14,
      name: "J'onn J'onzz",
      managerId: 12,
    },
    {
      employeeId: 15,
      name: "Hal Jordan",
      managerId: 3,
    },
    {
      employeeId: 16,
      name: "Oliver Queen",
      managerId: 7,
    },
    {
      employeeId: 17,
      name: "Clark Kent",
    },
    {
      employeeId: 18,
      name: "Zatanna Zatara",
      managerId: 7,
    },
    {
      employeeId: 19,
      name: "Barry Allen",
      managerId: 17,
    },
  ];

  getAll(): EmployeeEntity[] {
    return this.employees;
  }

  getOne(id: number): EmployeeEntity | undefined {
    const employee = this.employees.find((data) => data.employeeId === id);

    if (!employee) return undefined;

    const manager = this.employees.find(
      (data) => data.employeeId === employee.managerId
    );

    if (!manager) return employee;

    return { ...employee, manager };
  }

  create(entity: EmployeeEntity): EmployeeEntity {
    this.employees.push(entity);
    return entity;
  }

  update(id: number, entity: EmployeeEntity): EmployeeEntity | undefined {
    const currentDataIdx = this.getEmployeeIdxById(id);
    if (currentDataIdx < 0) return undefined;
    if (this.employees[currentDataIdx].employeeId !== entity.employeeId)
      throw new Error("Unable to update employee id");
    Object.assign(this.employees[currentDataIdx], { ...entity });
    return entity;
  }

  delete(id: number): void {
    const currentDataIdx = this.getEmployeeIdxById(id);
    this.employees = this.employees.slice(currentDataIdx, 1);
  }

  protected getEmployeeIdxById(id: number): number {
    return this.employees.findIndex((data) => data.employeeId === id);
  }

  // manager
  getOneManager(id: number): EmployeeEntity | undefined {
    return this.employees.find((data) => data.managerId === id);
  }
}
