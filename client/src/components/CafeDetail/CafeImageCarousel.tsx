import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from '@/components/ui/carousel';

interface CarouselProps {
  photos: { url: string }[];
}

const CafeImageCarousel = ({ photos }: CarouselProps) => {
  return (
    <Carousel className="w-full h-[50vh] rounded-xl overflow-hidden">
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={index} className="h-[50vh]">
            <img
              alt={`Cafe photo ${index + 1}`}
              src={photo.url}
              className="object-cover w-full h-full rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 absolute z-10 text-white text-3xl bg-black/30 hover:bg-black/60" />
      <CarouselNext className="right-4 top-1/2 -translate-y-1/2 absolute z-10 text-white text-3xl bg-black/30 hover:bg-black/60" />
    </Carousel>
  );
};

export default CafeImageCarousel;
