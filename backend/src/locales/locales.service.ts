import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Local } from './entities/local/local';
import { UpdateLocalDto } from './dto/update-local.dto';

@Injectable()
export class LocalesService {

  constructor(
    @InjectRepository(Local)
    private localRepository: Repository<Local>
  ) {}

  obtenerLocales() {
    return this.localRepository.find();
  }

  crearLocal(local: Partial<Local>) {
    const nuevo = this.localRepository.create(local);
    return this.localRepository.save(nuevo);
  }

  // ✏️ EDITAR LOCAL
  async editarLocal(
    id_local: number,
    data: UpdateLocalDto
  ) {
    const local = await this.localRepository.findOne({
      where: { id_local },
    });

    if (!local) {
      throw new BadRequestException('Local no encontrado');
    }

   if (data.nombre !== undefined)
  local.nombre = data.nombre;

if (data.direccion !== undefined)
  local.direccion = data.direccion;

if (data.telefono !== undefined)
  local.telefono = data.telefono;

if (data.capacidad !== undefined)
  local.capacidad = data.capacidad;

if (data.precio !== undefined)
  local.precio = data.precio;
    return this.localRepository.save(local);
  }
  async obtenerLocalPorId(id_local: number) {

  const local = await this.localRepository.findOne({
    where: { id_local }
  });

  if (!local) {
    throw new BadRequestException(
      'Local no encontrado'
    );
  }

  return local;
}
}