import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('whitelist')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WhitelistController {
  constructor(private whitelistService: WhitelistService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async getAll() {
    return this.whitelistService.getAll();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async addDomain(@Body('domain') domain: string, @GetUser() user: any) {
    return this.whitelistService.addDomain(domain, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async updateDomain(
    @Param('id') id: string,
    @Body('domain') domain: string,
    @GetUser() user: any,
  ) {
    return this.whitelistService.updateDomain(parseInt(id), domain, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async removeDomain(@Param('id') id: string) {
    return this.whitelistService.removeDomain(parseInt(id));
  }
}
