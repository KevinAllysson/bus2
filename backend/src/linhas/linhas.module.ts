import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Linha } from './linhas.entity';
import { Viagem } from '../viagens/viagens.entity';
import { LinhasController } from './linhas.controller';
import { LinhasService } from './linhas.service';
import { ViagemModule } from '../viagens/viagem.module';


@Module({
  imports: [TypeOrmModule.forFeature([Linha, Viagem]), ViagemModule],
  controllers: [LinhasController],
  providers: [LinhasService],
  exports: [LinhasService],
})
export class LinhasModule {}
