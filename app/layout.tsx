import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sintonize TDAH - Organize sua mente, conquiste seu dia",
  description:
    "O sistema feito por e para quem tem TDAH. Gestão de tempo, foco e métodos práticos para uma vida mais leve. Conheça o Tedhy!",
  keywords: [
    "TDAH",
    "gestão de tempo",
    "produtividade",
    "foco",
    "neurodivergente",
    "Sintonize TDAH",
  ],
  openGraph: {
    title: "Sintonize TDAH",
    description:
      "Organize sua mente, conquiste seu dia. O sistema feito para quem tem TDAH.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
