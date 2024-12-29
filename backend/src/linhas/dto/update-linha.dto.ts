import { PartialType } from '@nestjs/mapped-types';
import { CreateLinhaDto } from './create-linha.dto';

export class UpdateLinhaDto extends PartialType(CreateLinhaDto) {}
