import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { CreateNiveauDto } from 'src/module/niveau/dto/create-niveau.dto';
import { Niveau } from 'src/module/niveau/schemas/niveau.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/utils/multer.image.config';
@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
@UseInterceptors(FileInterceptor('image', MulterConfigService.multerOptions()))
async createFormation(
  @UploadedFile() file: Express.Multer.File,
  @Body() createFormationDto: CreateFormationDto,
) {
  try {
    console.log("Start of createFormation");

    // Parse niveau back to an array
    if (typeof createFormationDto.niveau === 'string') {
      createFormationDto.niveau = JSON.parse(createFormationDto.niveau);
    }

    const imagePath = file ? `uploads/formation-images/${file.filename}` : null;

    if (!imagePath) {
      throw new Error('Image upload failed');
    }

    // Proceed with creating the formation in the database
    const createdFormation = await this.formationService.create({
      ...createFormationDto,
      image: imagePath,
    });

    return createdFormation;
  } catch (error) {
    throw error;
  }
}

  
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ) {
    return this.formationService.update(id, updateFormationDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.formationService.destroy(id);
  }
  @Get()
  async getAll() {
    return this.formationService.getAll();
  }
  @Get(':id')
  async GetById(@Param('id') id: string) {
    return this.formationService.getById(id);
  }
  @Patch(':id/niveaux')
  async addLevel(
    @Param('id') id: string,
    @Body() createNiveauDto: CreateNiveauDto,
  ) {
    const niveau = new Niveau(createNiveauDto);
    return this.formationService.addLevel(id, niveau);
  }
}
