/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const { Config } = require('jest');

module.exports = {
    // Stop running tests after `n` failures
    bail: 0,

    // Automatically clear mock calls, instances, contexts, and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    // coverageProvider: 'babel',

    // The root directory that Jest should scan for tests and modules within
    rootDir: './src',

    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
