import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from './organization.entity';
import { Repository } from 'typeorm';
import { OrganizationDto } from './dtos/organization.dto';
import { ApiError } from 'src/exceptions/ApiError';

@Injectable()
export class OrganizationService {
constructor(
    @InjectRepository(OrganizationEntity)
    private OrganizationEntity:Repository<OrganizationEntity>
 ){}

 async createOrganization(body:OrganizationDto):Promise<OrganizationDto> {
    return await this.OrganizationEntity.save(body);
 }


 async getAllOrganization(query: any): Promise<OrganizationDto[]> {
    const { ...filter } = query;


    return await this.OrganizationEntity.find({where: filter});
  }
 async getById(id:number):Promise<OrganizationDto>{
    const address=await this.OrganizationEntity.findOne({where:{id:id} });
    if(!address){
        throw new ApiError(404,'no document Found with id')
    }
    return address
}

async GetByName(name:string):Promise<OrganizationDto>{
    const organization=await this.OrganizationEntity.findOne({where:{name:name}});
    return organization
}

async updateOrganization(id:number,body:OrganizationDto):Promise<OrganizationDto>{
    const address=await this.getById(id);
    Object.assign(address,body);
    await this.OrganizationEntity.save(address)
    return address
}


async deleteById(id: number): Promise<{message:string}> {
    const organization = await this.OrganizationEntity.delete(id);

    if (organization.affected === 0) {
      throw new ApiError(HttpStatus.NOT_FOUND, `organization with ID ${id} not found.`);
    }

    return { message: `The organization with ID ${id} has been successfully deleted.` };
  }
}
