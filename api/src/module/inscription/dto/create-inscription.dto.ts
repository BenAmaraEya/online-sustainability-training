import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateInscriptionDto {
  @IsNotEmpty()
  @IsMongoId()
  idUser: string;

  @IsNotEmpty()
  @IsMongoId()
  idFormation: string;

  @IsOptional()
  date_inscri: Date; // Assuming you want to store the current date when created
}
