import { Badge } from '@/components/common/Badge';
import { Heading } from '@/components/common/Heading';
import { Input } from '@/components/common/Input';
import { Separator } from '@/components/common/Separator';
import { cn } from '@/utils/classnames';
import { Link } from 'react-router-dom';
import { Text } from '@/components/common/Text';

export const Diaries = () => {
  return (
    <section className="w-64 h-full overflow-y-scroll border-r block max-md:hidden">
      <Input className="mx-auto w-60 mt-4" placeholder="単語やタイトルで検索" />
      <div className="px-2 py-4">
        {Array(20)
          .fill('')
          .map((_, index) => (
            <>
              <Link
                to="/"
                key={index}
                className={cn(
                  index === 0 && 'bg-border',
                  'w-full block px-4 py-4 rounded-lg hover:bg-border duration-75',
                )}
              >
                <Heading
                  as="h4"
                  className="leading-tight tracking-normal font-bold mb-2"
                >
                  Went to a shopping mole with my family
                </Heading>
                <Text className="text-gray-600 text-xs tracking-wider">
                  2023年11月19日
                </Text>
                <div>
                  <Badge variant="secondary">下書き</Badge>
                </div>
              </Link>
              <Separator />
            </>
          ))}
      </div>
    </section>
  );
};
