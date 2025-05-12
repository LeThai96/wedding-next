'use client';

import { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';

export function SnowfallEffect() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // Create heart icon
    const heartIcon = document.createElement('img');
    heartIcon.src = '/icons/heart.svg';

    // Create clover icon
    const cloverIcon = document.createElement('img');
    cloverIcon.src = '/icons/clover.svg';

    setImages([heartIcon, cloverIcon]);
  }, []);

  return (
    <Snowfall 
      images={images}
      snowflakeCount={10}
      radius={[7.0, 15.0]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
}