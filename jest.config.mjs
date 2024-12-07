export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};