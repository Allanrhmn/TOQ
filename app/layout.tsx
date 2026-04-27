import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ChatAssistant } from "@/components/ai/ChatAssistant";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CREAT | Premium Streetwear & Accessories",
  description: "Exclusive limited edition streetwear and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <ChatAssistant />
      </body>
    </html>
  );
}
