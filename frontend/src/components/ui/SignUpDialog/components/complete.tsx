import { buttonVariants } from '@/components/common/Button';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { cn } from '@/utils/classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Complete = () => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsComplete(true);
    }, 2000); // チェックマークのアニメーション完了後1秒待機

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-72">
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 16,
            }}
          >
            <Check size={80} color="green" strokeWidth={5} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <Heading as="h2" className="text-primary mb-4">
              Congulaturation
            </Heading>
            <Text className="leading-6">
              あなたのメンバー登録が完了しました！
              <br />
              いますぐログインして、英日記を書いていきましょう！
            </Text>
            <Link to="/top" className={cn(buttonVariants(), 'mt-6')}>
              閉じる
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
