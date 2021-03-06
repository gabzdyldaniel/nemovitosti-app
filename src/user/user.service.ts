import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly model: Model<UserDocument>,
    private _authService: AuthService,
  ) {
  }

  loginAction({ email, password }) {
    return this._validateUser(email, password).pipe(
      switchMap((user: any) => {
        if (user?._doc) {
          return this._authService.generateAccessToken(
            user._doc,
          );
        }
        throw new HttpException(
          'Wrong credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }),
    );
  }

  registerAction(user: User) {
    return this._mailExists(user.email).pipe(
      switchMap((mailExists) => {
        if (mailExists) {
          throw new HttpException(
            'Email is already in use',
            HttpStatus.UNAUTHORIZED,
          );
        }

        return this._authService.hashPassword(user.password).pipe(
          switchMap(hash => {
            return from(new this.model({
              email: user.email,
              name: user.name,
              surname: user.surname,
              phoneNumber: user.phoneNumber,
              password: hash,
            }).save()).pipe(
              map((user: User) => {
                const { password, ...result } = user;
                return result;
              }),
              switchMap((user: any) => {
                return this._authService.generateAccessToken(
                  user._doc,
                );
              }),
            );
          }),
        );
      }),
    );
  }

  authenticateAction(user: any) {
    return this._authService.generateAccessToken(
      user,
    );
  }

  private _findUserByEmail(email: string) {
    return from(
      this.model.findOne({ email }).select('+password'),
    );
  }

  private _validateUser(email: string, password: string) {
    return this._findUserByEmail(email).pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new HttpException(
            'User does not exist',
            HttpStatus.CONFLICT,
          );
        }

        return this._authService.comparePasswords(
          password, user.password,
        ).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            }

            throw new UnauthorizedException();
          }),
        );
      }),
    );
  }

  private _mailExists(email: string) {
    return this._findUserByEmail(email).pipe(
      map((user: User) => !!user),
    );
  }
}
