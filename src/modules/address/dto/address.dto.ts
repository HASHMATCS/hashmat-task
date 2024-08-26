import { IsString, IsNumber, IsOptional, IsLatitude, IsLongitude } from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  town: string;

  @IsString()
  tehsil: string;

  @IsString()
  district: string;

  @IsString()
  state: string;

  @IsString()
  address: string;

  @IsNumber()
  @IsLatitude()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  longitude: number;
}
