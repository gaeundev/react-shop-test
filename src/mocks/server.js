import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// mocking server 생성
export const server = setupServer(...handlers); // setupTest.js 파일에서 불러서 사용
