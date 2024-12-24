import { IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

// DTO para cada coordenada (latitude e longitude)
class CoordenadaDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
}

export class CreateViagemDto {
  @IsNotEmpty()
  @IsNumber()
  linha_id: number; // ID da linha associada

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoordenadaDto)
  caminho: CoordenadaDto[]; // Array de coordenadas
}
