import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disease } from './entities';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { DataHealthModule } from '../data-health/datahealth.module';

const entityDisease = TypeOrmModule.forFeature([Disease]);

@Module({
  imports:[entityDisease, DataHealthModule],
  controllers: [DiseaseController],
  providers: [DiseaseService],
  exports:[DiseaseService]
})
export class DiseaseModule {}
