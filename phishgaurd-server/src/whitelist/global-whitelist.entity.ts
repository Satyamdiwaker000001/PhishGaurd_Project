import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('global_whitelists')
export class GlobalWhitelist {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ name: 'domain_name' })
  domainName: string;

  @Column({ name: 'added_by_admin', nullable: true })
  addedByAdmin: string;

  @CreateDateColumn({ name: 'added_at' })
  addedAt: Date;
}
