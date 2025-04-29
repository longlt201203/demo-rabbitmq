import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "1433"),
            username: process.env.DB_USER || "sa",
            password: process.env.DB_PASS || "Admin@123",
            synchronize: process.env.DB_SYNC === "true",
        })
    ]
})
export class DbModule {}