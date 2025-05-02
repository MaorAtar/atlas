// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js','jsx','ts','tsx','json','node'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        babelrc: false,      // ignore external babelrc/config files
        presets: [
          ['@babel/preset-env',   { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        plugins: [
          'transform-import-meta'  // <— strip out import.meta.env
        ],
      }
    ]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.(test|spec).{js,jsx,ts,tsx}']
};
