import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Body, NotFoundException, HttpStatus } from '@nestjs/common';
import { AddressEntity } from './address.entity';
import { Repository } from 'typeorm';
import { ApiError } from 'src/exceptions/ApiError';
import { AddressDto } from './dto/address.dto';



@Injectable()
export class AddressService {
constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
){}

async CreateAddress(body:AddressEntity):Promise<AddressEntity>{

    const address= await this.addressRepository.save(body);
    return await this.addressRepository.save(address);
}


async getAllAddress(query:AddressDto):Promise<AddressDto[]>{
    console.log(query);
    const address=await this.addressRepository.find({where:query});
    return address
}

async getById(id:number):Promise<AddressEntity>{
    const address=await this.addressRepository.findOne({where:{id:id} });
    if(!address){
        throw new ApiError(404,'no document Found with id')
    }
    return address
}
async updateAddress(id:number,body:AddressEntity):Promise<AddressEntity>{
    const address=await this.getById(id);
    Object.assign(address,body);
    return address
}

async GetByName(address:string):Promise<AddressDto>{
    const addres=await this.addressRepository.findOne({where:{address:address}});
    return addres
}



async deleteById(id: number): Promise<{ message: string }> {
    const address = await this.addressRepository.delete(id);

    if (address.affected === 0) {
      throw new ApiError(HttpStatus.NOT_FOUND, `Address with ID ${id} not found.`);
    }

    return { message: `The address with ID ${id} has been successfully deleted.` };
  }
}
