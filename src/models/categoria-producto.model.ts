import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaProducto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  productoId?: number;

  @property({
    type: 'number',
  })
  categoriaId?: number;

  constructor(data?: Partial<CategoriaProducto>) {
    super(data);
  }
}

export interface CategoriaProductoRelations {
  // describe navigational properties here
}

export type CategoriaProductoWithRelations = CategoriaProducto & CategoriaProductoRelations;
