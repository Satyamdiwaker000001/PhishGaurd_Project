import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisRecord } from './analysis-record.entity';
import { WhitelistService } from '../whitelist/whitelist.service';

@Injectable()
export class AnalysisService {
  private readonly aiEngineUrl = 'http://localhost:8001/api/v1/url/analyze';

  constructor(
    @InjectRepository(AnalysisRecord)
    private analysisRecordRepository: Repository<AnalysisRecord>,
    private whitelistService: WhitelistService,
  ) {}

  async analyzeUrl(url: string, userId?: string) {
    try {
      // 1. Check Global Whitelist (Database)
      const isWhitelisted = await this.whitelistService.isWhitelisted(url);
      
      let result;
      if (isWhitelisted) {
        result = {
          url,
          is_phishing: false,
          confidence: 1.0,
          threat_level: 'Low',
          is_whitelisted: true
        };
      } else {
        // 2. Call AI Engine for Neural Analysis
        const response = await fetch(this.aiEngineUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error('AI Engine responded with an error');
        }

        result = await response.json();
      }

      // 3. Save the analysis record to the database
      const record = this.analysisRecordRepository.create({
        url,
        is_phishing: result.is_phishing,
        confidence: result.confidence,
        threat_level: result.threat_level,
        is_whitelisted: result.is_whitelisted || false,
        reasons: result.reasons || [],
        user_id: userId ?? null,
      });
      await this.analysisRecordRepository.save(record);

      return result;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw new HttpException(
        'Failed to process analysis request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHistory(userId: string) {
    return this.analysisRecordRepository.find({
      where: { user_id: userId },
      order: { scanned_at: 'DESC' },
      take: 50,
    });
  }
}
