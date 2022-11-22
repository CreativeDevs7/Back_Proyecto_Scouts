import { HttpException, HttpStatus } from "@nestjs/common"
import { existsSync, mkdirSync } from "fs";
import {v4 as uuid} from 'uuid'
import {extname} from "path";
import {diskStorage} from 'multer'

export const multerConfig = {
    //dist: path save file upload
    dest:'uploads/users'
}

function uuidRandom(file:any) {
    const result = `${uuid()}${extname(file.originalname)}`;
    return result;
}

export const multerOptions = {
    filename:(req:any,file:any,cb:any)=>{
        cb(null,uuidRandom(file));
    },
    fileFilter:(req:any, file:any, cb:any) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png)$/)){
        cb(null,true)   //allow storage of file
        } else {
            cb(new HttpException(`tipo de archivo ${extname(file.originalname)} no es soportado`, HttpStatus.BAD_REQUEST), false);  //file upload can not format
        }
    },
    //storage properties
    storage:diskStorage({
        //destination storage path detail
        destination:(req:any,file:any,cb:any) =>{
            const uploadPath = multerConfig.dest
            if(!existsSync(uploadPath)) {
                mkdirSync(uploadPath, {recursive: true});
            }
            cb(null,uploadPath)
        }
        
    })
}