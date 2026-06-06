import {
  IsNotEmpty,
  IsString
} from 'class-validator';

export class UpdateEstadoDto {

  @IsNotEmpty()
  @IsString()
  estado!: string;

}