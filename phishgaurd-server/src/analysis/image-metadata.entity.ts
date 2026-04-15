import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { AnalysisRecord } from './analysis-record.entity';

@Entity('image_metadata')
export class ImageMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'log_id' })
  logId: string;

  @OneToOne(() => AnalysisRecord, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'log_id' })
  analysisRecord: AnalysisRecord;

  @Column({ name: 'file_hash', nullable: true })
  fileHash: string;

  @Column({ name: 'image_format', nullable: true })
  imageFormat: string;

  @Column({ name: 'contains_qr', default: false })
  containsQr: boolean;

  @Column({ name: 'extracted_text', type: 'text', nullable: true })
  extractedText: string;
}
