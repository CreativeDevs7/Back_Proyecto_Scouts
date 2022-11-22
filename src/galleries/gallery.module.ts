import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionModule } from "src/permission/permission.module";
import { Gallery } from "./entities";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";

const entityGallery = TypeOrmModule.forFeature([Gallery]);

@Module({
    imports:[entityGallery, forwardRef(() => PermissionModule) ],
    controllers: [GalleryController],
    providers: [GalleryService],
    exports:[GalleryService]
  })
export class GalleryModule {


}