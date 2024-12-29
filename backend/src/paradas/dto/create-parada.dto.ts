import { IsInt, IsDecimal, IsString, Length } from 'class-validator';

export class CreateParadaDto {
  @IsInt()
  viagem_id: number;

  @IsInt()
  sequencia: number;

  @IsInt()
  parada_id: number;

  @IsDecimal()
  latitude: number;

  @IsDecimal()
  longitude: number;

  @IsString()
  @Length(1, 255)
  nome_parada: string;
}
