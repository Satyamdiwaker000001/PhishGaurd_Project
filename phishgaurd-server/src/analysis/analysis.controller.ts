import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth/get-user.decorator';
import { UserRole } from '../users/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('url')
  async analyzeUrl(@Body('url') url: string, @Req() req: any) {
    const userId = req.user?.id;
    return this.analysisService.analyzeUrl(url, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@GetUser() user: any) {
    return this.analysisService.getHistory(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('all-history')
  async getAllHistory() {
    return this.analysisService.getAllHistory();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('global-stats')
  async getGlobalStats() {
    return this.analysisService.getGlobalStats();
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId?: string,
  ) {
    return this.analysisService.analyzeImage(file, userId);
  }

  @Post('apk')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeApk(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId?: string,
  ) {
    return this.analysisService.analyzeApk(file, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.analysisService.remove(id);
  }
}
