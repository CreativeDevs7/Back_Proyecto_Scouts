import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../user/entities';
import { SendService } from './sendmail.service';

@Controller('sendMail')
export class SendController {
  constructor(private readonly sendService: SendService) {}

  @Get()
  getHello(): string {
    return this.sendService.getHello();
  }
  @Post()
  sendEmail(
      //@Body() dtoSend:SendMailDTO
      @Body() newUser:User 
  ) {

    return this.sendService.sendMailNewUser(newUser);
  }
}
