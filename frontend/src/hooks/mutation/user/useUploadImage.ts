import { useMutation } from 'react-query';
import { useAxiosWrapper } from '@/apis/useAxiosWrapper';

type UploadImageReqParams = { file: File; userId: number };
type UploadImageResponse = { accessToken: string };

export const useUploadImage = () => {
  const { api } = useAxiosWrapper();

  return useMutation({
    mutationFn: async (params: UploadImageReqParams) => {
      const formData = new FormData();
      formData.append('file', params.file);
      const response = await api.post<UploadImageResponse>(
        `/upload/user-image/${params.userId}}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      return response.data;
    },
  });
};
