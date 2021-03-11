import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from './user.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UserService } from './user.service';
import { catchError, map } from 'rxjs/operators';

@Controller('user')
export class UserController {
  constructor(private _usersService: UserService) {
  }

  @Post('login')
  loginAction(
    @Body() credentials: { email: string, password: string }
  ): Observable<any> {
    return this._usersService.loginAction(credentials).pipe(
      map((jwt: string) => {
        return { access_token: jwt }
      })
    )
  }

  @Post('register')
  registerAction(
    @Body() user: User
  ): Observable<any> {
    return this._usersService.registerAction(user).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  @Get('authenticate')
  @UseGuards(JwtAuthGuard)
  authenticateAction(
    @Req() req: any
  ): Observable<any> {
    return this._usersService.authenticateAction(req).pipe(
      map((jwt: string) => {
        return { access_token: jwt }
      })
    )
  }
}
