import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('jwtConfig.secret'),
    signOptions: {
      expiresIn: configService.get<number>('jwtConfig.expire')
    }
  }),
  inject: [ConfigService]
};

@Module({
  imports: [PassportModule, JwtModule.registerAsync(jwtFactory)],
  providers: [JwtStrategy],
  controllers: []
})
export class AuthModule {}
