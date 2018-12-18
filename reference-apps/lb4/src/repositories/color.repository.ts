import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Color} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ColorRepository extends DefaultCrudRepository<
  Color,
  typeof Color.prototype.id
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
  ) {
    super(Color, dataSource);
  }
}
