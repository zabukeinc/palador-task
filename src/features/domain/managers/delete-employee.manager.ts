import { EmployeeDataService } from "../../data/employee-data.service";
import { isEmployeeExist } from "./validators/is-employee-exist.validator";

export class DeleteEmployeeManager {
  constructor(protected service: EmployeeDataService, protected id: number) {}

  execute(): void | Error {
    isEmployeeExist(this.service, this.id);

    this.service.delete(this.id);
  }
}
