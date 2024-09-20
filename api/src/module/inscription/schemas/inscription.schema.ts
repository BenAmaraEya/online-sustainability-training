import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Formation } from '../../formation/schemas/formation.schema';

export type InscriptionDocument = Inscription & Document;

@Schema()
export class Inscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Formation', required: true })
  idFormation: Types.ObjectId[];

  @Prop()
  date_inscri: Date;
}

export const InscriptionSchema = SchemaFactory.createForClass(Inscription);
