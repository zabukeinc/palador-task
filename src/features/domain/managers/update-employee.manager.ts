import { EmployeeDataService } from "../../data/employee-data.service";
import { EmployeeEntity } from "../entities/employee.entity";
import { isValidPayload } from "./validators/is-valid-payload.validator";

export class UpdateEmployeeManager {
  constructor(
    protected service: EmployeeDataService,
    protected id: number,
    protected entity: EmployeeEntity
  ) {}

  execute(): EmployeeEntity {
    isValidPayload(this.entity);

    if (!this.isEmployeeExist()) throw new Error("Employee does not exist");

    if (!this.isManagerExist()) throw new Error("Manager does not exist");

    const data = this.service.update(this.id, this.entity);
    return data!;
  }

  protected isEmployeeExist(): boolean {
    return !!this.service.getOne(this.entity.employeeId);
  }

  protected isManagerExist(): boolean {
    return !!this.service.getOneManager(this.entity.managerId!);
  }
}
