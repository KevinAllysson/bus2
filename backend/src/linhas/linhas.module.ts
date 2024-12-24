import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Linha } from './linhas.entity';
import { Viagem } from '../viagens/viagens.entity';
import { LinhasController } from './linhas.controller';
import { LinhasService } from './linhas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Linha, Viagem])],
  controllers: [LinhasController],
  providers: [LinhasService],
  exports: [LinhasService],
})
export class LinhasModule {}
