import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ViagemService } from './viagem.service';

@Controller('viagens')
export class ViagensController {
  constructor(private readonly viagensService: ViagemService) {}

  @Get('/parada')
  async findByParada(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    if (isNaN(lat) || isNaN(lng)) {
      throw new BadRequestException('Os parâmetros lat e lng devem ser números');
    }
    return this.viagensService.findByParada(lat, lng);
  }
}
