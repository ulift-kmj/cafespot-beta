import { useRef, useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_OPTIONS = {
  center: new window.kakao.maps.LatLng(37.483034, 126.902435),
  level: 2,
};

export const useKakaoMap = (mapRef: React.RefObject<any>) => {
  const position = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current && position.current) {
        mapRef.current.setCenter(position.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * 카카오 맵 생성
   * @returns - 카카오 맵 객체
   */
  const createMap = (container: HTMLElement) => {
    const map = new window.kakao.maps.Map(container, DEFAULT_OPTIONS);
    mapRef.current = map;
    return map;
  };

  /**
   * 마커 생성
   * @param coords - 마커 좌표
   * @returns - 마커 객체
   */
  const createMarker = (coords: any) => {
    return new window.kakao.maps.Marker({
      position: coords,
    });
  };

  /**
   * 마커 그리기
   * @param coords - 마커 좌표
   */
  const drawMarker = (coords: any) => {
    if (!mapRef.current || !coords) return;

    const marker = createMarker(coords);
    marker.setMap(mapRef.current);
  };

  /**
   * 주소를 좌표로 변환하고 맵 중심을 해당 좌표로 이동
   * @param address - 주소
   */
  const setCenterWithAddress = (address: string) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        position.current = coords;
        mapRef.current?.setCenter(coords);
        drawMarker(coords);
      }
    };

    geocoder.addressSearch(address, callback);
  };

  /**
   * 맵 초기화 및 컨트롤 설정
   * @param container - 맵을 표시할 컨테이너
   */
  const initMap = (container: HTMLElement) => {
    const map = createMap(container);

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  };

  /**
   * 주소 변경 시 맵 업데이트
   * @param address - 주소
   */
  const updateMapWithAddress = (address: string) => {
    if (mapRef.current) {
      setCenterWithAddress(address);
      drawMarker(position.current);
    }
  };

  return {
    position,
    containerRef,
    createMap,
    createMarker,
    drawMarker,
    setCenterWithAddress,
    initMap,
    updateMapWithAddress,
  };
};
