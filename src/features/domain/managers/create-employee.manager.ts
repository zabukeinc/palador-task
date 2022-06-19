import { EmployeeDataService } from "../../data/employee-data.service";
import { EmployeeEntity } from "../entities/employee.entity";
import { isEmployeeExist } from "./validators/is-employee-exist.validator";
import { isValidPayload } from "./validators/is-valid-payload.validator";

export class CreateEmployeeManager {
  constructor(
    protected service: EmployeeDataService,
    protected entity: EmployeeEntity
  ) {}

  execute(): EmployeeEntity {
    isValidPayload(this.entity);
    isEmployeeExist(this.service, this.entity.employeeId);

    return this.service.create(this.entity);
  }
}
