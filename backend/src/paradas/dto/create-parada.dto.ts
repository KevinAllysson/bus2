import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateParadaDto {
  @IsNotEmpty()
  @IsNumber()
  viagem_id: number;

  @IsNotEmpty()
  @IsNumber()
  sequencia: number;

  @IsNotEmpty()
  @IsNumber()
  parada_id: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  nome_parada: string;
}
