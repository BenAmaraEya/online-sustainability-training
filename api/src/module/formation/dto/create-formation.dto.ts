import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { File } from 'src/module/cours/entities/cours.entity';
import { CreateNiveauDto } from 'src/module/niveau/dto/create-niveau.dto';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
export class CreateFormationDto {
 
  


  @IsString()
  titre: string;

  @IsString()
  objectif: string;

  @IsString()
  description: string;

  @IsString()
  competenceAquises: string;

  @IsString()
  resultatSouhaites: string;

  @Transform(({ value }) => parseInt(value, 10))
  nbrNiveau: number;

  image :string;
  
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateNiveauDto)
  niveau: CreateNiveauDto[];
}
