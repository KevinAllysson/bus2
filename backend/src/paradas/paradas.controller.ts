import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { ParadasService } from './paradas.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Parada } from './paradas.entity';
import { CreateParadaDto } from './dto/create-parada.dto';


@Controller('paradas')
export class ParadasController {
  constructor(private readonly paradasService: ParadasService) {}

  @Get()
  findAll(): Promise<Parada[]> {
    return this.paradasService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Parada> {
    return this.paradasService.findById(id);
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
