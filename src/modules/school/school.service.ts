import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityNotFoundError } from 'typeorm';
import { School } from './school.entity';
import { SchoolDto } from './dto/school.dto';
import { OrganizationService } from '../organization/organization.service';
import { AddressService } from '../address/address.service';
import { ApiError } from 'src/exceptions/ApiError';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,

    private readonly dataSource: DataSource,
    private readonly addressService: AddressService,
    private readonly organizationService: OrganizationService,
  ) { }

  async createOrUpdateSchool(data: any): Promise<SchoolDto> {
    const { name, status, startTime, endTime, shift, address, hasProjector, hasLaptop, organization } = data;

    try {
      return await this.dataSource.transaction(async (transactionalEntityManager) => {
        // Fetch or create organization
        let organizationEntity = await this.organizationService.GetByName(organization.name);
        if (!organizationEntity) {
          organizationEntity = await this.organizationService.createOrganization({ name: organization.name });
        }

        // Fetch or create address
        let addressEntity = await this.addressService.GetByName(address.address);
        if (!addressEntity) {
          addressEntity = await this.addressService.CreateAddress(address);
        }

        // Find or create school
        let school = await transactionalEntityManager.findOne(School, {
          where: { name, address: { id: addressEntity.id } },
          relations: ['address', 'organization']
        });

        if (!school) {
          school = this.schoolRepository.create({
            name,
            status,
            startTime,
            endTime,
            shift,
            hasProjector,
            hasLaptop,
            address: addressEntity,
            organization: organizationEntity,
          });
        } else {
          school.status = status;
          school.startTime = startTime;
          school.endTime = endTime;
          school.shift = shift;
          school.hasProjector = hasProjector;
          school.hasLaptop = hasLaptop;
        }

        return await transactionalEntityManager.save(School, school);
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Entity not found.');
      } else {

        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.');
      }
    }
  }

  async getSchoolById(id: number): Promise<SchoolDto> {
    const school = await this.schoolRepository.findOne({
      where: { id },
      relations: ['address', 'organization'],
    });
    if (!school) {
      throw new ApiError(HttpStatus.NOT_FOUND, `School with ID ${id} not found.`);
    }
    return school;
  }

  async getAllSchools(query: any): Promise<SchoolDto[]> {
    const { ...filter } = query;


    return await this.schoolRepository.find({
      where: filter,
      relations: ['address', 'organization'],

    });
  }


  async deleteSchoolById(id: number): Promise<{ message: string }> {
    const result = await this.schoolRepository.delete(id);

    if (result.affected === 0) {
      throw new ApiError(HttpStatus.NOT_FOUND, `School with ID ${id} not found.`);
    }

    return { message: `The school with ID ${id} has been successfully deleted.` };
  }




}