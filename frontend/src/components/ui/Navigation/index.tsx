import { cn } from '@/utils/classnames';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@/components/common/Text';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/Popover';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/Avatar';
import { Skeleton } from '@/components/common/Skelton';
import { BookHeart, LucideIcon, User2 } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/recoil/authState/atom';
import { useToast } from '@/hooks/common/useToast';
import { diaryState } from '@/recoil/diaryState/atom';
import { useUser } from '@/hooks/queries/useUser';
import { useQueryClient } from 'react-query';

export const Navigation = () => {
  const [links] = useState<
    Array<{ name: string; href: string; icon: LucideIcon; selected: boolean }>
  >([
    { name: '日記', href: '/top', icon: BookHeart, selected: true },
    { name: '講師', href: '', icon: User2, selected: false },
  ]);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const setAccessToken = useSetRecoilState(authState.accessToken);
  const setSelectedDiary = useSetRecoilState(diaryState.selectedDiary);
  const navigate = useNavigate();
  const { data: user } = useUser();

  const onLogout = () => {
    queryClient.invalidateQueries();
    setAccessToken(null);
    setSelectedDiary(null);
    toast('success', 'ログアウトしました');
    navigate('/');
  };
  return (
    <nav className="w-16 h-full bg-primary flex flex-col items-center justify-between pt-6 pb-20 max-md:hidden">
      <div className="flex flex-col gap-2 space-y-1">
        {links.map((link) => (
          <Link
            to={link.href}
            key={link.name}
            className={cn(
              link.selected && 'bg-primary-hover',
              'group w-16 py-2 flex flex-col gap-2 items-center',
            )}
          >
            <link.icon
              strokeWidth={link.selected ? 1.5 : 1}
              className="w-6 h-6 text-white group-hover:scale-125 duration-75"
            />
            <Text className={cn('text-xs text-white group-hover:scale-105')}>
              {link.name}
            </Text>
          </Link>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="hover:scale-110 duration-75">
            <AvatarImage src={user?.imageSrc ?? undefined} />
            <AvatarFallback>
              <Skeleton className="w-10 h-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="right"
          sideOffset={10}
          onClick={onLogout}
          className="cursor-pointer"
        >
          ログアウト
        </PopoverContent>
      </Popover>
    </nav>
  );
};
