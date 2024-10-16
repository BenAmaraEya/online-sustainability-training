import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
export type UserDocument = User & Document;

export enum Role {
  Admin = 'admin',
  Client = 'client'
}

@Schema({
  timestamps: true,
})
export class User extends Document {

  _id : ObjectId;

  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  numtel: string;

  @Prop()
  cin: string;

  @Prop()
  datelastcnx: Date;

  @Prop()
  secteur: string;

  @Prop()
  nomEntreprise: string;

  @Prop()
  poste: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

// @Schema()
// export class Client extends User {
//   @Prop()
//   secteur: string;

//   @Prop()
//   nomEntreprise: string;

//   @Prop()
//   poste: string;
// }

// export const ClientSchema = SchemaFactory.createForClass(Client);

// @Schema()
// export class Employeur extends User {
//   @Prop()
//   poste: string;
// }

// export const EmployeurSchema = SchemaFactory.createForClass(Employeur);

// @Schema()
// export class Admin extends User {}

// export const AdminSchema = SchemaFactory.createForClass(Admin);