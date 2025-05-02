// jest.setup.js
import '@testing-library/jest-dom';

// polyfill TextEncoder/TextDecoder for packages that rely on them (e.g. react‑router)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
