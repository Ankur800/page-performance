import { Inter } from 'next/font/google';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PageSpeed from '@/features/layouts/PageSpeed';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
    },
});

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <main
                className={`flex min-h-screen w-full flex-col items-center pt-8 ${inter.className}`}
            >
                <PageSpeed />
            </main>
        </ThemeProvider>
    );
}
