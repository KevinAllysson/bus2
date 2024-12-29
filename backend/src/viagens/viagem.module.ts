import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViagensController } from './viagens.controller';
import { ViagensService } from './viagem.service';
import { Viagem } from './viagens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem])],
  controllers: [ViagensController],
  providers: [ViagensService],
  exports: [ViagensService],
})
export class ViagemModule {}
