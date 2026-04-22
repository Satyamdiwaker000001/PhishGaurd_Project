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
    console.log(
      `[WHITELIST] Attempting to add domain: ${domain} by Admin: ${adminId}`,
    );

    if (!domain) {
      throw new Error('Domain identifier is missing');
    }

    const domainName = this.extractRootDomain(domain);
    console.log(`[WHITELIST] Extracted root domain: ${domainName}`);

    const existing = await this.whitelistRepository.findOne({
      where: { domainName },
    });
    if (existing) {
      console.log(
        `[WHITELIST] Domain ${domainName} already exists in registry.`,
      );
      return existing;
    }

    const newEntry = this.whitelistRepository.create({
      domainName,
      addedByAdmin: adminId,
    });

    const saved = await this.whitelistRepository.save(newEntry);
    console.log(
      `[WHITELIST] Successfully persisted domain: ${domainName} (ID: ${saved.id})`,
    );
    return saved;
  }

  async removeDomain(id: number): Promise<void> {
    console.log(`[WHITELIST] Terminating domain registry for ID: ${id}`);
    await this.whitelistRepository.delete(id);
  }

  async updateDomain(
    id: number,
    domain: string,
    adminId: string,
  ): Promise<GlobalWhitelist> {
    console.log(
      `[WHITELIST] Updating domain registry for ID: ${id} to ${domain} by Admin: ${adminId}`,
    );
    const domainName = this.extractRootDomain(domain);
    await this.whitelistRepository.update(id, {
      domainName,
      addedByAdmin: adminId,
    });
    return this.whitelistRepository.findOne({
      where: { id },
    }) as Promise<GlobalWhitelist>;
  }

  private extractRootDomain(url: string): string {
    try {
      let domain = url.trim().toLowerCase();
      // Remove protocol
      if (domain.includes('://')) {
        domain = domain.split('://')[1];
      }
      // Remove path and query
      domain = domain.split('/')[0];
      domain = domain.split('?')[0];
      // Remove port
      domain = domain.split(':')[0];

      // Handle www.
      if (domain.startsWith('www.')) {
        domain = domain.substring(4);
      }

      // Basic validation: must have at least one dot
      if (!domain.includes('.')) {
        console.warn(
          `[WHITELIST] Warning: domain ${domain} appears malformed.`,
        );
      }

      return domain;
    } catch (err) {
      console.error('[WHITELIST] Domain extraction failed:', err);
      return url.toLowerCase().trim();
    }
  }
}
