import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/Avatar';
import { SignInDialog } from '@/components/ui/SignInDialog';
import { SignUpDialog } from '@/components/ui/SignUpDialog/components';
import { useUser } from '@/hooks/queries/useUser';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const { data: user } = useUser();

  return (
    <article>
      <img
        src="https://www.illust-box.jp/db_img/sozai/00006/68840/watermark.jpg"
        className="w-full h-full"
      />
      <header className="flex justify-between items-center h-14 px-4">
        <h1>Landing Page</h1>
        {user ? (
          <Link to="/top">
            <Avatar>
              <AvatarImage
                src={user.imageSrc ?? undefined}
                alt={user.username}
              />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <div>
            <SignUpDialog />
            <SignInDialog />
          </div>
        )}
      </header>
    </article>
  );
};
