import { useEffect, useRef } from 'react';
import { useKakaoMap } from '@/hooks/useKakaoMap';

interface KakaoMapProps {
  address: string;
}

function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<any>(null);
  const { containerRef, initMap, updateMapWithAddress } = useKakaoMap(mapRef);

  useEffect(() => {
    if (containerRef.current) {
      initMap(containerRef.current);
    }
  }, []);

  useEffect(() => {
    updateMapWithAddress(address);
  }, [address]);

  return (
    <div
      className="w-full h-[500px] rounded-lg border-2 border-gray-300"
      ref={containerRef}
    />
  );
}

export default KakaoMap;
