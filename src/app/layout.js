import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import SessionProvider from './SessionProvider';

export const metadata = {
  title: "Presentation Hub",
  description: "Simplify your university presentations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 300px)' }}>
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
