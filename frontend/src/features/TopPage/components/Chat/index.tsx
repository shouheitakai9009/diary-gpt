import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Separator } from '@/components/common/Separator';
import { Text } from '@/components/common/Text';
import { Send } from 'lucide-react';

export const Chat = () => {
  return (
    <section className="h-full border-l px-2 pb-4 flex flex-col justify-between max-sm:hidden">
      <div>
        <div className="flex items-center h-14">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src="https://pbs.twimg.com/profile_images/1691382408292294656/YA9KjsEx_400x400.jpg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <Text className="text-lg font-bold">Emily</Text>
          <div className="ml-2">
            <Badge>カジュアル</Badge>
            <Badge variant="secondary">女性</Badge>
          </div>
        </div>
        <Separator />
        <section className="py-4">
          <div className="flex justify-start mb-2">
            <div className="max-w-[90%]">
              <p className="bg-border rounded-lg px-3 py-2 text-sm">
                Sure, I'll draft a text based on the title "Went to a shopping
                mall with my family". Here it is:
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-2">
            <div className="max-w-[80%]">
              <p className="rounded-lg bg-gradient-to-tr from-primary to-destructive px-3 py-2 text-sm text-white">
                Sure, I'll draft a text based on the title "Went to a shopping
                mall with my family". Here it is:
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="flex gap-2">
        <Input placeholder="Emilyに質問" />
        <Button size="icon">
          <Send strokeWidth={2} size={16} />
        </Button>
      </section>
    </section>
  );
};
