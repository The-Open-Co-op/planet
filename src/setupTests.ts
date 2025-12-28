import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock NextGraph LDO functions
jest.mock('@/lib/nextgraph', () => ({
  dataset: {
    getResource: jest.fn(() => ({
      isError: true,
      type: 'InvalidIdentifierResouce'
    }))
  },
  useLdo: jest.fn(() => ({
    commitData: jest.fn(),
    changeData: jest.fn((contact: any) => contact)
  }))
}));

// Mock feature flags
jest.mock('@/utils/featureFlags', () => ({
  isNextGraphEnabled: jest.fn(() => false)
}));

// Mock sources helper
jest.mock('@/components/contacts/sourcesHelper', () => ({
  getSourceIcon: jest.fn(() => null),
  getSourceLabel: jest.fn((source: string) => source)
}));