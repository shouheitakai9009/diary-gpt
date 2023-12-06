import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/LandingPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from './components/theme-provider';
import { TopPage } from './features/TopPage';
import { useToast } from './hooks/common/useToast';
import { AxiosError } from 'axios';
import { PrivateLayout } from './components/layout/private';

function App() {
  const { toast } = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
      },
      mutations: {
        onError: (err) => {
          if (err instanceof AxiosError) {
            toast('error', `${err.response?.data.message}`);
          }
        },
      },
    },
  });
  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<LandingPage />} />
              <Route element={<PrivateLayout />}>
                <Route path="/top" index element={<TopPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          {import.meta.env.DEV && <ReactQueryDevtools />}
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
