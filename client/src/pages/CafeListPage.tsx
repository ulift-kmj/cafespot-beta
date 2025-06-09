import CafeList from '@/components/CafeList';
import Container from '@/components/commons/Container';
import LoadingSpinner from '@/components/commons/LoadingSpinner';
import { Suspense } from 'react';

export default function CafeListPage() {
  return (
    <Container>
      <Suspense fallback={<LoadingSpinner />}>
        <CafeList />
      </Suspense>
    </Container>
  );
}
