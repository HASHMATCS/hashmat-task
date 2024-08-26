import { IsOptional, IsString, IsBoolean, ValidateNested, IsNumber, } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from 'src/modules/address/dto/address.dto';
import { OrganizationDto } from 'src/modules/organization/dtos/organization.dto';

export class SchoolDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  shift: string;

  @IsBoolean()
  hasProjector: boolean;

  @IsBoolean()
  hasLaptop: boolean;

  @IsOptional()
  @Type(() => Number) 
  addressId?: number;

  @IsOptional()
  @Type(() => Number) 
  organizationId?: number;
}

