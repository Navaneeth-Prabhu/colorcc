'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Tools() {
  const [randomId, setRandomId] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Generate a random ID (consider security and collision concerns)
    const newId = Math.random().toString(36).substring(2, 15);
    setRandomId(newId);

    // Redirect to the dynamic route with the generated ID
    router.push(`/contrast/${newId}`);
  }, []);

  return null; // No visible content needed after redirect
}

export default Tools;
