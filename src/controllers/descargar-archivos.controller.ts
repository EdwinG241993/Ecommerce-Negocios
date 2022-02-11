import {inject} from '@loopback/core';
import {
  get,
  HttpErrors,
  oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Keys as llaves} from '../config/keys';

const readdir = promisify(fs.readdir);

export class DescargarArchivosController {
  constructor() { }

  @get('/archivos/{type}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'Lista de archivos',
      },
    },
  })
  async ListarArchvios(
    @param.path.number('type') type: number,) {
    const rutaCarpeta = this.obtenerRutCarPorTipo(type);
    const archivos = await readdir(rutaCarpeta);
    return archivos;

  }

  @get('/archivo/{type}/{filename}')
  @oas.response.file()
  async DescargarArchivo(
    @param.path.number('type') type: number,
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const rutaCarpeta = this.obtenerRutCarPorTipo(type);
    const archivo = this.ValidarNomArch(rutaCarpeta, filename);
    response.download(archivo, rutaCarpeta);
    return response;
  }

  private obtenerRutCarPorTipo(type: number) {
    let ruta = '';
    switch (type) {
      case 1:
        ruta = path.join(__dirname, llaves.carpetaImgProd);
        break;
      case 2:
        ruta = path.join(__dirname, llaves.carpetaDocUsu);
    }
    return ruta;
  }

  private ValidarNomArch(archivo: string, folder: string) {
    const resolved = path.resolve(archivo, folder);
    if (resolved.startsWith(archivo)) return resolved;
    throw new HttpErrors[400](`La ruta del archivo no es valida: ${folder}`);

  }
}
