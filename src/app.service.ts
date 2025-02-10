import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Shivam!';
  }
  getUser() {
    return {
      name: "shivam"
    }
  }
}
