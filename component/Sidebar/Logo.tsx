import Image from 'next/image';
import FavIcon from '@/app/favicon.ico';

type Props = {
  collapsed: boolean;
};

export default function Logo({ collapsed }: Props) {
  return collapsed ? (
    <div className="mt-8 mb-2 w-12 h-12 flex items-center justify-center">
      <Image className="rounded-full" src={FavIcon} alt="icon" width={40} height={40} />
    </div>
  ) : (
    <h1 className="text-7xl font-bold mt-16 mb-16">
      RA 7166 <br /> Expert System
    </h1>
  );
}
