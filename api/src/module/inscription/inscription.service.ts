import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inscription, InscriptionDocument } from './schemas/inscription.schema';

@Injectable()
export class InscriptionService {
  constructor(
    @InjectModel(Inscription.name) private inscriptionModel: Model<InscriptionDocument>,
  ) {}

  async create(idUser: string, idFormation: string): Promise<Inscription> {
    try {
      const newInscription = new this.inscriptionModel({
        idUser,
        idFormation,
        date_inscri: new Date(),
      });
      return await newInscription.save();
    } catch (error) {
      throw new Error(`Failed to create inscription: ${error.message}`);
    }
  }

  async findAll(): Promise<Inscription[]> {
    return this.inscriptionModel.find().exec();
  }

  async findFormationsByUserId(userId: string): Promise<Inscription[]> {
    return this.inscriptionModel
      .find({ idUser: userId })
      .populate('idFormation')
      .exec();
  }
}
