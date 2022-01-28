import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Producto, ProductoFactura, Cliente} from '../models';
import {ProductoFacturaRepository} from './producto-factura.repository';
import {ProductoRepository} from './producto.repository';
import {ClienteRepository} from './cliente.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.id,
          ProductoFactura,
          typeof Factura.prototype.id
        >;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductoFacturaRepository') protected productoFacturaRepositoryGetter: Getter<ProductoFacturaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Factura, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, productoFacturaRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
