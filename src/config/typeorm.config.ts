import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mohamed0@',
    database: 'Educap',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
    autoLoadEntities: true,
}