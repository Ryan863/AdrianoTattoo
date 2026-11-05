"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MessageCircle,
  Star,
  Sparkles,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Clock,
  MapPin,
  Navigation,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Compass,
  Award,
  CheckCircle2,
  Layers,
  PenTool,
  RefreshCw,
  Eye,
  Calendar,
  Menu,
  X,
  Phone,
  Lock,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ==========================================================================
   1. CONSTANTES TIPADAS DE DADOS DO ESTÚDIO (BRIEFING OFICIAL)
   ========================================================================== */

interface StudioInfo {
  readonly name: string;
  readonly tagline: string;
  readonly niche: string;
  readonly promise: string;
  readonly phoneDisplay: string;
  readonly phoneRaw: string;
  readonly whatsappDefaultUrl: string;
  readonly whatsappPortfolioUrl: string;
  readonly address: {
    readonly street: string;
    readonly room: string;
    readonly district: string;
    readonly city: string;
    readonly state: string;
    readonly full: string;
    readonly googleMapsDirectionsUrl: string;
    readonly wazeUrl: string;
  };
  readonly rating: {
    readonly score: string;
    readonly label: string;
  };
}

interface NavItem {
  readonly label: string;
  readonly href: string;
}

interface CredibilityBadge {
  readonly id: string;
  readonly label: string;
  readonly highlight: string;
  readonly icon: "star" | "sparkles" | "nfc";
}

interface TechniquePillar {
  readonly index: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly metric: string;
}

interface ServiceBentoItem {
  readonly id: string;
  readonly number: string;
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly technicalNote: string;
  readonly colSpanClass: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly whatsappText: string;
  readonly iconName: "layers" | "pentool" | "refresh" | "compass";
}

interface BiosafetyItem {
  readonly title: string;
  readonly description: string;
  readonly badge: string;
}

interface ProcessStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

interface ScheduleRow {
  readonly days: string;
  readonly hours: string;
  readonly isOpenDay: boolean;
}

interface PaymentMethodItem {
  readonly title: string;
  readonly subtitle: string;
  readonly tag: string;
}

const WHATSAPP_BASE = "https://wa.me/5546988002365";

function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

const STUDIO_DATA: StudioInfo = {
  name: "Adriano Tattoo",
  tagline: "FINE ART & BLACK AND GREY • CENTRO",
  niche:
    "Estúdio de Tatuagem Artística, Foco em Estilo Preto e Cinza (Black and Grey)",
  promise:
    "Transformar histórias e ideias em arte de alto padrão na pele, com traços precisos, atendimento exclusivo e total segurança no Centro de Francisco Beltrão.",
  phoneDisplay: "+55 (46) 98800-2365",
  phoneRaw: "+5546988002365",
  whatsappDefaultUrl:
    "https://wa.me/5546988002365?text=Ol%C3%A1%2C+visitei+o+site+do+Adriano+Tattoo+e+gostaria+de+conversar+sobre+um+or%C3%A7amento+para+minha+pr%C3%B3xima+tatuagem.",
  whatsappPortfolioUrl: buildWhatsAppUrl(
    "Olá, visitei o site do Adriano Tattoo e gostaria de receber o portfólio atualizado de projetos em Preto e Cinza e conversar sobre uma ideia."
  ),
  address: {
    street: "Av. Júlio Assis Cavalheiro, 360",
    room: "Sala 04",
    district: "Centro",
    city: "Francisco Beltrão",
    state: "PR",
    full: "Av. Júlio Assis Cavalheiro, 360 - Sala 04, Centro, Francisco Beltrão - PR",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Av.+J%C3%BAlio+Assis+Cavalheiro,+360+-+Sala+04+-+Centro,+Francisco+Beltr%C3%A3o+-+PR",
    wazeUrl:
      "https://waze.com/ul?q=Av.%20J%C3%BAlio%20Assis%20Cavalheiro%2C%20360%20Francisco%20Beltr%C3%A3o%20PR&navigate=yes",
  },
  rating: {
    score: "5.0",
    label: "Nota Máxima no Google",
  },
};

