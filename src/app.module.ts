import { Module } from '@nestjs/common';

import { PostgresDatabaseModule } from './database/database.module';
import { SchoolModule } from './modules/school/school.module';
import { AddressModule } from './modules/address/address.module';
import { OrganizationModule } from './modules/organization/organization.module';



@Module({
  imports: [PostgresDatabaseModule,SchoolModule,AddressModule,OrganizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
