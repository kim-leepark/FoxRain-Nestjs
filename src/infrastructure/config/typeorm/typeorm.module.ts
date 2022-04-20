import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (
  config: DatabaseConfig,
): TypeOrmModuleOptions =>
  ({
    type: 'mysql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    synchronize:
      process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
        ? true
        : false,
    logging:
      process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
        ? true
        : false,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
