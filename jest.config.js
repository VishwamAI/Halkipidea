module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)"
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testEnvironmentOptions: {
    resources: "usable",
    runScripts: "dangerously"
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  }
};
