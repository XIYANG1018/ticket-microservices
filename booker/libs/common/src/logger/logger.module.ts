import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule} from 'nestjs-pino';
import { single } from 'rxjs';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      }
    }),
  ],
})
export class LoggerModule {}
