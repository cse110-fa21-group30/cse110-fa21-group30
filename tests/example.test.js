/**
 * example for how to write a test case as well as to test if the testing framework works
 */

// import the testing framework since we are using ES6 Modules
import { jest, expect, test } from '@jest/globals';
jest.useFakeTimers();

import { add, imperial_to_metric } from '../source/example.js';

test('testing the add function in order to test the testing framework : )', () => {
  expect(add(1, 2)).toBe(3);
});

test('testing imeprial to metrix', () => {
  expect(imperial_to_metric(1)).toBe(28.3);
});