const NAV_LINKS: readonly NavItem[] = [
  { label: "Especialidade", href: "#especialidade" },
  { label: "Portfólio & Estilos", href: "#portfolio" },
  { label: "O Ateliê", href: "#sobre" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Localização", href: "#localizacao" },
];

const HERO_BADGES: readonly CredibilityBadge[] = [
  {
    id: "rating",
    highlight: "★ 5.0",
    label: "de Avaliação no Google",
    icon: "star",
  },
  {
    id: "specialty",
    highlight: "Especialista",
    label: "em Black and Grey",
    icon: "sparkles",
  },
  {
    id: "payment",
    highlight: "Aceita Cartões",
    label: "Crédito, Débito e NFC",
    icon: "nfc",
  },
];

const BLACK_GREY_PILLARS: readonly TechniquePillar[] = [
  {
    index: "01",
    title: "Gradientes Tonais & Sumi Wash",
    subtitle: "Transições aveludadas do preto sólido ao cinza translúcido",
    description:
      "O domínio das diluições de pigmento preto permite construir volumes tridimensionais, texturas orgânicas e profundidade fotográfica sem depender de saturação artificial.",
    metric: "Contraste Atemporal",
  },
  {
    index: "02",
    title: "Longevidade e Leitura na Pele",
    subtitle: "Arquitetura de luz negativa pensada para décadas",
    description:
      "Tatuagens em preto e cinza bem estruturadas envelhecem com nobreza. Reservamos áreas estratégicas de pele limpa (respiro de luz) para que o desenho mantenha nitidez ao longo dos anos.",
    metric: "Estabilidade Dérmica",
  },
  {
    index: "03",
    title: "Anatomia & Fluxo Muscular",
    subtitle: "Direção de arte desenhada para o movimento do corpo",
    description:
      "Nenhum estêncil é aplicado de forma genérica. Cada composição respeita as linhas de tensão, curvaturas e proporções do seu corpo para criar uma peça que parece pertencer à pele.",
    metric: "Encaixe Sob Medida",
  },
];

const SERVICES_BENTO: readonly ServiceBentoItem[] = [
  {
    id: "black-and-grey",
    number: "01",
    tag: "CARRO-CHEFE DO ATELIÊ",
    title: "Tatuagens Estilo Preto e Cinza (Black and Grey)",
    description:
      "Nossa especialidade consolidada. Projetos de alto realismo, micro-realismo, composições esculturais e sombreamento denso executados com transições suaves, preto profundo e pontos de luz cirúrgicos.",
    technicalNote:
      "Ideal para fechamentos de braço, antebraço, costas, peito e peças de destaque com profundidade cinematográfica.",
    colSpanClass: "lg:col-span-7",
    image: "/images/detail-needle.jpg",
    imageAlt:
      "Execução de tatuagem autoral em preto e cinza com luvas pretas e equipamento de precisão no estúdio Adriano Tattoo",
    whatsappText:
      "Olá Adriano! Visitei o site e gostaria de orçar um projeto no estilo Preto e Cinza (Black and Grey).",
    iconName: "layers",
  },
  {
    id: "custom-design",
    number: "02",
    tag: "CRIAÇÃO EXCLUSIVA",
    title: "Projetos Artísticos Customizados e Autorais",
    description:
      "Sua história traduzida em uma obra única. Desenvolvemos a composição do zero a partir das suas referências, garantindo que você jamais encontre a mesma arte repetida em outra pele.",
    technicalNote:
      "Inclui estudo de referências, montagem exclusiva e ajuste de proporção direto na anatomia do cliente.",
    colSpanClass: "lg:col-span-5",
    image: "/images/detail-blackgrey.jpg",
    imageAlt:
      "Tatuagem autoral em preto e cinza cicatrizada com sombreamento fino e geometria orgânica",
    whatsappText:
      "Olá Adriano! Visitei o site e quero desenvolver um Projeto Artístico Customizado e Autoral.",
    iconName: "pentool",
  },
  {
    id: "cover-up",
    number: "03",
    tag: "RENOVAÇÃO ESTRATÉGICA",
    title: "Reformas e Coberturas de Tatuagens (Cover-up)",
    description:
      "Transformamos trabalhos antigos, desbotados ou indesejados em uma nova obra de alto padrão. Utilizamos o jogo de sombras densas e texturas do preto e cinza para neutralizar o traço anterior com inteligência artística.",
    technicalNote:
      "Avaliação técnica prévia pelo WhatsApp ou presencial na Sala 04 para mapear pigmento antigo e dimensões.",
    colSpanClass: "lg:col-span-5",
    image: "/images/detail-atelier.jpg",
    imageAlt:
      "Mesa de criação e estudo artístico para reformas e coberturas no ateliê Adriano Tattoo",
    whatsappText:
      "Olá Adriano! Visitei o site e gostaria de avaliar uma Reforma ou Cobertura de Tatuagem (Cover-up).",
    iconName: "refresh",
  },
  {
    id: "art-direction",
    number: "04",
    tag: "PLANEJAMENTO & CURADORIA",
    title: "Consultoria de Criação e Direção de Arte para Pele",
    description:
      "Não tem certeza de como conectar várias ideias ou iniciar um fechamento completo? Orientamos a escolha de escala, contraste, posicionamento anatômico e cronograma de sessões antes do primeiro traço.",
    technicalNote:
      "Atendimento consultivo com hora marcada no Centro de Francisco Beltrão para máxima segurança na sua decisão.",
    colSpanClass: "lg:col-span-7",
    whatsappText:
      "Olá Adriano! Visitei o site e gostaria de agendar uma Consultoria de Criação e Direção de Arte para minha próxima tatuagem.",
    iconName: "compass",
  },
];

const BIOSAFETY_PROTOCOLS: readonly BiosafetyItem[] = [
  {
    badge: "PROTOCOLO 100% ESTÉRIL",
    title: "Materiais Descartáveis de Uso Único",
    description:
      "Cartuchos de agulhas esterilizados individualmente por óxido de etileno, abertos na sua presença momentos antes do início da sessão, juntamente com biqueiras, tintas fracionadas e barreiras protetoras.",
  },
  {
    badge: "SALA PRIVATIVA 04",
    title: "Atendimento Exclusivo com Hora Marcada",
    description:
      "Sem recepção lotada ou interrupções externas. O horário agendado é 100% dedicado ao seu projeto, proporcionando privacidade, silêncio criativo e controle rigoroso de assepsia.",
  },
  {
    badge: "ACABAMENTO & CICATRIZAÇÃO",
    title: "Pigmentos de Alta Pureza e Suporte Pós-Sessão",
    description:
      "Trabalhamos exclusivamente com insumos regulamentados pela ANVISA de altíssima fixação dérmica e acompanhamos todas as etapas da sua cicatrização pelo WhatsApp.",
  },
];

const ATELIER_PROCESS: readonly ProcessStep[] = [
  {
    step: "ETAPA 01",
    title: "Alinhamento & Orçamento via WhatsApp",
    description:
      "Você envia sua ideia, referências visuais, região do corpo e tamanho aproximado em centímetros para receber uma análise técnica ágil.",
  },
  {
    step: "ETAPA 02",
    title: "Direção de Arte & Estudo Anatômico",
    description:
      "Criamos a composição exclusiva em preto e cinza, ajustando luz, sombra e escala diretamente para a sua anatomia antes de iniciar.",
  },
  {
    step: "ETAPA 03",
    title: "Sessão Exclusiva no Centro",
    description:
      "Execução com hora marcada na Av. Júlio Assis Cavalheiro, 360 - Sala 04, em ambiente climatizado, seguro e focado nos mínimos detalhes.",
  },
];

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "orcamento",
    question: "Como faço para solicitar um orçamento para a minha tatuagem?",
    answer:
      "Os orçamentos são realizados de forma prática e direta pelo nosso WhatsApp oficial no número +55 (46) 98800-2365. Para agilizar o seu atendimento, basta clicar em qualquer botão de orçamento desta página e informar: 1) A ideia ou estilo que deseja (ex.: Preto e Cinza, Autoral ou Cobertura), 2) O local exato do corpo, 3) O tamanho aproximado em centímetros e, se tiver, 1 ou 2 imagens de referência.",
  },
  {
    id: "pagamentos",
    question: "Quais as formas de pagamento aceitas no estúdio?",
    answer:
      "O estúdio conta com infraestrutura completa de pagamento para sua comodidade: aceitamos Cartões de Crédito, Cartões de Débito e Pagamentos por Aproximação (tecnologia NFC diretamente pelo seu telemóvel/smartphone ou smartwatch), além de Pix.",
  },
  {
    id: "horario",
    question: "Qual é o horário de funcionamento do estúdio?",
    answer:
      "Atendemos de Segunda a Sexta-feira, das 09h às 18h, na Av. Júlio Assis Cavalheiro, 360 - Sala 04, no Centro de Francisco Beltrão - PR. Aos sábados e domingos o estúdio permanece fechado.",
  },
  {
    id: "agendamento",
    question: "É necessário agendar horário com antecedência?",
    answer:
      "Sim. Trabalhamos exclusivamente com hora marcada para garantir total personalização em cada projeto de tatuagem, rigor absoluto na preparação estéril da bancada e privacidade completa durante a sua sessão. Chame no WhatsApp para consultar a disponibilidade da agenda.",
  },
];

