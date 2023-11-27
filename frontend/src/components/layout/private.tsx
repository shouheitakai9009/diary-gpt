import { useUser } from '@/hooks/queries/useUser';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateLayout = () => {
  const { data: user, isSuccess, isLoading } = useUser();

  if (isLoading) {
    // ローディング中の表示
    return <div>ロード中...</div>;
  }

  if (!isSuccess || !user) {
    // ユーザーデータがない場合、ログインページへリダイレクト
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
