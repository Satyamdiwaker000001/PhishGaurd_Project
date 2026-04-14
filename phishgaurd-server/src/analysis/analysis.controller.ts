import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('url')
  async analyzeUrl(@Body('url') url: string, @Req() req: any) {
    // If user is logged in (extension/dashboard), attach their ID to the record
    // We check for user manually to support both Guest and Logged-in scans
    const userId = req.user?.id;
    return this.analysisService.analyzeUrl(url, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@GetUser() user: any) {
    return this.analysisService.getHistory(user.id);
  }
}
