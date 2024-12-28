import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viagem } from './viagens.entity';
import { CreateViagemDto } from './dto/create-viagem.dto';

@Injectable()
export class ViagemService {
  constructor(
    @InjectRepository(Viagem)
    private readonly viagemRepository: Repository<Viagem>,
  ) {}


  async findByLinhaId(linhaId: number): Promise<Viagem[]> {
    return this.viagemRepository.find({
      where: { linha_id: linhaId }, // Certifique-se de que o campo 'linha_id' existe
    });
  }
  
  // Criar uma nova viagem
  async create(createViagemDto: CreateViagemDto): Promise<Viagem> {
    const novaViagem = this.viagemRepository.create(createViagemDto);
    return this.viagemRepository.save(novaViagem);
  }

  // Listar todas as viagens
  async findAll(): Promise<Viagem[]> {
    return this.viagemRepository.find();
  }

  // Buscar uma viagem pelo ID
  async findOne(id: number): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOneBy({ id });
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }
    return viagem;
  }

  // Atualizar uma viagem existente
  async update(id: number, updateViagemDto: CreateViagemDto): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOneBy({ id });
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }
    Object.assign(viagem, updateViagemDto); // Atualiza os campos fornecidos
    return this.viagemRepository.save(viagem);
  }

  // Remover uma viagem
  async remove(id: number): Promise<void> {
    const viagem = await this.viagemRepository.findOneBy({ id });
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }
    await this.viagemRepository.delete(id);
  }
}
