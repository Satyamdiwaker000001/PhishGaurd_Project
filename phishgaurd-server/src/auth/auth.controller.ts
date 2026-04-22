import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') pass: string,
    @Body('name') name: string,
  ) {
    return this.authService.register(email, pass, name);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') pass: string) {
    const user = await this.authService.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid intelligence credentials');
    }
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') pass: string,
  ) {
    return this.authService.resetPassword(token, pass);
  }
}