const SCHEDULE_ROWS: readonly ScheduleRow[] = [
  {
    days: "Segunda-feira",
    hours: "09h00 às 18h00",
    isOpenDay: true,
  },
  {
    days: "Terça-feira",
    hours: "09h00 às 18h00",
    isOpenDay: true,
  },
  {
    days: "Quarta-feira",
    hours: "09h00 às 18h00",
    isOpenDay: true,
  },
  {
    days: "Quinta-feira",
    hours: "09h00 às 18h00",
    isOpenDay: true,
  },
  {
    days: "Sexta-feira",
    hours: "09h00 às 18h00",
    isOpenDay: true,
  },
  {
    days: "Sábados e Domingos",
    hours: "Fechado (Ateliê Reservado)",
    isOpenDay: false,
  },
];

const PAYMENT_METHODS: readonly PaymentMethodItem[] = [
  {
    title: "Pagamentos por Aproximação (NFC)",
    subtitle: "Apple Pay, Google Pay, Samsung Pay via telemóvel ou smartwatch",
    tag: "CONTACTLESS NFC",
  },
  {
    title: "Cartões de Crédito",
    subtitle: "Principais bandeiras com leitura imediata no estúdio",
    tag: "CRÉDITO",
  },
  {
    title: "Cartões de Débito",
    subtitle: "Pagamento ágil e seguro presencialmente na Sala 04",
    tag: "DÉBITO",
  },
];

/* ==========================================================================
   2. SUBCOMPONENTES INTERATIVOS DE ALTA PERFORMANCE
   ========================================================================== */

function ServiceIcon({ name }: { readonly name: ServiceBentoItem["iconName"] }) {
  const iconClass = "w-5 h-5 text-zinc-200 stroke-[1.8]";
  switch (name) {
    case "layers":
      return <Layers className={iconClass} aria-hidden="true" />;
    case "pentool":
      return <PenTool className={iconClass} aria-hidden="true" />;
    case "refresh":
      return <RefreshCw className={iconClass} aria-hidden="true" />;
    case "compass":
      return <Compass className={iconClass} aria-hidden="true" />;
  }
}

