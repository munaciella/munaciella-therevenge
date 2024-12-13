import { jest, describe, it } from '@jest/globals';

describe('Mock Test', () => {
    
  it.only('should mock a function', () => {
    const mockFn = jest.fn();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });
});