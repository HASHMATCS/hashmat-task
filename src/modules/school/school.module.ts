import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './school.entity';
import { AddressModule } from '../address/address.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([School]),
    OrganizationModule,
    AddressModule,
  ],
  providers: [SchoolService],
  controllers: [SchoolController]
})
export class SchoolModule {}
