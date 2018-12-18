import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Color} from '../models';
import {ColorRepository} from '../repositories';

export class ColorController {
  constructor(
    @repository(ColorRepository)
    public colorRepository : ColorRepository,
  ) {}

  @post('/colors', {
    responses: {
      '200': {
        description: 'Color model instance',
        content: {'application/json': {schema: {'x-ts-type': Color}}},
      },
    },
  })
  async create(@requestBody() color: Color): Promise<Color> {
    return await this.colorRepository.create(color);
  }

  @get('/colors/count', {
    responses: {
      '200': {
        description: 'Color model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Color)) where?: Where,
  ): Promise<Count> {
    return await this.colorRepository.count(where);
  }

  @get('/colors', {
    responses: {
      '200': {
        description: 'Array of Color model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Color}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Color)) filter?: Filter,
  ): Promise<Color[]> {
    return await this.colorRepository.find(filter);
  }

  @patch('/colors', {
    responses: {
      '200': {
        description: 'Color PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() color: Color,
    @param.query.object('where', getWhereSchemaFor(Color)) where?: Where,
  ): Promise<Count> {
    return await this.colorRepository.updateAll(color, where);
  }

  @get('/colors/{id}', {
    responses: {
      '200': {
        description: 'Color model instance',
        content: {'application/json': {schema: {'x-ts-type': Color}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Color> {
    return await this.colorRepository.findById(id);
  }

  @patch('/colors/{id}', {
    responses: {
      '204': {
        description: 'Color PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() color: Color,
  ): Promise<void> {
    await this.colorRepository.updateById(id, color);
  }

  @put('/colors/{id}', {
    responses: {
      '204': {
        description: 'Color PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() color: Color,
  ): Promise<void> {
    await this.colorRepository.replaceById(id, color);
  }

  @del('/colors/{id}', {
    responses: {
      '204': {
        description: 'Color DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.colorRepository.deleteById(id);
  }
}
