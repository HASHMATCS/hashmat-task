import { Controller, Get, Post, Param, Body, Delete, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolDto } from './dto/school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async createOrUpdateSchool(@Body() data: any): Promise< SchoolDto > {
  return await this.schoolService.createOrUpdateSchool(data);

     }

     @Get(':id')
     async getSchoolById(@Param('id') id: number): Promise< SchoolDto> {
         const school = await this.schoolService.getSchoolById(id);      
         return  school ;

     }

     
     

  @Get()
  async getAllSchools(@Query() query:any): Promise<SchoolDto[]> {
    return this.schoolService.getAllSchools(query);
  }

  @Delete(':id')
  async deleteSchoolById(@Param('id') id: number): Promise<{ message: string }> {
   const school= await this.schoolService.deleteSchoolById(id);
   return school;
  
  }
}

