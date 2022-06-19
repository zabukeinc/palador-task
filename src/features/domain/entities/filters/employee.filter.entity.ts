import {
  BaseParamEntity,
  BaseQueryReadOneEntity,
  BaseReadOneParamEntity,
} from "../../../../base/domain/entities/base-param.entity";

export type EmployeeFilterEntity = BaseParamEntity;

export interface EmployeeQueryReadOneEntity extends BaseQueryReadOneEntity {
  includeReportingTree: boolean;
}

export type EmployeeParamReadOneEntity = BaseReadOneParamEntity;
