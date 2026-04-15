import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { AnalysisRecord } from './analysis-record.entity';

@Entity('apk_metadata')
export class ApkMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'log_id' })
  logId: string;

  @OneToOne(() => AnalysisRecord, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'log_id' })
  analysisRecord: AnalysisRecord;

  @Column({ name: 'file_hash', nullable: true })
  fileHash: string;

  @Column({ name: 'package_name', nullable: true })
  packageName: string;

  @Column({ name: 'dangerous_permissions', type: 'simple-array', nullable: true })
  dangerousPermissions: string[];
}
