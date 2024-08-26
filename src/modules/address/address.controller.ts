import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressEntity } from './address.entity';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {

    constructor(private readonly addressServices:AddressService){}

@Post()
async createAddress(@Body() body:AddressDto):Promise<AddressDto>{
    return await this.addressServices.CreateAddress(body);
}


    @Get()
    async GetAllAddress(@Query() query:AddressDto):Promise<AddressDto[]>{
const address=await this.addressServices.getAllAddress(query);
        return  address;
    }

@Get('id')
async getById(@Param('id') id:number):Promise<AddressDto>{
   return  await this.addressServices.getById(id);
}

@Delete(':id')
async deleteSchoolById(@Param('id') id: number): Promise<{ message: string }> {
 const address= await this.addressServices.deleteById(id);
 return address;

}
}
