import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './viagens.entity';
import { ViagemService } from './viagem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem])],
  providers: [ViagemService],
  exports: [ViagemService], // Exporte o serviço para que outros módulos possam usá-lo
})
export class ViagemModule {}
