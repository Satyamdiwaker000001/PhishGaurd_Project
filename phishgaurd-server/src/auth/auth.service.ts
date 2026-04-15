import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
import { PasswordReset } from './password-reset.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
  ) {}

  async register(email: string, pass: string, name: string) {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Identity already registered in the Sentinel Network');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(pass)) {
      throw new ConflictException(
        'Password must be at least 8 characters and include uppercase, lowercase, numbers, and special symbols.',
      );
    }

    const tempEmailDomains = [
      'mailinator.com', 'guerrillamail.com', 'temp-mail.org', 
      '10minutemail.com', 'yopmail.com', 'sharklasers.com'
    ];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (tempEmailDomains.includes(emailDomain)) {
      throw new ConflictException('Unauthorized intelligence source: Temporary emails are prohibited.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);

    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    
    let role = UserRole.USER;
    if (adminEmail && email.toLowerCase() === adminEmail.toLowerCase()) {
        role = UserRole.ADMIN;
    }

    const user = await this.usersService.create({
      email,
      password_hash: hash,
      name,
      role,
    });

    const { password_hash, ...result } = user;
    return result;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      // For security, don't reveal if user exists, but here we reveal for dev ease if preferred.
      // The user requested "authenticated and unique", so we'll just handle it.
      throw new NotFoundException('No active agent found with this email.');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

    await this.passwordResetRepository.save({
      token,
      userId: user.id,
      expiresAt,
    });

    console.log(`[AUTHENTICATION] Password Reset Protocol Initiated for ${email}`);
    console.log(`[PASS] Reset Token: ${token}`);
    console.log(`[LINK] http://localhost:5173/reset-password?token=${token}`);

    return { message: 'Reset pulse dispatched. Check your terminal logs.' };
  }

  async resetPassword(token: string, newPass: string) {
    const resetEntry = await this.passwordResetRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetEntry || resetEntry.expiresAt < new Date()) {
      throw new UnauthorizedException('Reset token has expired or is invalid.');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPass)) {
      throw new ConflictException(
        'Password must be at least 8 characters and include uppercase, lowercase, numbers, and special symbols.',
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newPass, salt);

    await this.usersService.updatePassword(resetEntry.userId, hash);
    await this.passwordResetRepository.delete(resetEntry.id);

    return { message: 'Neural password updated successfully. Protocol terminated.' };
  }
}
