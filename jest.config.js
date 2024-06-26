/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testRegex: '.e2e.tests.ts$'
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000, //от этой ошибки! -> thrown: "Exceeded timeout of 5000 ms for a test.
  testRegex: '.e2e.test.ts$', //<-- чтобы запускались только файлы с расширением ".e2e.test.ts"
}