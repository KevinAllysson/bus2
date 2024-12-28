import { Controller, Get, Post, Param, Body, Delete, Query } from '@nestjs/common';
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

    @Get()
    async findAll(): Promise<Parada[]> {
        return this.paradasService.findAll();
    }

    @Get('viagem')
    async findByViagemId(@Query('viagemId') viagemId?: number): Promise<Parada[]> {
        if (viagemId) {
            return this.paradaRepository.find({ where: { viagemId } });
        }
        return this.paradaRepository.find();
    }

    @Post()
    @ApiBody({ type: CreateParadaDto }) // Adiciona o body esperado no Swagger
    create(@Body() createParadaDto: CreateParadaDto) {
        return this.paradasService.create(createParadaDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.paradasService.delete(id);
    }
}
