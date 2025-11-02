'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [role, setRole] = useState('');

  useEffect(() => {
    const checkingToken = async () => {
      const res = await fetch('./api/token/checkToken');
      const data = await res.json();
      setRole(data.role);
    };

    checkingToken();
  }, []);

  useEffect(() => {
    if (role === 'A') {
      router.push('/Admin');
    } else if(role === 'P') {
      router.push('/User');
    }
  },[role,router])

  return (
    <div>Entering Thilina & Kavija Blogs</div>
  );
}
