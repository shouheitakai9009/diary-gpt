import { ToastOptions, TypeOptions, toast as toastify } from 'react-toastify';

export const useToast = () => {
  const toast = (
    type: TypeOptions,
    message: string,
    options?: ToastOptions,
  ) => {
    toastify(message, {
      type,
      position: 'bottom-right',
      ...options,
    });
  };

  return {
    toast,
  };
};
