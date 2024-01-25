/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

const Rpnc = require('./rpnc');

/** */
test('Addition', () => {
  expect(new Rpnc().evaluate('3.4 1.1 +')).toBe(4.5);
});

/** */
test('Subtraction', () => {
  expect(new Rpnc().evaluate('3.4 1.1 -')).toBe(2.3);
});

/** */
test('Multiplication', () => {
  expect(new Rpnc().evaluate('3.4 2 *')).toBe(6.8);
});

/** */
test('Division', () => {
  expect(new Rpnc().evaluate('3.4 2 /')).toBe(1.7);
});

/** */
test('Power', () => {
  const raw = new Rpnc().evaluate('3.4 2 ^');
  const rounded = Math.round(raw * 100) / 100;
  expect(rounded).toBe(11.56);
});

/** */
test('Compound', () => {
  const raw = new Rpnc().evaluate('1 2 + 3 4 / 5 6 + ^ *');
  const rounded = Math.round(raw * 1000000) / 1000000;
  expect(rounded).toBe(0.126705);
});

/** */
test('Invalid', () => {
  expect(() => new Rpnc().evaluate('3.4 + 1.1')).toThrowError();
});

/** */
test('Len Of Stack Less then 1', () => {
  expect(() => new Rpnc().evaluate('1 2 3 +'))
      .toThrowError('Invalid Expression');
});
