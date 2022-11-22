import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './entities';
import { InterventionController } from './intervention.controller';
import { InterventionService } from './intervention.service';

const entityIntervention = TypeOrmModule.forFeature([Intervention]);

@Module({
  imports:[entityIntervention],
  controllers: [InterventionController],
  providers: [InterventionService],
  exports:[InterventionService]
})
export class InterventionModule {}
