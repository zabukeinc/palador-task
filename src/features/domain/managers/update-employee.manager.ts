import { EmployeeDataService } from "../../data/employee-data.service";
import { EmployeeEntity } from "../entities/employee.entity";
import { isEmployeeExist } from "./validators/is-employee-exist.validator";

export class UpdateEmployeeManager {
  constructor(
    protected service: EmployeeDataService,
    protected id: number,
    protected entity: EmployeeEntity
  ) {}

  execute(): EmployeeEntity {
    isEmployeeExist(this.service, this.id);

    const data = this.service.update(this.id, this.entity);
    return data!;
  }
}
