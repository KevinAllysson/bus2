import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from './linhas.entity';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';

@Injectable()
export class LinhasService {
    constructor(
        @InjectRepository(Linha)
        private readonly linhasRepository: Repository<Linha>,
    ) { }

    // Criar uma nova linha
    async create(createLinhaDtos: CreateLinhaDto[]): Promise<Linha[]> {
        await this.linhasRepository.clear();
        const novasLinhas = this.linhasRepository.create(createLinhaDtos);
        return this.linhasRepository.save(novasLinhas);
    }

    // Atualizar uma linha existente
    async update(id: number, updateLinhaDto: UpdateLinhaDto): Promise<Linha> {
        const linha = await this.linhasRepository.findOneBy({ id });
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }

        Object.assign(linha, updateLinhaDto);
        return this.linhasRepository.save(linha);
    }

    // Buscar todas as linhas
    async findAll(): Promise<Linha[]> {
        return this.linhasRepository.find();
    }

    // Buscar uma linha pelo ID
    async findOne(id: number): Promise<Linha> {
        const linha = await this.linhasRepository.findOneBy({ id });
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }
        return linha;
    }

    // Remover uma linha
    async remove(id: number): Promise<void> {
        const linha = await this.linhasRepository.findOneBy({ id });
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }
        await this.linhasRepository.delete(id);
    }
}
