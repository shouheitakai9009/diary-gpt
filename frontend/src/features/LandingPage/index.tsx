import { SignInDialog } from '@/components/ui/SignInDialog';
import { useUser } from '@/hooks/queries/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const { data: user } = useUser();
  const navigate = useNavigate();

  // ログイン済みの場合は /top にリダイレクト
  useEffect(() => {
    if (typeof user !== 'undefined') navigate('/top');
  }, [user]);

  return (
    <article>
      <header className="flex justify-between items-center h-14 px-4">
        <h1>Landing Page</h1>
        <SignInDialog />
      </header>
    </article>
  );
};
