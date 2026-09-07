import type { PraetorianApi } from '@/services/interfaces/praetorian-api';
import { HttpPraetorianApi } from '@/services/http/http-praetorian-api';
import { MockPraetorianApi } from '@/services/mock/mock-praetorian-api';

export function getPraetorianApi(): PraetorianApi {
  if (process.env.PRAETORIAN_API_MODE === 'http') {
    const baseUrl = process.env.PRAETORIAN_API_ORIGIN;
    if (!baseUrl) {
      throw new Error('PRAETORIAN_API_ORIGIN is required for the HTTP adapter.');
    }
    return new HttpPraetorianApi(baseUrl);
  }
  return new MockPraetorianApi();
}

export function isPraetorianMockMode(): boolean {
  return process.env.PRAETORIAN_API_MODE !== 'http';
}
