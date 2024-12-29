import { IsString, IsInt, Length } from 'class-validator';

export class CreateViagemDto {
  @IsInt()
  linha_id: number;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsString()
  caminho: string;
}
