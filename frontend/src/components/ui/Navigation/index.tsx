import { cn } from '@/utils/classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export const Navigation = () => {
  const [links] = useState<
    Array<{ name: string; href: string; icon: LucideIcon; selected: boolean }>
  >([
    { name: '英日記', href: '/top', icon: BookHeart, selected: true },
    { name: 'AI講師', href: '', icon: User2, selected: false },
  ]);
  return (
    <nav className="w-20 h-full bg-primary flex flex-col items-center justify-between pt-6 pb-20 max-md:hidden">
      <div className="flex flex-col gap-2 space-y-1">
        {links.map((link) => (
          <Link
            to={link.href}
            key={link.name}
            className={cn(
              link.selected && 'bg-primary-hover',
              'group w-20 py-3 flex flex-col gap-2 items-center',
            )}
          >
            <link.icon
              strokeWidth={link.selected ? 1.5 : 1}
              className="w-8 h-8 text-white group-hover:scale-125 duration-75"
            />
            <Text
              className={cn(
                link.selected && 'font-bold',
                'text-xs text-white group-hover:scale-105',
              )}
            >
              {link.name}
            </Text>
          </Link>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="hover:scale-110 duration-75">
            <AvatarImage src="https://pbs.twimg.com/profile_images/1691382408292294656/YA9KjsEx_400x400.jpg" />
            <AvatarFallback>
              <Skeleton className="w-10 h-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end" side="right" sideOffset={10}>
          tst
        </PopoverContent>
      </Popover>
    </nav>
  );
};
