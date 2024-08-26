import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationDto } from './dtos/organization.dto';

@Controller('organization')
export class OrganizationController {

    constructor(
        private readonly organizationServices:OrganizationService
    ){}


    @Post()
    async createOrgnization(@Body() body:OrganizationDto):Promise<OrganizationDto>{
      return await this.organizationServices.createOrganization(body)
    }

    @Get()
    async getAllOrganization(@Query() query:OrganizationDto):Promise<OrganizationDto[]>{
        return await this.organizationServices.getAllOrganization(query);
        
    }


@Get('id')
    async getByid(@Param('id') id:number):Promise<OrganizationDto>{
        return await this.organizationServices.getById(id);
        }


@Patch('id')
async updateById(@Param('id') id: number,  @Body()body :OrganizationDto):Promise<OrganizationDto>{
    return await this.organizationServices.updateOrganization(id,body);
}


@Delete('id')
async deleteById(@Param('id') id:number):Promise<{message:string}>{
    return await this.organizationServices.deleteById(id);
}
}
