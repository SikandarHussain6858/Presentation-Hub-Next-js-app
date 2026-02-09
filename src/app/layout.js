import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeedbackModal from "../components/FeedbackModal";
import { Toaster } from 'react-hot-toast';
import SessionProvider from './SessionProvider';

export const metadata = {
  metadataBase: new URL('https://presentation-hub.vercel.app'), // Replace with your actual domain
  title: {
    default: "Presentation Hub - Simplify Classroom Presentations",
    template: "%s | Presentation Hub"
  },
  description: "Seamlessly upload, manage, and present your university work with our secure 6-digit code system. No flash drives, no login hassles—just present.",
  keywords: ["presentation", "classroom", "university", "slides", "upload", "share", "secure", "student", "teacher"],
  authors: [{ name: "Presentation Hub Team" }],
  creator: "Presentation Hub Team",
  publisher: "Presentation Hub",
  openGraph: {
    title: "Presentation Hub - Simplify Classroom Presentations",
    description: "Seamlessly upload, manage, and present your university work with our secure 6-digit code system.",
    url: 'https://presentation-hub.vercel.app',
    siteName: 'Presentation Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Presentation Hub - Simplify Classroom Presentations",
    description: "Seamlessly upload, manage, and present your university work with our secure 6-digit code system.",
    creator: "@presentationhub",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
          <FeedbackModal /> {/* Added FeedbackModal component */}
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
