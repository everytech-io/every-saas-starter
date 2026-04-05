'use client';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  label: string;
}

export function GhLoginButton({ label }: Props) {
  const router = useRouter();

  async function handleGithubLogin() {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('GitHub login error:', error);
    }
  }

  return (
    <div
      className={
        'mx-auto w-[343px] md:w-[488px] bg-background/80 backdrop-blur-[6px] px-6 md:px-16 pt-0 py-8 gap-6 flex flex-col items-center justify-center rounded-b-lg'
      }
    >
      <div className={'flex w-full items-center justify-center'}>
        <Separator className={'w-5/12 bg-border'} />
        <div className={'text-border text-xs font-medium px-4'}>or</div>
        <Separator className={'w-5/12 bg-border'} />
      </div>
      <Button onClick={handleGithubLogin} variant={'secondary'} className={'w-full'}>
        <Image
          height="24"
          className={'mr-3'}
          width="24"
          src="https://cdn.simpleicons.org/github/878989"
          unoptimized={true}
          alt={'GitHub logo'}
        />
        {label}
      </Button>
    </div>
  );
}
