import { cn } from '@/utils/classnames';
import { PropsWithChildren } from 'react';

interface TypographyProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>> {
  isLink?: boolean;
}
export const Text = ({
  isLink = false,
  children,
  className,
  ...props
}: TypographyProps) => {
  return (
    <p
      className={cn(
        isLink ? '!text-primary underline' : 'text-secondary-foreground',
        'text-sm leading-7 break-all',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
