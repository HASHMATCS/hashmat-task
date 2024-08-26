import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './organization.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([OrganizationEntity]),
    ],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports:[OrganizationService]
})
export class OrganizationModule {}
