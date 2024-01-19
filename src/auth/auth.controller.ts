import { Controller, Get, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Public } from '../decorators/public';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @Public()
  @Post('auth/login')
  async login(@Request() req, @Body() body: CreateUserDto) {
    // req.user = body
    return this.authService.login(body);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.authService.register(body.email, body.password);
    const payload = { username: user.email, sub: user.id };
    return {
      ...user,
      token: this.jwtService.sign(payload),
    };
  }

  @Get('profile')
  async getProfile(@Request() req) {
    console.log(req.user);
    const { password, ...user } = await this.usersService.findOneByEmail(
      req.user.username,
    );
    return user;
  }

  @Public()
  @Get('/new')
  getNew(@Request() req) {
    return 'hi';
  }
}
