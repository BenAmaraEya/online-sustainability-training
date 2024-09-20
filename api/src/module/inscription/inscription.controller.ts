import { Controller, Post, Get, Body, BadRequestException, Param } from '@nestjs/common';
import { InscriptionService } from './inscription.service';

import { CreateInscriptionDto } from './dto/create-inscription.dto';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}



@Post()
async createInscription(@Body() createInscriptionDto: CreateInscriptionDto) {
  return await this.inscriptionService.create(createInscriptionDto.idUser, createInscriptionDto.idFormation);
}


  @Get()
  async findAll() {
    return this.inscriptionService.findAll();
  }

  @Get('user/:userId/formations')
async getFormationsByUserId(@Param('userId') userId: string) {
  return await this.inscriptionService.findFormationsByUserId(userId);
}

}
