import { FadeLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <FadeLoader color="#B37E2E" />
    </div>
  );
}
