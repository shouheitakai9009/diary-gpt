import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Separator } from '@/components/common/Separator';
import { Skeleton } from '@/components/common/Skelton';
import { Text } from '@/components/common/Text';
import { useFetchChats } from '@/hooks/queries/chat/useFetch';
import { chatState } from '@/recoil/chatState/atom';
import { diaryState } from '@/recoil/diaryState/atom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { useRecoilValue } from 'recoil';

const MessageFromAI = ({
  message,
  isLoading,
}: {
  message?: string;
  isLoading?: boolean;
}) => {
  return (
    <motion.div className="flex justify-start mb-2">
      <div className="max-w-[90%]">
        <p className="bg-border rounded-lg px-3 py-2 text-sm">
          {isLoading ? (
            <div>
              <Skeleton className="w-60 h-3 mb-1" />
              <Skeleton className="w-48 h-3 mb-1" />
              <Skeleton className="w-32 h-3 mb-1" />
            </div>
          ) : (
            message
          )}
        </p>
      </div>
    </motion.div>
  );
};

const MessageFromYou = ({ message }: { message: string }) => {
  return (
    <motion.div className="flex justify-end mb-2">
      <div className="max-w-[80%]">
        <p className="rounded-lg bg-gradient-to-tr from-primary to-destructive px-3 py-2 text-sm text-white">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export const Chat = () => {
  const selectedDiary = useRecoilValue(diaryState.selectedDiary);
  const { data } = useFetchChats(selectedDiary?.id);
  const isLoadingOfFirstFeedback = useRecoilValue(
    chatState.isLoadingOfFirstFeedback,
  );

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
          <AnimatePresence>
            {isLoadingOfFirstFeedback && <MessageFromAI isLoading />}
            {data?.map((feedback) =>
              feedback.isMe ? (
                <MessageFromYou message={feedback.content} />
              ) : (
                <MessageFromAI message={feedback.content} />
              ),
            )}
          </AnimatePresence>
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
