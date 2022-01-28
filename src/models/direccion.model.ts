import {Entity, model, property} from '@loopback/repository';

@model()
export class Direccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  calle: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_calle: string;

  @property({
    type: 'number',
  })
  clienteId?: number;

  constructor(data?: Partial<Direccion>) {
    super(data);
  }
}

export interface DireccionRelations {
  // describe navigational properties here
}

export type DireccionWithRelations = Direccion & DireccionRelations;
