/**
 * Jest Setup File
 * Global test configuration and mocks
 */

// Import jest-native extensions
require('@testing-library/jest-native/extend-expect');

// Mock fetch globally
if (!global.fetch) {
  global.fetch = () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
      status: 200,
      statusText: 'OK',
    });
}