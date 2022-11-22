import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities';

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(Gallery)
        private readonly galleryRepository:Repository<Gallery>,
    ){}

    async getOne(id:number){
        const imgData= await this.galleryRepository.findOneBy({id:id});
        if(!imgData) throw new NotFoundException();
        return imgData; 
    }

    async createProfileImage(id:number, imgNew:any){
        let imgData;
        const imgDataUser=await this.galleryRepository.findOneBy({id:id});
        imgNew['files'].map((data:any)=>imgData=data);
        if(!imgDataUser) throw new NotFoundException('Imagen del perfil de usuario no existe')
        const editedProfile= await Object.assign(imgDataUser,imgData);
        return await this.galleryRepository.save(editedProfile);

    }

    async updateProfileImage(id:number, file:any){
        const imgData= this.galleryRepository.findOneBy({id:id});
        return imgData;

    }  

    async deleteOne(id:number){
        const imgData = await this.galleryRepository.findOneBy({id:id});
        if(!imgData) throw new NotFoundException();
        return await this.galleryRepository.remove(imgData);
    }




}