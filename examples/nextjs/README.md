# 🔐 FHEVM SDK - Next.js 14 Example

This example demonstrates how to use the **FHEVM SDK** in a Next.js 14 application with App Router.

## Features

- ✅ **FHEVM SDK Integration** - Using `@fhevm/sdk` package
- ✅ **React Hooks** - `useFhevmInit`, `useFhevmEncrypt`, `useFhevmDecrypt`
- ✅ **Next.js 14 App Router** - Latest Next.js features
- ✅ **TypeScript** - Full type safety
- ✅ **Client Components** - Using `'use client'` directive

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Code Structure

### Provider Setup (`app/providers.tsx`)

```typescript
'use client';

import { FhevmProvider } from '@fhevm/sdk';

export function Providers({ children }) {
  return (
    <FhevmProvider
      config={{
        network: 'sepolia',
        contractAddress: '0x...',
        provider: window.ethereum
      }}
    >
      {children}
    </FhevmProvider>
  );
}
```

### Using SDK Hooks (`app/page.tsx`)

```typescript
'use client';

import { useFhevmInit, useFhevmEncrypt, useFhevmDecrypt } from '@fhevm/sdk';

function MyComponent() {
  const { fhevm, isReady } = useFhevmInit();
  const { encrypt } = useFhevmEncrypt();
  const { userDecrypt } = useFhevmDecrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint8');
    console.log('Encrypted:', encrypted);
  };

  const handleDecrypt = async (encrypted) => {
    const decrypted = await userDecrypt(encrypted);
    console.log('Decrypted:', decrypted);
  };

  return (
    <div>
      {isReady ? '✅ SDK Ready' : '⏳ Loading...'}
      <button onClick={handleEncrypt}>Encrypt</button>
    </div>
  );
}
```

## What This Example Shows

1. **SDK Initialization** - FhevmProvider wraps the app
2. **Encryption** - Encrypt values using `useFhevmEncrypt` hook
3. **Decryption** - Decrypt values using `useFhevmDecrypt` hook
4. **State Management** - SDK ready state, loading states, errors

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x8EAB26B5C6E8Efe05D30b479C483802D2Ab15c14
```

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel:

```bash
vercel
```

## Learn More

- [FHEVM SDK Documentation](../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/)
