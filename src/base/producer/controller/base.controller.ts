import {
  BaseQueryReadOneEntity,
  BaseReadOneParamEntity,
} from "../../domain/entities/base-param.entity";

export abstract class BaseController<Entity> {
  abstract index(): Entity[];
  abstract show(
    params: BaseReadOneParamEntity,
    query: BaseQueryReadOneEntity
  ): Entity;
  abstract create(entity: Entity): Entity;
  abstract update(id: number, entity: Entity): Entity;
  abstract delete(id: number): void | Error;
}
