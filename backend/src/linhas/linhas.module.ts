import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinhasController } from './linhas.controller';
import { LinhasService } from './linhas.service';
import { Linha } from './linhas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Linha])],
  controllers: [LinhasController],
  providers: [LinhasService],
})
export class LinhasModule {}
