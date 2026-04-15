import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AnalysisRecord } from './analysis-record.entity';
import { ImageMetadata } from './image-metadata.entity';
import { ApkMetadata } from './apk-metadata.entity';
import { WhitelistModule } from '../whitelist/whitelist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysisRecord, ImageMetadata, ApkMetadata]),
    WhitelistModule
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
