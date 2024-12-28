import { Controller, Get, Post, Param, Body, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
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

    @Get('/viagem/:viagem_id')
    async findByViagem(@Param('viagem_id') viagem_id: number): Promise<Parada[]> {
        return this.paradasService.findByViagem(viagem_id);
    }

    @Post()
    async create(@Body() createParadaDto: CreateParadaDto): Promise<Parada> {
        return this.paradasService.createParada(createParadaDto);
    }
}
