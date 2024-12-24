import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LinhasService } from './linhas.service';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { Linha } from './linhas.entity';
import { CreateViagemDto } from './dto/create-viagem.dto';

@Controller('linhas')
export class LinhasController {
  constructor(private readonly linhasService: LinhasService) { }

  @Post('viagem')
  async createViagem(@Body() createViagemDto: CreateViagemDto) {
    return this.linhasService.createViagem(createViagemDto);
  }

  @Get()
  findAll(): Promise<Linha[]> {
    return this.linhasService.findAll();
  }
  
  @Get('viagens')
  async findAllWithDecodedCoordinates() {
    return this.linhasService.findAllWithDecodedCoordinates();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Linha> {
    return this.linhasService.findOne(id);
  }

  @Post()
  async create(@Body() createLinhaDto: CreateLinhaDto): Promise<Linha> {
    return this.linhasService.create(createLinhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.linhasService.remove(id);
  }
}
