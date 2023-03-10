module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
}