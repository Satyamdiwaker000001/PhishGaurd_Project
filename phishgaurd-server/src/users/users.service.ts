import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') || 'admin@phishguard.com';
    const existingAdmin = await this.findOneByEmail(adminEmail);

    if (!existingAdmin) {
      console.log('--- Initializing System: Seeding Admin Account ---');
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash('Admin@12345', salt);

      await this.create({
        email: adminEmail,
        password_hash: hash,
        name: 'System Administrator',
        role: UserRole.ADMIN,
      });
      console.log(`[PASS] Admin account created: ${adminEmail}`);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user || null;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async count(): Promise<number> {
    return this.usersRepository.count();
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'name', 'role', 'created_at'],
      order: { created_at: 'DESC' },
    });
  }

  async updatePassword(id: string, password_hash: string): Promise<void> {
    await this.usersRepository.update(id, { password_hash });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    await this.usersRepository.update(id, data);
  }
}
