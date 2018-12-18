import {Entity, model, property} from '@loopback/repository';

@model()
export class Color extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  value?: string;

  constructor(data?: Partial<Color>) {
    super(data);
  }
}
