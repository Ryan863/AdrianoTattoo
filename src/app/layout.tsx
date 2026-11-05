import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title:
    "Adriano Tattoo | Estúdio de Tatuagem Preto e Cinza em Francisco Beltrão - PR",
  description:
    "Transformando histórias e ideias em arte de alto padrão na pele. Especialista em estilo Preto e Cinza (Black and Grey), projetos autorais e coberturas com hora marcada no Centro de Francisco Beltrão - PR.",
  keywords: [
    "Adriano Tattoo",
    "Tatuagem Francisco Beltrão",
    "Tatuagem Preto e Cinza",
    "Black and Grey Tattoo",
    "Estúdio de Tatuagem Centro Francisco Beltrão",
    "Cover-up Tatuagem",
    "Tatuador Francisco Beltrão PR",
  ],
  authors: [{ name: "Adriano Tattoo" }],
  creator: "Adriano Tattoo",
  openGraph: {
    title:
      "Adriano Tattoo | Estúdio de Tatuagem Preto e Cinza em Francisco Beltrão - PR",
    description:
      "Arte exclusiva e maestria no preto e cinza. Projetos autorais desenvolvidos com rigor técnico, traços precisos e atendimento exclusivo no coração de Francisco Beltrão.",
    type: "website",
    locale: "pt_BR",
    siteName: "Adriano Tattoo",
    images: [
      {
        url: "/images/hero-desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Interior do Ateliê Adriano Tattoo no Centro de Francisco Beltrão - PR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Adriano Tattoo | Estúdio de Tatuagem Preto e Cinza em Francisco Beltrão - PR",
    description:
      "Especialidade consolidada em projetos no estilo preto e cinza (black and grey) de alto realismo e contraste no Centro de Francisco Beltrão.",
    images: ["/images/hero-desktop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://adrianotattoo.com.br/#localbusiness",
  name: "Adriano Tattoo",
  description:
    "Estúdio de Tatuagem Artística com foco em Estilo Preto e Cinza (Black and Grey), projetos autorais exclusivos e reformas (Cover-up) no Centro de Francisco Beltrão - PR.",
  image: "/images/hero-desktop.jpg",
  telephone: "+5546988002365",
  priceRange: "$$",
  paymentAccepted:
    "Cartão de Crédito, Cartão de Débito, Pagamento por Aproximação (NFC)",
  currenciesAccepted: "BRL",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Júlio Assis Cavalheiro, 360 - Sala 04, Centro",
    addressLocality: "Francisco Beltrão",
    addressRegion: "PR",
    postalCode: "85601-000",
    addressCountry: "BR",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "48",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} dark`}>
      <body className="bg-[#09090B] text-[#E4E4E7] antialiased selection:bg-[#E4E4E7] selection:text-[#09090B]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
          }}
        />
        {/* Camada de Granulação Cinematográfica (SVG Noise 0.03) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
