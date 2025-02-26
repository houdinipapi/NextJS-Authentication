import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Nav";
import AuthProvider from "./(components)/AuthProvider";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthJs",
  description: "Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <AuthProvider>
        <body className={raleway.className}>
          <div className="bg-gray-100">
            <Navbar />
            
            <div className="m-2">
              {children}
            </div>
          
          </div>
          
        </body>
      </AuthProvider>
    </html>
  );
}
