import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendController } from './sendmail.controller';
import { SendService } from './sendmail.service';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
              host: process.env.SMTP_HOST || 'smtp.gmail.com',
              port: parseInt(process.env.SMTP_PORT, 10) || 587,
              // ignoreTLS: true,
              secure: false,
              auth: {
                user: process.env.SMTP_USER || 'scoutsct113@gmail.com',
                pass: process.env.SMTP_PASSWORD || 'efrtwsc.23' 
              },
              tls: {
                  rejectUnauthorized: false
              }
            },
            defaults: {
              from: `Grupo Scouts Centinelas 113 <${process.env.SMTP_USER}>`,
            },
          })
         
        }),
      ],
      controllers: [SendController],
      providers: [SendService],
      exports:[SendService ]
          
})
export class SendModule {}