function BentoServiceCard({ item }: { readonly item: ServiceBentoItem }) {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`gsap-bento-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#121215]/90 backdrop-blur-sm transition-colors duration-300 hover:border-zinc-400/30 ${item.colSpanClass}`}
    >
      {/* Spotlight Radial Metálico em Prata/Zinco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(520px circle at ${mousePos.x}px ${mousePos.y}px, rgba(228, 228, 231, 0.07), transparent 45%)`,
        }}
      />

      {/* Imagem Editorial Monocromática (quando presente) */}
      {item.image && (
        <div className="relative h-52 sm:h-60 w-full overflow-hidden border-b border-white/10 bg-zinc-950">
          <img
            src={item.image}
            alt={item.imageAlt || item.title}
            width={800}
            height={480}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center grayscale contrast-125 brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-gradient-to-t from-[#121215] via-[#121215]/45 to-transparent
            "
          />
          <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950/85 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-200 backdrop-blur-md">
              {item.tag}
            </span>
            <span className="font-mono text-xs tabular-nums tracking-widest text-zinc-400 bg-zinc-950/75 px-2.5 py-1 rounded-md border border-white/10">
              {item.number} / 04
            </span>
          </div>
        </div>
      )}

      {/* Conteúdo Editorial do Card */}
      <div className="relative z-20 flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          {!item.image && (
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-200">
                {item.tag}
              </span>
              <span className="font-mono text-xs tabular-nums tracking-widest text-zinc-500">
                {item.number} / 04
              </span>
            </div>
          )}

          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <ServiceIcon name={item.iconName} />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-syne)] text-xl sm:text-2xl font-bold tracking-tight text-[#FAFAFA] text-balance">
                {item.title}
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
            {item.description}
          </p>

          <div className="mt-5 rounded-xl border border-white/[0.07] bg-zinc-950/60 px-4 py-3">
            <p className="text-xs leading-relaxed text-zinc-400">
              <span className="font-semibold text-zinc-200">Nota Técnica: </span>
              {item.technicalNote}
            </p>
          </div>
        </div>

        {/* Rodapé do Card com CTA Contextual */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">
            Atendimento Individualizado
          </span>
          <a
            href={buildWhatsAppUrl(item.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/30 bg-zinc-100 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-white hover:shadow-[0_0_25px_rgba(250,250,250,0.2)] active:scale-[0.99] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
            <span>Orçar este estilo</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   3. PÁGINA PRINCIPAL (ADRIANO TATTOO - LANDING PAGE HIGH-END)
   ========================================================================== */

export default function AdrianoTattooLandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  // Monitora scroll para ativar a camada translúcida refinada da Navbar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o drawer mobile ao pressionar ESC e trava o scroll do body quando aberto
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  // Padrão Técnico GSAP (Estabilidade Total com escopo e matchMedia para acessibilidade)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Revelação da Hero
        gsap.from(".gsap-hero-reveal", {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        // Seção Especialidade Preto e Cinza
        gsap.from(".gsap-specialty-item", {
          scrollTrigger: {
            trigger: "#especialidade",
            start: "top 88%",
            once: true,
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        // Cartões do Bento Grid
        gsap.from(".gsap-bento-card", {
          scrollTrigger: {
            trigger: "#portfolio",
            start: "top 88%",
            once: true,
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        // Seção Excelência e Biossegurança
        gsap.from(".gsap-biosafety-item", {
          scrollTrigger: {
            trigger: "#sobre",
            start: "top 88%",
            once: true,
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        // Seção FAQ
        gsap.from(".gsap-faq-item", {
          scrollTrigger: {
            trigger: "#faq",
            start: "top 88%",
            once: true,
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        // Seção Localização, Horários e Pagamentos
        gsap.from(".gsap-location-item", {
          scrollTrigger: {
            trigger: "#localizacao",
            start: "top 88%",
            once: true,
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".gsap-hero-reveal",
            ".gsap-specialty-item",
            ".gsap-bento-card",
            ".gsap-biosafety-item",
            ".gsap-faq-item",
            ".gsap-location-item",
          ],
          { opacity: 1, y: 0 }
        );
      });
    },
    { scope: mainRef }
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? "" : id));
  };

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#09090B] text-[#E4E4E7] relative selection:bg-zinc-200 selection:text-zinc-950"
    >
      {/* ====================================================================
          A. NAVBAR INTELIGENTE + MENU MOBILE NATIVO
          ==================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-zinc-950/90 border-b border-white/5 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.65)]"
            : "backdrop-blur-sm bg-zinc-950/60 border-b border-white/5 py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logótipo à esquerda */}
          <a
            href="#"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 rounded-lg"
          >
            <span className="font-[family-name:var(--font-syne)] text-lg sm:text-xl font-extrabold tracking-tight text-[#FAFAFA] transition-colors group-hover:text-zinc-200">
              ADRIANO TATTOO
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.22em] uppercase text-zinc-400">
              {STUDIO_DATA.tagline}
            </span>
          </a>

          {/* Menu Central para Desktop */}
          <nav
            aria-label="Navegação Principal"
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:text-[#FAFAFA] py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#FAFAFA] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Desktop + Botão Menu Mobile */}
          <div className="flex items-center gap-3">
            <a
              href={STUDIO_DATA.whatsappDefaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#FAFAFA] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#09090B] transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_0_24px_rgba(250,250,250,0.22)] active:scale-95"
            >
              <MessageCircle
                className="w-3.5 h-3.5 stroke-[2.2]"
                aria-hidden="true"
              />
              <span>Agendar Orçamento</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={
                mobileMenuOpen
                  ? "Fechar menu de navegação"
                  : "Abrir menu de navegação"
              }
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#121215] text-zinc-100 transition-colors hover:border-white/30 active:scale-95 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.8]" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.8]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Drawer Nativo Acessível Mobile */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Mobile Adriano Tattoo"
            className="lg:hidden fixed inset-x-0 top-[69px] bottom-0 z-50 bg-[#09090B]/98 backdrop-blur-xl border-t border-white/10 flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-4">
                Navegação do Estúdio
              </p>
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-[#121215] px-4 py-4 text-base font-[family-name:var(--font-syne)] font-bold text-[#FAFAFA] transition-colors hover:border-white/20"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-zinc-500 tabular-nums">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-[#121215] p-5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1.5 font-medium text-zinc-200">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.8]" aria-hidden="true" />
                  Centro • Francisco Beltrão, PR
                </span>
                <span className="tabular-nums font-semibold text-zinc-300">
                  ★ 5.0 Google
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Av. Júlio Assis Cavalheiro, 360 - Sala 04 • Segunda a Sexta, das
                09h às 18h.
              </p>
              <a
                href={STUDIO_DATA.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#FAFAFA] px-6 py-3.5 text-sm font-bold text-[#09090B] shadow-lg transition-transform active:scale-98"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                <span>Solicitar Orçamento no WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ====================================================================
            B. 1ª DOBRA: HERO SECTION CINEMATOGRÁFICA
            ==================================================================== */}
        <section
          aria-label="Apresentação Principal Adriano Tattoo"
          className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden border-b border-white/10"
        >
          {/* Fotografia Real do Estúdio em Tela Cheia (Mobile & Desktop das Imagens Oficiais) */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/images/hero-mobile.jpg"
              />
              <img
                src="/images/hero-desktop.jpg"
                alt="Ateliê Adriano Tattoo no Centro de Francisco Beltrão - Estúdio de tatuagem com iluminação dramática e poltrona preta de alto padrão"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-center scale-[1.01] contrast-[1.08] brightness-[0.82]"
              />
            </picture>

            {/* Proteção de Leitura: Duplo Gradiente Estratégico Obrigatório */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-transparent to-zinc-950/95"
            />
          </div>

          {/* Moldura Editorial Sutil (Inspirada na Direção de Arte da Imagem 2) */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/45 backdrop-blur-[2px] p-6 sm:p-10 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
              {/* Marcação Editorial Superior */}
              <div className="gsap-hero-reveal flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#121215]/90 px-3.5 py-1.5 backdrop-blur-md">
                  <span
                    className="h-2 w-2 rounded-full bg-zinc-100 animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-zinc-200">
                    ESTÚDIO DE TATUAGEM • CENTRO DE FRANCISCO BELTRÃO - PR
                  </span>
                </div>

                <span className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 tabular-nums">
                  <span>ATELIÊ SALA 04</span>
                  <span aria-hidden="true">•</span>
                  <span>BLACK &amp; GREY</span>
                </span>
              </div>

              <div className="max-w-3xl">
                {/* H1 com text-balance */}
                <h1 className="gsap-hero-reveal font-[family-name:var(--font-syne)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAFA] leading-[1.06] text-balance">
                  Arte exclusiva e maestria no preto e cinza.
                </h1>

                {/* Subheadline */}
                <p className="gsap-hero-reveal mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300 font-normal">
                  Projetos autorais e personalizados desenvolvidos com rigor
                  técnico, traços precisos e atendimento exclusivo no coração de
                  Francisco Beltrão.
                </p>

                {/* Ação Dupla (CRO) */}
                <div className="gsap-hero-reveal mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                  <a
                    href={STUDIO_DATA.whatsappDefaultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white bg-[#FAFAFA] px-7 py-4 text-sm sm:text-base font-bold text-[#09090B] shadow-[0_0_35px_rgba(250,250,250,0.2)] transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_0_45px_rgba(250,250,250,0.35)] active:scale-[0.99]"
                  >
                    <MessageCircle
                      className="w-5 h-5 stroke-[2.2] transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span>Solicitar Orçamento no WhatsApp</span>
                    <ArrowRight
                      className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>

                  <a
                    href="#especialidade"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-[#121215]/80 px-7 py-4 text-sm sm:text-base font-semibold text-[#FAFAFA] backdrop-blur-md transition-all duration-200 hover:border-white/50 hover:bg-white/10"
                  >
                    <span>Ver Especialidade</span>
                  </a>
                </div>
              </div>

              {/* Barra de Credibilidade na Hero */}
              <div className="gsap-hero-reveal mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {HERO_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121215]/85 px-4 py-3 backdrop-blur-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-100">
                      {badge.icon === "star" && (
                        <Star
                          className="w-4 h-4 fill-zinc-100 text-zinc-100 stroke-[1.8]"
                          aria-hidden="true"
                        />
                      )}
                      {badge.icon === "sparkles" && (
                        <Sparkles
                          className="w-4 h-4 text-zinc-100 stroke-[1.8]"
                          aria-hidden="true"
                        />
                      )}
                      {badge.icon === "nfc" && (
                        <Smartphone
                          className="w-4 h-4 text-zinc-100 stroke-[1.8]"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="text-xs sm:text-sm leading-snug tabular-nums">
                      <span className="font-bold text-[#FAFAFA]">
                        {badge.highlight}
                      </span>{" "}
                      <span className="text-zinc-300">{badge.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C.1 A ESPECIALIDADE: O PODER DO PRETO E CINZA (BLACK AND GREY)
            ==================================================================== */}
        <section
          id="especialidade"
          aria-labelledby="heading-especialidade"
          className="py-14 md:py-24 border-b border-white/10 relative overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Cabeçalho Editorial */}
            <div className="gsap-specialty-item grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  <span className="h-[1px] w-8 bg-zinc-500" aria-hidden="true" />
                  <span>01 • A ESPECIALIDADE DO ATELIÊ</span>
                </div>
                <h2
                  id="heading-especialidade"
                  className="font-[family-name:var(--font-syne)] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] text-balance"
                >
                  O Poder do Preto e Cinza: contraste, profundidade e permanência.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  Muito além de uma escolha estética, o estilo{" "}
                  <strong className="font-semibold text-[#FAFAFA]">
                    Black and Grey
                  </strong>{" "}
                  é a expressão máxima do desenho clássico aplicado à pele. No
                  Adriano Tattoo, cada projeto é construído através do equilíbrio
                  entre pretos aveludados, transições suaves de cinza e o uso
                  cirúrgico da iluminação natural da pele.
                </p>
              </div>
            </div>

            {/* Composição Visual + 3 Pilares Técnicos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Painel Fotográfico Monocromático de Alto Contraste */}
              <div className="gsap-specialty-item lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121215] overflow-hidden">
                <div className="relative h-72 sm:h-80 lg:h-full min-h-[320px] w-full overflow-hidden bg-zinc-950">
                  <img
                    src="/images/detail-needle.jpg"
                    alt="Detalhe de precisão da agulha e sombreamento preto e cinza no estúdio Adriano Tattoo"
                    width={900}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center grayscale contrast-125 brightness-90"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/30 to-transparent"
                  />
                  <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-zinc-950/85 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1 tabular-nums">
                      <span className="uppercase tracking-[0.16em] font-semibold text-zinc-200">
                        Rigor Técnico na Pele
                      </span>
                      <span>FRANCISCO BELTRÃO • PR</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Traços firmes e sombreamento em camadas que preservam a
                      definição e o alto contraste mesmo após anos de
                      cicatrização.
                    </p>
                  </div>
                </div>
              </div>

              {/* Três Pilares Editoriais do Preto e Cinza */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                {BLACK_GREY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="gsap-specialty-item group rounded-2xl border border-white/10 bg-[#121215]/90 p-6 sm:p-7 backdrop-blur-sm transition-colors duration-300 hover:border-zinc-400/30"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold tabular-nums tracking-widest text-zinc-950 bg-zinc-200 px-2.5 py-1 rounded">
                          {pillar.index}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-zinc-300">
                        {pillar.metric}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-syne)] text-lg sm:text-xl font-bold text-[#FAFAFA]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C.2 CARDÁPIO DE SERVIÇOS & ESTILOS (BENTO GRID EDITORIAL)
            ==================================================================== */}
        <section
          id="portfolio"
          aria-labelledby="heading-portfolio"
          className="py-14 md:py-24 border-b border-white/10 relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  <span className="h-[1px] w-8 bg-zinc-500" aria-hidden="true" />
                  <span>02 • ESTILOS &amp; DIREÇÃO ARTÍSTICA</span>
                </div>
                <h2
                  id="heading-portfolio"
                  className="font-[family-name:var(--font-syne)] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] text-balance"
                >
                  Projetos desenvolvidos exclusivamente para a sua história.
                </h2>
              </div>
              <p className="max-w-md text-sm sm:text-base text-zinc-300 leading-relaxed">
                Selecione a modalidade desejada para iniciar uma conversa direta
                com Adriano no WhatsApp com mensagem pré-formatada.
              </p>
            </div>

            {/* Bento Grid Editorial (4 Serviços do Briefing) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {SERVICES_BENTO.map((service) => (
                <BentoServiceCard key={service.id} item={service} />
              ))}
            </div>

            {/* Barra de Solicitação de Portfólio & Atualizações via WhatsApp Oficial */}
            <div className="gsap-bento-card mt-8 rounded-2xl border border-white/15 bg-gradient-to-r from-[#121215] via-[#18181c] to-[#121215] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[#FAFAFA]">
                  <Eye className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    CURADORIA DE PORTFÓLIO &amp; REDES OFICIAIS
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-syne)] text-lg sm:text-xl font-bold text-[#FAFAFA]">
                    Deseja ver trabalhos cicatrizados e vídeos recentes em Preto e
                    Cinza?
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-300 max-w-2xl leading-relaxed">
                    Solicite o portfólio completo e as atualizações mais recentes
                    diretamente pelo WhatsApp oficial do estúdio para receber
                    referências alinhadas à região do corpo que você pretende
                    tatuar.
                  </p>
                </div>
              </div>

              <a
                href={STUDIO_DATA.whatsappPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/[0.08] px-6 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-all duration-200 hover:bg-[#FAFAFA] hover:text-[#09090B]"
              >
                <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                <span>Solicitar Portfólio no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C.3 COMPROMISSO COM A EXCELÊNCIA, PROCESSO E BIOSSEGURANÇA
            ==================================================================== */}
        <section
          id="sobre"
          aria-labelledby="heading-sobre"
          className="py-14 md:py-24 border-b border-white/10 relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="gsap-biosafety-item grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  <span className="h-[1px] w-8 bg-zinc-500" aria-hidden="true" />
                  <span>03 • AUTORIDADE ARTÍSTICA &amp; BIOSSEGURANÇA</span>
                </div>
                <h2
                  id="heading-sobre"
                  className="font-[family-name:var(--font-syne)] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] text-balance"
                >
                  Rigor hospitalar, ambiente reservado e nota máxima 5.0 estrelas.
                </h2>
              </div>

              {/* Selo de Prova Social e Autoridade */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#121215] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-1.5 text-zinc-100">
                    <Star
                      className="w-4 h-4 fill-zinc-100 text-zinc-100"
                      aria-hidden="true"
                    />
                    <Star
                      className="w-4 h-4 fill-zinc-100 text-zinc-100"
                      aria-hidden="true"
                    />
                    <Star
                      className="w-4 h-4 fill-zinc-100 text-zinc-100"
                      aria-hidden="true"
                    />
                    <Star
                      className="w-4 h-4 fill-zinc-100 text-zinc-100"
                      aria-hidden="true"
                    />
                    <Star
                      className="w-4 h-4 fill-zinc-100 text-zinc-100"
                      aria-hidden="true"
                    />
                    <span className="ml-2 font-mono text-sm font-bold text-[#FAFAFA] tabular-nums">
                      5.0 / 5.0
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                    Excelência Comprovada
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Reconhecido com avaliação máxima pelos clientes em Francisco
                  Beltrão pela precisão no traço preto e cinza, pontualidade no
                  atendimento com hora marcada e cuidado rigoroso do decalque à
                  cicatrização.
                </p>
              </div>
            </div>

            {/* Cards de Biossegurança */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BIOSAFETY_PROTOCOLS.map((protocol, index) => (
                <div
                  key={protocol.title}
                  className="gsap-biosafety-item rounded-2xl border border-white/10 bg-[#121215]/90 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-300">
                        {protocol.badge}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-200">
                        {index === 0 && (
                          <ShieldCheck
                            className="w-5 h-5 stroke-[1.8]"
                            aria-hidden="true"
                          />
                        )}
                        {index === 1 && (
                          <Lock
                            className="w-5 h-5 stroke-[1.8]"
                            aria-hidden="true"
                          />
                        )}
                        {index === 2 && (
                          <Award
                            className="w-5 h-5 stroke-[1.8]"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>

                    <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#FAFAFA]">
                      {protocol.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {protocol.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2
                      className="w-4 h-4 text-zinc-200 stroke-[1.8]"
                      aria-hidden="true"
                    />
                    <span>Padrão rigoroso em todas as sessões</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Linha do Tempo do Processo de Atendimento */}
            <div className="gsap-biosafety-item mt-8 rounded-2xl border border-white/10 bg-[#121215]/60 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-white/10">
                <h3 className="font-[family-name:var(--font-syne)] text-lg sm:text-xl font-bold text-[#FAFAFA]">
                  Como funciona a sua experiência no Adriano Tattoo
                </h3>
                <span className="text-xs uppercase tracking-[0.16em] text-zinc-400">
                  Atendimento com Hora Marcada • Sala 04
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ATELIER_PROCESS.map((item) => (
                  <div key={item.step} className="relative">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 tabular-nums">
                      {item.step}
                    </span>
                    <h4 className="mt-2 font-[family-name:var(--font-syne)] text-base sm:text-lg font-bold text-[#FAFAFA]">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C.4 FAQ ESTRUTURADO (ACCORDION ACESSÍVEL)
            ==================================================================== */}
        <section
          id="faq"
          aria-labelledby="heading-faq"
          className="py-14 md:py-24 border-b border-white/10 relative"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="gsap-faq-item text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                <span>04 • PERGUNTAS FREQUENTES</span>
              </div>
              <h2
                id="heading-faq"
                className="font-[family-name:var(--font-syne)] text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] text-balance"
              >
                Transparência antes do primeiro traço.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-300">
                Tire suas principais dúvidas sobre orçamentos, agendamentos,
                horários e formas de pagamento.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqId === faq.id;
                const contentId = `faq-panel-${faq.id}`;
                const triggerId = `faq-trigger-${faq.id}`;

                return (
                  <div
                    key={faq.id}
                    className={`gsap-faq-item rounded-2xl border transition-colors duration-200 ${
                      isOpen
                        ? "border-white/25 bg-[#121215]"
                        : "border-white/10 bg-[#121215]/70 hover:border-white/20"
                    }`}
                  >
                    <h3>
                      <button
                        id={triggerId}
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 rounded-2xl"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="font-mono text-xs text-zinc-500 tabular-nums">
                            0{idx + 1}
                          </span>
                          <span className="font-[family-name:var(--font-syne)] text-base sm:text-lg font-bold text-[#FAFAFA]">
                            {faq.question}
                          </span>
                        </div>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-zinc-950 text-zinc-200 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <ChevronDown
                            className="w-4 h-4 stroke-[2]"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={contentId}
                        role="region"
                        aria-labelledby={triggerId}
                        className="px-5 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-white/5"
                      >
                        <p className="text-sm sm:text-base leading-relaxed text-zinc-300 tabular-nums">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            C.5 LOCALIZAÇÃO, HORÁRIOS & PAGAMENTOS (CARD SPLIT DE ALTO PADRÃO)
            ==================================================================== */}
        <section
          id="localizacao"
          aria-labelledby="heading-localizacao"
          className="py-14 md:py-24 border-b border-white/10 relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="gsap-location-item mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                <span className="h-[1px] w-8 bg-zinc-500" aria-hidden="true" />
                <span>05 • LOCALIZAÇÃO, HORÁRIOS &amp; PAGAMENTOS</span>
              </div>
              <h2
                id="heading-localizacao"
                className="font-[family-name:var(--font-syne)] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA] text-balance"
              >
                No coração do Centro de Francisco Beltrão.
              </h2>
            </div>

            {/* Card Split de Alto Padrão */}
            <div className="gsap-location-item grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/10 bg-[#121215] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.65)]">
              {/* Coluna Esquerda: Endereço + Rotas GPS + Mapa Editorial */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-200">
                    <MapPin className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
                    ENDEREÇO OFICIAL DO ATELIÊ
                  </span>

                  <h3 className="mt-5 font-[family-name:var(--font-syne)] text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                    {STUDIO_DATA.name}
                  </h3>

                  <address className="mt-3 not-italic text-base sm:text-lg text-zinc-200 leading-relaxed tabular-nums">
                    <strong className="font-semibold text-[#FAFAFA]">
                      Av. Júlio Assis Cavalheiro, 360 - Sala 04
                    </strong>
                    <br />
                    Centro, Francisco Beltrão - PR
                    <br />
                    <span className="text-sm text-zinc-400">
                      CEP 85601-000 • Atendimento exclusivo com hora marcada
                    </span>
                  </address>

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm tabular-nums text-zinc-300">
                    <Phone
                      className="w-4 h-4 text-zinc-100 shrink-0 stroke-[1.8]"
                      aria-hidden="true"
                    />
                    <span>WhatsApp Oficial: </span>
                    <a
                      href={STUDIO_DATA.whatsappDefaultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#FAFAFA] underline decoration-white/30 underline-offset-4 hover:decoration-white"
                    >
                      {STUDIO_DATA.phoneDisplay}
                    </a>
                  </div>

                  {/* Botões Funcionais de Rota Direta (Google Maps / Waze) */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={STUDIO_DATA.address.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#FAFAFA] px-5 py-3.5 text-xs sm:text-sm font-bold text-[#09090B] transition-all hover:bg-zinc-200 active:scale-98"
                    >
                      <Navigation
                        className="w-4 h-4 stroke-[2.2]"
                        aria-hidden="true"
                      />
                      <span>Traçar Rota no Google Maps</span>
                    </a>

                    <a
                      href={STUDIO_DATA.address.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-zinc-950 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#FAFAFA] transition-colors hover:border-white/40 hover:bg-white/[0.06]"
                    >
                      <Compass className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                      <span>Abrir Rota no Waze</span>
                    </a>
                  </div>
                </div>

                {/* Mapa Integrado do Centro de Francisco Beltrão */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 h-56 relative">
                  <iframe
                    title="Mapa de Localização do Adriano Tattoo na Av. Júlio Assis Cavalheiro, 360 - Centro, Francisco Beltrão - PR"
                    src="https://www.google.com/maps?q=Av.+J%C3%BAlio+Assis+Cavalheiro,+360,+Centro,+Francisco+Beltr%C3%A3o+-+PR&output=embed"
                    className="h-full w-full border-0 grayscale contrast-125 invert-[0.9] opacity-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Coluna Direita: Tabela Clara de Horários + Selo de Formas de Pagamento */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-[#121215]/60">
                {/* Bloco de Horários com tabular-nums */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-200">
                      <Clock className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
                      HORÁRIO DE ATENDIMENTO
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                      <Calendar
                        className="w-3.5 h-3.5 stroke-[1.8]"
                        aria-hidden="true"
                      />
                      Sob Agendamento
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-950/75 overflow-hidden">
                    <div className="divide-y divide-white/10 tabular-nums">
                      {SCHEDULE_ROWS.map((row) => (
                        <div
                          key={row.days}
                          className="flex items-center justify-between px-4 py-3.5 sm:px-5 text-sm"
                        >
                          <span
                            className={`font-medium ${
                              row.isOpenDay ? "text-zinc-200" : "text-zinc-500"
                            }`}
                          >
                            {row.days}
                          </span>
                          <span
                            className={`font-mono text-xs sm:text-sm font-semibold ${
                              row.isOpenDay
                                ? "text-[#FAFAFA]"
                                : "text-zinc-500"
                            }`}
                          >
                            {row.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selo Visível das Formas de Pagamento (Crédito, Débito e NFC) */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
                      <CreditCard
                        className="w-4 h-4 text-zinc-100 stroke-[1.8]"
                        aria-hidden="true"
                      />
                      INFRAESTRUTURA DE PAGAMENTOS ACEITOS
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-200">
                      NFC ATIVO
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.title}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3.5"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-[#FAFAFA]">
                            {method.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {method.subtitle}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-200">
                          {method.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          C.6 FOOTER DE FECHAMENTO DE ALTA CONVERSÃO
          ==================================================================== */}
      <footer className="relative overflow-hidden bg-[#09090B] pt-16 pb-24 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Card Monumental de Fechamento CRO */}
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#121215] to-[#09090B] p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[32rem] rounded-full bg-white/[0.06] blur-3xl"
            />

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              ADRIANO TATTOO • FRANCISCO BELTRÃO, PR
            </span>

            <h2 className="mt-6 mx-auto max-w-3xl font-[family-name:var(--font-syne)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAFA] text-balance">
              Transforme sua pele em uma obra de arte.
            </h2>

            <p className="mt-4 mx-auto max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed">
              Conte sua ideia, envie suas referências e agende sua sessão
              exclusiva no estilo Preto e Cinza diretamente pelo WhatsApp.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={STUDIO_DATA.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#FAFAFA] px-8 py-4 text-sm sm:text-base font-bold text-[#09090B] shadow-[0_0_40px_rgba(250,250,250,0.25)] transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_0_55px_rgba(250,250,250,0.4)] active:scale-98"
              >
                <MessageCircle
                  className="w-5 h-5 stroke-[2.2]"
                  aria-hidden="true"
                />
                <span>Iniciar Orçamento no WhatsApp</span>
                <ArrowUpRight
                  className="w-5 h-5 stroke-[2.2]"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 tabular-nums">
              <span>★ 5.0 no Google</span>
              <span aria-hidden="true">•</span>
              <span>Av. Júlio Assis Cavalheiro, 360 - Sala 04, Centro</span>
              <span aria-hidden="true">•</span>
              <span>Seg a Sex: 09h às 18h</span>
            </div>
          </div>

          {/* Créditos e Informações Finais */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 tabular-nums">
            <div>
              <span className="font-bold text-zinc-300">ADRIANO TATTOO</span> —
              Estúdio de Tatuagem Artística Black &amp; Grey • Francisco Beltrão
              - PR.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#especialidade"
                className="hover:text-zinc-300 transition-colors"
              >
                Especialidade
              </a>
              <a
                href="#portfolio"
                className="hover:text-zinc-300 transition-colors"
              >
                Estilos
              </a>
              <a
                href="#localizacao"
                className="hover:text-zinc-300 transition-colors"
              >
                Localização
              </a>
              <a
                href={STUDIO_DATA.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 font-semibold hover:text-white transition-colors"
              >
                WhatsApp: {STUDIO_DATA.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          BOTÃO FLUTUANTE DE WHATSAPP (INSPIRADO NA REFERÊNCIA EDITORIAL + CRO)
          ==================================================================== */}
      <aside
        aria-label="Atendimento Rápido via WhatsApp"
        className="fixed bottom-5 right-5 z-40"
      >
        <a
          href={STUDIO_DATA.whatsappDefaultUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar com Adriano Tattoo no WhatsApp sobre orçamento"
          className="group relative flex items-center gap-2.5 rounded-full border border-white/25 bg-[#121215]/95 p-3.5 sm:px-5 sm:py-3 text-[#FAFAFA] shadow-[0_12px_35px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-[#FAFAFA] hover:text-[#09090B] active:scale-95"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white group-hover:bg-zinc-950" />
          </span>
          <MessageCircle className="w-5 h-5 stroke-[2]" aria-hidden="true" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.14em]">
            Orçamento WhatsApp
          </span>
        </a>
      </aside>
    </div>
  );
}
