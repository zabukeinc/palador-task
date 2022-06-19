import { Body, Delete, Get, Post, Put, Route } from "tsoa";
import { EmployeeDataService } from "../../data/employee-data.service";
import { BaseController } from "../../../base/producer/controller/base.controller";
import { EmployeeEntity } from "../../domain/entities/employee.entity";
import {
  EmployeeParamReadOneEntity,
  EmployeeQueryReadOneEntity,
} from "../../domain/entities/filters/employee.filter.entity";
import { CreateEmployeeManager } from "../../domain/managers/create-employee.manager";
import { DeleteEmployeeManager } from "../../domain/managers/delete-employee.manager";
import { UpdateEmployeeManager } from "../../domain/managers/update-employee.manager";
import { isEmployeeExist } from "../../domain/managers/validators/is-employee-exist.validator";
import { getDirectlyReportByEmployee } from "../../domain/managers/core/get-directly-report.core";

@Route("employees")
export default class EmployeeController extends BaseController<EmployeeEntity> {
  protected service = new EmployeeDataService();

  @Get("/")
  index(): EmployeeEntity[] {
    return this.service.getAll();
  }

  @Get("/:id")
  show(
    params: EmployeeParamReadOneEntity,
    query: EmployeeQueryReadOneEntity
  ): EmployeeEntity {
    const id = parseInt(params.id.toString());

    isEmployeeExist(this.service, id);

    const data = this.service.getOne(id);

    if (query.includeReportingTree?.toString() === "true") {
      const reportingTree = getDirectlyReportByEmployee(this.service, data!);
      if (!reportingTree) throw new Error("No data");
      return reportingTree;
    }

    return data!;
  }

  @Post("/")
  create(@Body() entity: EmployeeEntity): EmployeeEntity {
    return new CreateEmployeeManager(this.service, entity).execute();
  }

  @Put("/:id")
  update(id: number, entity: EmployeeEntity): EmployeeEntity {
    return new UpdateEmployeeManager(this.service, id, entity).execute();
  }

  @Delete("/:id")
  delete(id: number): void | Error {
    return new DeleteEmployeeManager(this.service, id).execute();
  }
}
