import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ImageMetadata } from './image-metadata.entity';
import { ApkMetadata } from './apk-metadata.entity';

@Entity('analysis_records')
export class AnalysisRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  url: string;

  @Column()
  is_phishing: boolean;

  @Column({ type: 'float' })
  confidence: number;

  @Column()
  threat_level: string;

  @Column({ default: false })
  is_whitelisted: boolean;

  @Column({ type: 'simple-array', nullable: true })
  reasons: string[];

  @CreateDateColumn()
  scanned_at: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: string | null;

  @OneToOne(() => ImageMetadata, (metadata) => metadata.analysisRecord)
  imageMetadata: ImageMetadata;

  @OneToOne(() => ApkMetadata, (metadata) => metadata.analysisRecord)
  apkMetadata: ApkMetadata;
}
