
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';



const conectionMysql = TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'scouts',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true, //Carga automaticamente todas las entidades/modelos registrados con TypeOrmModule.forFeature en los modulos
        synchronize: true,
    })
});

@Module({
    imports: [conectionMysql],
    exports: [conectionMysql],
    controllers: [],
    providers: [],
})
export class MysqlModule { }