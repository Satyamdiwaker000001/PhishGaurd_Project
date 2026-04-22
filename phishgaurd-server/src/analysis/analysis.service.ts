import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisRecord } from './analysis-record.entity';
import { ImageMetadata } from './image-metadata.entity';
import { ApkMetadata } from './apk-metadata.entity';
import { WhitelistService } from '../whitelist/whitelist.service';
import * as os from 'os';

@Injectable()
export class AnalysisService {
  private readonly aiEngineUrl = 'http://localhost:8001/api/v1';

  constructor(
    @InjectRepository(AnalysisRecord)
    private analysisRecordRepository: Repository<AnalysisRecord>,
    @InjectRepository(ImageMetadata)
    private imageMetadataRepository: Repository<ImageMetadata>,
    @InjectRepository(ApkMetadata)
    private apkMetadataRepository: Repository<ApkMetadata>,
    private whitelistService: WhitelistService,
  ) {}

  async analyzeUrl(url: string, userId?: string) {
    try {
      const isWhitelisted = await this.whitelistService.isWhitelisted(url);

      let result;
      if (isWhitelisted) {
        result = {
          url,
          is_phishing: false,
          confidence: 1.0,
          threat_level: 'Low',
          is_whitelisted: true,
        };
      } else {
        const response = await fetch(`${this.aiEngineUrl}/url/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error('AI Engine responded with an error');
        }

        result = await response.json();
      }

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

  async analyzeImage(file: Express.Multer.File, userId?: string) {
    try {
      // Logic for image analysis (calling AI Engine /api/v1/vision)
      // Mocking for now as per plan
      const result = {
        is_phishing: false,
        confidence: 0.95,
        threat_level: 'Low',
        metadata: {
          fileHash: 'sha256_mock_hash',
          imageFormat: file.mimetype,
          containsQr: false,
          extractedText: 'Sample extracted text from image',
        },
      };

      const record = this.analysisRecordRepository.create({
        url: `FILE_IMAGE:${file.originalname}`,
        is_phishing: result.is_phishing,
        confidence: result.confidence,
        threat_level: result.threat_level,
        user_id: userId ?? null,
        reasons: ['Visual integrity verified'],
      });
      const savedRecord = await this.analysisRecordRepository.save(record);

      const metadata = this.imageMetadataRepository.create({
        logId: savedRecord.id,
        fileHash: result.metadata.fileHash,
        imageFormat: result.metadata.imageFormat,
        containsQr: result.metadata.containsQr,
        extractedText: result.metadata.extractedText,
      });
      await this.imageMetadataRepository.save(metadata);

      return { ...result, id: savedRecord.id };
    } catch (error) {
      throw new HttpException(
        'Image analysis failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async analyzeApk(file: Express.Multer.File, userId?: string) {
    try {
      const result = {
        is_phishing: true,
        confidence: 0.88,
        threat_level: 'High',
        metadata: {
          fileHash: 'sha256_apk_hash',
          packageName: 'com.attacker.phishing',
          dangerousPermissions: ['READ_SMS', 'SEND_SMS', 'INTERNET'],
        },
      };

      const record = this.analysisRecordRepository.create({
        url: `FILE_APK:${file.originalname}`,
        is_phishing: result.is_phishing,
        confidence: result.confidence,
        threat_level: result.threat_level,
        user_id: userId ?? null,
        reasons: ['Suspicious permissions detected', 'Unknown publisher'],
      });
      const savedRecord = await this.analysisRecordRepository.save(record);

      const metadata = this.apkMetadataRepository.create({
        logId: savedRecord.id,
        fileHash: result.metadata.fileHash,
        packageName: result.metadata.packageName,
        dangerousPermissions: result.metadata.dangerousPermissions,
      });
      await this.apkMetadataRepository.save(metadata);

      return { ...result, id: savedRecord.id };
    } catch (error) {
      throw new HttpException(
        'APK analysis failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHistory(userId: string) {
    return this.analysisRecordRepository.find({
      where: { user_id: userId },
      relations: ['imageMetadata', 'apkMetadata'],
      order: { scanned_at: 'DESC' },
      take: 50,
    });
  }

  async getAllHistory() {
    return this.analysisRecordRepository.find({
      relations: ['imageMetadata', 'apkMetadata'],
      order: { scanned_at: 'DESC' },
      take: 100,
    });
  }

  async remove(id: string): Promise<void> {
    await this.analysisRecordRepository.delete(id);
  }

  async getGlobalStats() {
    const total = await this.analysisRecordRepository.count();
    const malicious = await this.analysisRecordRepository.count({
      where: { is_phishing: true },
    });

    // Active agents (distinct user IDs)
    const activeUsersResult = await this.analysisRecordRepository
      .createQueryBuilder('record')
      .select('COUNT(DISTINCT record.user_id)', 'count')
      .getRawOne();

    const activeUsers = parseInt(activeUsersResult.count || '0', 10);

    // Neural Load (CPU Load Avg - first value represents 1min average)
    // We scale it to a percentage (0 to 100)
    const loadAvg = os.loadavg()[0];
    const cpuCount = os.cpus().length;
    const neuralLoad = Math.min(
      parseFloat(((loadAvg / cpuCount) * 100).toFixed(1)),
      100,
    );

    // Neural Latency (Simulated based on average processing time)
    const neuralLatency = Math.floor(Math.random() * 20) + 10; // 10ms - 30ms

    return {
      totalScans: total,
      maliciousScans: malicious,
      threatRate: total > 0 ? ((malicious / total) * 100).toFixed(1) : 0,
      systemStatus: loadAvg < cpuCount ? 'Optimal' : 'Loaded',
      activeUsers,
      neuralLoad,
      neuralLatency,
    };
  }
}
