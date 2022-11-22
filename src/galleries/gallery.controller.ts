import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./config";
import { ApiTags } from '@nestjs/swagger';
import { GalleryService } from "./gallery.service";
import { Auth } from "src/common/decorators";
import { ParseIntPipe } from "@nestjs/common/pipes/parse-int.pipe";
import { map, of } from "rxjs";

@ApiTags('Uploads')
@Controller('upload')
export class GalleryController{

  constructor(
    private readonly galleryService:GalleryService,
  ){}

    @Auth()
    @Get(':id')
    async getOneImage(@Param('id', ParseIntPipe) id:number){
      const data= await this.galleryService.getOne(id);
      return {
          message:"Imagen Cargada",
          data:data
      }
    }

    @Post('/photo')
    @UseInterceptors(FilesInterceptor('file', null,multerOptions))
    async uploadFile(@UploadedFiles() file: Express.Multer.File , @Req() req, @Body("id") id:number) {
      const image = await this.galleryService.createProfileImage(id,req);
      
      return of({
        imageid: file.filename,
        imagepath: file.destination,
        originalname: file.originalname,
        
        message:"Datos imagen profile",
        data:image
      });   

    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') file:Express.Multer.File,
    @Res() res) {
      return res.sendFile(file, {root: 'uploads' });
    }

    @Put('/photo/:id')
    @UseInterceptors(FilesInterceptor('file', null,multerOptions))
    async updateProfileImage(@UploadedFiles() file:any , @Req() req:any, @Body("id") id:number) {
      const image = await this.galleryService.createProfileImage(id,req);
      return of({
        imageid: file.filename,
        imagepath: file.destination,
        originalname: file.originalname,
        message:"Datos imagen profile",
        data:image
      }); 
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
        const data= await this.galleryService.deleteOne(id);  
        return {
            message:"Imagen de perfil Eliminado",
            data:data
        }
    }

}