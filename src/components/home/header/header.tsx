import Link from 'next/link';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { brand } from '@/config/brand';

interface Props {
  user: User | null;
}

export default function Header({ user }: Props) {
  return (
    <nav>
      <div className="mx-auto max-w-7xl relative px-[32px] py-[18px] flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <Link className="flex items-center" href={'/'}>
            <Image
              className="w-auto block"
              src={brand.logoPath}
              width={brand.logoWidth}
              height={brand.logoHeight}
              alt={brand.name}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user?.uid ? (
              <Button variant={'secondary'} asChild={true}>
                <Link href={'/dashboard'}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild={true} variant={'secondary'}>
                <Link href={'/login'}>Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
