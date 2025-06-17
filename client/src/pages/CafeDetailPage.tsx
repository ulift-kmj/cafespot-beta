import CafeDescription from '@/components/CafeDetail/CafeDescription';
import CafeFacilities from '@/components/CafeDetail/CafeFacilities';
import CafeHeader from '@/components/CafeDetail/CafeHeader';
import CafeLocation from '@/components/CafeDetail/CafeLocation';
import CafeSummary from '@/components/CafeDetail/CafeSummary';
import CafeImageCarousel from '@/components/CafeDetail/CafeImageCarousel';
import Container from '@/components/commons/Container';
import { useCafeDetail } from '@/hooks/useCafe';
import { useParams } from 'react-router';

function CafeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: cafe } = useCafeDetail(id!);

  if (!cafe) return null;

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto text-secondary">
        <div className="flex flex-col gap-6">
          <CafeHeader cafe={cafe} />
          <CafeImageCarousel photos={cafe.photos} />
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-6">
            <div className="flex flex-col gap-4">
              <CafeSummary summaries={cafe.summaries} />
              <CafeDescription description={cafe.description} />
              <CafeFacilities facilities={cafe.facilities} />
            </div>
            <CafeLocation address={cafe.address} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CafeDetailPage;
