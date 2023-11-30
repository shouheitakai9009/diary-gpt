import { motion } from 'framer-motion';
import { Disc3 } from 'lucide-react';
import { Text } from '../Text';
import { cn } from '@/utils/classnames';
import { PropsWithChildren } from 'react';

interface Props
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  size: 'fit' | 'full';
  overlayClassName?: string;
  iconClassName?: string;
  textClassName?: string;
}

export const Spinner = ({
  size = 'fit',
  children,
  overlayClassName,
  iconClassName,
  textClassName,
  ...props
}: Props) => {
  const isFull = size === 'full';
  return (
    <div
      {...props}
      className={cn(
        'backdrop-blur-md bg-white/70 z-50 flex items-center justify-center',
        isFull && 'flex-col fixed w-[100vw] h-[100vh]',
        !isFull && 'absolute w-full h-full',
        overlayClassName,
      )}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          type: 'spring',
          duration: 1,
          stiffness: 200,
          damping: 10,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <Disc3
          size={isFull ? 100 : 30}
          strokeWidth={2}
          className={cn(iconClassName)}
        />
      </motion.div>
      <Text
        className={cn(
          isFull && 'text-xl mt-4 font-bold tracking-tighter',
          !isFull && 'text-sm font-semibold ml-2',
          textClassName,
        )}
      >
        {children ?? 'Now Loading...'}
      </Text>
    </div>
  );
};
