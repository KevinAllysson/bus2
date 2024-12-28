import { Controller, Get, Post, Param, Body, Delete, Query, UploadedFile, BadRequestException } from '@nestjs/common';
import { ParadasService } from './paradas.service';
import { ApiBody } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { Parada } from './paradas.entity';
import { CreateParadaDto } from './dto/create-parada.dto';
import { InjectRepository } from '@nestjs/typeorm';


@Controller('paradas')
export class ParadasController {
    constructor(
        private readonly paradasService: ParadasService,
        @InjectRepository(Parada)
        private readonly paradaRepository: Repository<Parada>, // Injeta o repositório
    ) { }

    @Post()
    async create(@Body() createParadaDto: CreateParadaDto): Promise<Parada> {
        return this.paradasService.createParada(createParadaDto);
    }

    @Get('viagem/:viagemId')
    async findByViagemId(@Param('viagemId') viagemId: number): Promise<Parada[]> {
        if (!viagemId) {
            throw new BadRequestException('viagemId é obrigatório');
        }
        return this.paradasService.findByViagemId(viagemId);
    }
    @Get('')
    async findAll(): Promise<Parada[]> {
        return this.paradaRepository.find();
    }

}
