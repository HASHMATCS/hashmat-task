import * as dotenv from 'dotenv';
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { School } from 'src/modules/school/school.entity';
import { AddressEntity } from '../modules/address/address.entity';
import { OrganizationEntity } from '../modules/organization/organization.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      entities: [School, AddressEntity, OrganizationEntity],
    }),
    // TypeOrmModule.forFeature([OrganizationRepository, AddressRepository, SchoolRepository]),
  ],
  
})
export class PostgresDatabaseModule {
  private readonly logger = new Logger(PostgresDatabaseModule.name);

  constructor(private readonly dataSource: DataSource) {
    this.logger.log('PostgresDatabaseModule constructor called');
    this.initializeDatabaseConnection();
  }

  private async initializeDatabaseConnection() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        this.logger.log('✅ PostgreSQL Database connected successfully');
      }
    } catch (error) {
      this.logger.error('❌ Failed to connect to the PostgreSQL Database:', error.message);
    }
  }
}
