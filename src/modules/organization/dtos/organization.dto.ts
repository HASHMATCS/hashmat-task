import { IsString, IsNumber, IsOptional} from 'class-validator';

export class OrganizationDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

}
