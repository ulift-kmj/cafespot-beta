interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
