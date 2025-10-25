# Next.js Encrypted Counter - Simple Example

Basic Next.js 14 example demonstrating FHEVM SDK usage with the App Router.

## Overview

A simple encrypted counter application showcasing:
- **FHEVM SDK Integration** - Using the universal SDK with Next.js
- **React Hooks** - `useFhevmEncrypt` and `useFhevmDecrypt`
- **Client Components** - Proper use of 'use client' directive
- **TypeScript** - Full type safety
- **Modern UI** - Clean, responsive design

## Features

- ✅ Encrypt numeric values (0-255)
- ✅ Decrypt encrypted values with signature
- ✅ Loading states and error handling
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Next.js 14 App Router

## Quick Start

### Installation

```bash
# Navigate to example
cd examples/nextjs

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0x8EAB26B5C6E8Efe05D30b479C483802D2Ab15c14
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
nextjs/
├── app/
│   ├── layout.tsx          # Root layout with FhevmProvider
│   ├── page.tsx            # Main counter page
│   ├── providers.tsx       # Client-side providers wrapper
│   └── globals.css         # Global styles with Tailwind
├── .env.example            # Environment template
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## Key Concepts

### Client Components

Next.js 14 uses Server Components by default. When using React hooks, mark components with `'use client'`:

```typescript
'use client'; // Required for hooks

import { useFhevmEncrypt } from '@fhevm/sdk';

export default function MyComponent() {
  const { encrypt } = useFhevmEncrypt(); // ✅ Works
}
```

### FhevmProvider

The provider wraps the entire application in the root layout to make the SDK available everywhere.

### Environment Variables

Next.js requires the `NEXT_PUBLIC_` prefix for client-side variables:

```env
# ✅ Accessible in browser
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# ❌ Not accessible in browser
CONTRACT_ADDRESS=0x...
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables in Vercel

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_NETWORK` = `sepolia`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0x...`

## Learn More

### Documentation

- **FHEVM SDK**: [../../README.md](../../README.md)
- **Next.js Guide**: [../../docs/nextjs.md](../../docs/nextjs.md)
- **React Integration**: [../../docs/react.md](../../docs/react.md)
- **Next.js Docs**: https://nextjs.org/docs

### Advanced Examples

- **Privacy Waste Rewards**: [../privacy-waste-rewards/](../privacy-waste-rewards/) - Complete real-world dApp
- **React Voting**: [../react/](../react/) - Anonymous voting system

## Resources

- **GitHub**: https://github.com/AidenKuhn/fhevm-react-template
- **FHEVM Docs**: https://docs.zama.ai/

## License

MIT License - see [../../LICENSE](../../LICENSE)

---

**Simple example demonstrating FHEVM SDK with Next.js 14** ⚡🔐

*Perfect starting point for building privacy-preserving Next.js applications!*
