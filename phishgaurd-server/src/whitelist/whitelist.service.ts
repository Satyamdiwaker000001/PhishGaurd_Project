import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalWhitelist } from './global-whitelist.entity';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(GlobalWhitelist)
    private whitelistRepository: Repository<GlobalWhitelist>,
  ) {}

  async isWhitelisted(domain: string): Promise<boolean> {
    const rootDomain = this.extractRootDomain(domain);
    const result = await this.whitelistRepository.findOne({
      where: { domainName: rootDomain },
    });
    return !!result;
  }

  async getAll(): Promise<GlobalWhitelist[]> {
    return this.whitelistRepository.find({ order: { addedAt: 'DESC' } });
  }

  async addDomain(domain: string, adminId: string): Promise<GlobalWhitelist> {
    const domainName = this.extractRootDomain(domain);
    const existing = await this.whitelistRepository.findOne({ where: { domainName } });
    if (existing) return existing;

    const newEntry = this.whitelistRepository.create({
      domainName,
      addedByAdmin: adminId,
    });
    return this.whitelistRepository.save(newEntry);
  }

  async removeDomain(id: number): Promise<void> {
    await this.whitelistRepository.delete(id);
  }

  private extractRootDomain(url: string): string {
    try {
      let domain = url;
      if (domain.includes('://')) {
        domain = domain.split('://')[1];
      }
      domain = domain.split('/')[0];
      domain = domain.split(':')[0];
      
      if (domain.startsWith('www.')) {
        domain = domain.substring(4);
      }
      return domain.toLowerCase();
    } catch {
      return url.toLowerCase();
    }
  }
}
