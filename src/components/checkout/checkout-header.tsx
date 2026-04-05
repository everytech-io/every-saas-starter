import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/config/brand';

export function CheckoutHeader() {
  return (
    <div className={'flex gap-4'}>
      <Link href={'/'}>
        <Button variant={'secondary'} className={'h-[32px] border-border w-[32px] p-0 rounded-[4px]'}>
          <ChevronLeft />
        </Button>
      </Link>
      <Image src={brand.logoPath} alt={brand.name} width={brand.logoWidth} height={brand.logoHeight} />
    </div>
  );
}
