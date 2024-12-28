type InfoDisplayProps = {
  calories: number;
  title: string;
};

export default function InfoDisplay({ calories, title }: InfoDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange">{calories}</span>
      {title}
    </p>
  );
}
