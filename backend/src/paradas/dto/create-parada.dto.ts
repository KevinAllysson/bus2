import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateParadaDto {
  @ApiProperty({
    description: 'Nome da parada',
    example: 'Parada 1',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Latitude da parada',
    example: -26.91234,
  })
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude da parada',
    example: -49.08234,
  })
  @IsNumber()
  lng: number;
}
