'use client';

import { useState } from 'react';
import { Providers } from './providers';
import { useFhevmInit, useFhevmEncrypt, useFhevmDecrypt } from '@fhevm/sdk';

function EncryptedCounter() {
  const { fhevm, isReady } = useFhevmInit();
  const { encrypt, isEncrypting } = useFhevmEncrypt();
  const { userDecrypt, isDecrypting } = useFhevmDecrypt();

  const [value, setValue] = useState('');
  const [encryptedData, setEncryptedData] = useState<any>(null);
  const [decryptedValue, setDecryptedValue] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const handleEncrypt = async () => {
    if (!value) {
      setStatus('Please enter a value');
      return;
    }

    setStatus('Encrypting...');
    const encrypted = await encrypt(parseInt(value), 'uint8');

    if (encrypted) {
      setEncryptedData(encrypted);
      setStatus('✅ Value encrypted successfully!');
    } else {
      setStatus('❌ Encryption failed');
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedData) {
      setStatus('No encrypted data to decrypt');
      return;
    }

    setStatus('Decrypting...');
    const decrypted = await userDecrypt(encryptedData);

    if (decrypted !== null) {
      setDecryptedValue(decrypted);
      setStatus('✅ Value decrypted successfully!');
    } else {
      setStatus('❌ Decryption failed');
    }
  };

  return (
    <div className="container">
      <h1>🔐 FHEVM SDK - Encrypted Counter</h1>

      <div className="card">
        <h2>SDK Status</h2>
        <div className={`status ${isReady ? 'success' : 'info'}`}>
          {isReady ? '✅ SDK Ready' : '⏳ Initializing SDK...'}
        </div>
      </div>

      <div className="card">
        <h2>Step 1: Encrypt a Value</h2>
        <input
          type="number"
          className="input"
          placeholder="Enter a number (0-255)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!isReady}
        />
        <button
          className="button"
          onClick={handleEncrypt}
          disabled={!isReady || isEncrypting || !value}
        >
          {isEncrypting ? 'Encrypting...' : '🔒 Encrypt Value'}
        </button>

        {encryptedData && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
            <strong>Encrypted Data:</strong>
            <pre style={{ overflow: 'auto', fontSize: '0.875rem' }}>
              {JSON.stringify(encryptedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Step 2: Decrypt the Value</h2>
        <button
          className="button"
          onClick={handleDecrypt}
          disabled={!encryptedData || isDecrypting}
        >
          {isDecrypting ? 'Decrypting...' : '🔓 Decrypt Value'}
        </button>

        {decryptedValue !== null && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#d4edda', borderRadius: '8px' }}>
            <strong>Decrypted Value:</strong> {decryptedValue}
          </div>
        )}
      </div>

      {status && (
        <div className="card">
          <div className={`status ${status.includes('✅') ? 'success' : status.includes('❌') ? 'error' : 'info'}`}>
            {status}
          </div>
        </div>
      )}

      <div className="card">
        <h2>About This Example</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          This Next.js 14 example demonstrates the FHEVM SDK integration:
        </p>
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem', lineHeight: '1.8', color: '#666' }}>
          <li><strong>FhevmProvider</strong> - Wraps the app with SDK context</li>
          <li><strong>useFhevmInit</strong> - Access SDK instance and ready state</li>
          <li><strong>useFhevmEncrypt</strong> - Encrypt values with FHE</li>
          <li><strong>useFhevmDecrypt</strong> - Decrypt encrypted values</li>
        </ul>
        <p style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px', color: '#856404' }}>
          <strong>Note:</strong> This is a demo using simulated encryption. In production, integrate tfhe-js library for real FHE operations.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Providers>
      <EncryptedCounter />
    </Providers>
  );
}
