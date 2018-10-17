import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { each } from 'lodash';

import { Logger } from '../logger.service';

const log = new Logger('HttpCacheService');
const cachePersistenceKey = 'httpCache';

export interface HttpCacheEntry {
  lastUpdated: Date;
  data: HttpResponse<any>;
}

@Injectable()
export class HttpCacheService {
  private cachedData: { [key: string]: HttpCacheEntry } = {};
  private storage: Storage | null = null;

  constructor() {
    this.loadCacheData();
  }

  setCacheData(url: string, data: HttpResponse<any>, lastUpdated?: Date) {
    this.cachedData[url] = {
      lastUpdated: lastUpdated || new Date(),
      data: data
    };
    log.debug(`Cache set for key: "${url}"`);
    this.saveCacheData();
  }

  getCacheData(url: string): HttpResponse<any> | null {
    const cacheEntry = this.cachedData[url];

    if (cacheEntry) {
      log.debug(`Cache hit for key: "${url}"`);
      return cacheEntry.data;
    }

    return null;
  }

  getHttpCacheEntry(url: string): HttpCacheEntry | null {
    return this.cachedData[url] || null;
  }

  clearCache(url: string): void {
    delete this.cachedData[url];
    log.debug(`Cache cleared for key: "${url}"`);
    this.saveCacheData();
  }

  cleanCache(expirationDate?: Date) {
    if (expirationDate) {
      each(this.cachedData, (value: HttpCacheEntry, key: string) => {
        if (expirationDate >= value.lastUpdated) {
          delete this.cachedData[key];
        }
      });
    } else {
      this.cachedData = {};
    }
    this.saveCacheData();
  }

  setPersistence(persistence?: 'local' | 'session') {
    this.cleanCache();
    this.storage = persistence === 'local' || persistence === 'session' ? window[persistence + 'Storage'] : null;
    this.loadCacheData();
  }

  private saveCacheData() {
    if (this.storage) {
      this.storage[cachePersistenceKey] = JSON.stringify(this.cachedData);
    }
  }

  private loadCacheData() {
    const data = this.storage ? this.storage[cachePersistenceKey] : null;
    this.cachedData = data ? JSON.parse(data) : {};
  }
}
