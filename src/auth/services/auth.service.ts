import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { User } from '../../user/user.schema';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  generateAccessToken(user: User | any): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(password: string, hash: string): Observable<any> {
    return from(bcrypt.compare(password, hash));
  }
}
