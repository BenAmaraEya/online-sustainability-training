import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inscription, InscriptionSchema } from './schemas/inscription.schema';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Inscription.name, schema: InscriptionSchema }])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
