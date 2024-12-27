import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from './paradas.entity';
import { CreateParadaDto } from './dto/create-parada.dto';

@Injectable()
export class ParadasService {
  constructor(
    @InjectRepository(Parada)
    private readonly paradasRepository: Repository<Parada>,
  ) {}

  findAll(): Promise<Parada[]> {
    return this.paradasRepository.find();
  }

  findById(id: number): Promise<Parada> {
    return this.paradasRepository.findOne({ where: { id } });
  }

  create(createParadaDto: CreateParadaDto): Promise<Parada> {
    const parada = this.paradasRepository.create(createParadaDto);
    return this.paradasRepository.save(parada);
  }

  delete(id: number): Promise<void> {
    return this.paradasRepository.delete(id).then(() => undefined);
  }
}
