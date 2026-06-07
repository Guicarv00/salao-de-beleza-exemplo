export interface Service {
  id: string;
  name: string;
  category: 'Cabelo' | 'Cores' | 'Estética' | 'Maquiagem';
  price: number;
  duration: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface BentoElement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  size: 'small' | 'large' | 'medium';
  icon: string;
  image?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'corte-fem',
    name: 'Corte Design Feminino',
    category: 'Cabelo',
    price: 180,
    duration: '60 min',
    description: 'Corte personalizado alinhado ao visagismo facial, incluindo lavagem terapêutica com massagem capilar e finalização escovada.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'luzes-alta',
    name: 'Mechas & Luzes de Alta Costura',
    category: 'Cores',
    price: 580,
    duration: '240 min',
    description: 'Técnica exclusiva de iluminação que preserva a saúde dos fios. Inclui tratamento reconstrutor pós-química.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'terapia-ker',
    name: 'Terapia reconstrutora Kérastase',
    category: 'Cabelo',
    price: 320,
    duration: '90 min',
    description: 'Diagnóstico capilar avançado seguido de infusão profunda de nutrientes e selagem protetora térmica.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'coloracao-prem',
    name: 'Coloração Premium Orgânica',
    category: 'Cores',
    price: 260,
    duration: '120 min',
    description: 'Coloração sem amônia formulada com óleos essenciais, brilho radiante de longa duração e cobertura 100% dos fios brancos.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'design-sobr',
    name: 'Design de Sobrancelho + Brow Lamination',
    category: 'Estética',
    price: 150,
    duration: '50 min',
    description: 'Mapeamento geométrico facial para harmonização do olhar e técnica de alinhamento temporário dos fios.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pedicure-spa',
    name: 'Spa dos Pés & Manicure de Luxo',
    category: 'Estética',
    price: 130,
    duration: '80 min',
    description: 'Esfoliação de damasco, escalda-pés com sais minerais e massagem drenante com esmaltação premium de longa duração.',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'makeup-soc',
    name: 'Maquiagem Social Lumière',
    category: 'Maquiagem',
    price: 290,
    duration: '90 min',
    description: 'Maquiagem de alta durabilidade e acabamento fotográfico com marcas de prestígio internacional.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'progressiva-org',
    name: 'Escova Progressiva Orgânica',
    category: 'Cabelo',
    price: 450,
    duration: '180 min',
    description: 'Alinhamento térmico capilar de alta performance à base de ácidos orgânicos e queratina, garantindo liso natural e sedoso.',
    image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=600&q=80'
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Sofia Marinho',
    role: 'Co-Founder & Hair Director',
    bio: 'Especialista em visagismo e cortes sculpt. Com mais de 12 anos de carreira, formou-se em academias em Paris e Londres.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    specialty: 'Cortes Geométricos & Visagismo'
  },
  {
    name: 'Isabella Alencar',
    role: 'Colorista Master',
    bio: 'Referência em loiros saudáveis, morenas iluminadas e colorimetria avançada. Cria paletas de cor exclusivas para cada tom de pele.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    specialty: 'Mechas & Loiros de Luxo'
  },
  {
    name: 'Arthur Valente',
    role: 'Hairstylist & Penteados de Gala',
    bio: 'Especialista em tratamentos capilares profundos e penteados artísticos. Assina a beleza de grandes marcas e editoriais.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Terapia Capilar & Penteados'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dep-1',
    name: 'Mariana Drummond',
    role: 'Advogada',
    text: 'O atendimento personalizado faz toda diferença. A Sofia entendeu perfeitamente a minha rotina e desenhou um corte sofisticado que exige pouca manutenção. Lumière é puro refúgio de autocuidado.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: 'Membro desde 2023'
  },
  {
    id: 'dep-2',
    name: 'Patrícia Villanova',
    role: 'Arquiteta & Designer',
    text: 'Fiz minhas mechas com a Isabella e o resultado foi fantástico. Meu cabelo manteve a hidratação e o tom de dourado ficou super natural. O café gourmet e os mimos do espaço transformam o dia.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'Membro desde 2024'
  },
  {
    id: 'dep-3',
    name: 'Beatriz Vasconcellos',
    role: 'Empresária',
    text: 'Lugar impecável! Faço manicure de luxo e massagem facial semanalmente. Recomendo o agendamento fácil do WhatsApp, o atendimento responde muito rápido com as melhores opções de horário.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    date: 'Membro desde 2022'
  }
];

export const BENTO_DIFFERENTIALS: BentoElement[] = [
  {
    id: 'diff-1',
    title: 'Atendimento de Alta Costura',
    subtitle: 'PERSONALIZAÇÃO TOTAL',
    description: 'Entendemos o seu estilo de vida, estrutura de fios e preferências de beleza antes do primeiro corte ou pigmentação.',
    badge: 'Foco em Você',
    size: 'large',
    icon: 'user-check',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'diff-2',
    title: 'Produtos de Elite',
    subtitle: 'NÃO COMPROMETEMOS QUALIDADE',
    description: 'Formulados com queratinas de alta integridade, extratos orgânicos livres de formol, metais ou silicones pesados.',
    badge: 'Linhas Internacionais',
    size: 'medium',
    icon: 'sparkles'
  },
  {
    id: 'diff-3',
    title: 'Ambiente Sob Medida',
    subtitle: 'SEU SANTUÁRIO EXCLUSIVO',
    description: 'Um verdadeiro oásis urbano com cabines individuais, poltronas relaxantes com massagem integrada e bar de drinks.',
    badge: 'Bem-estar',
    size: 'medium',
    icon: 'sunset'
  },
  {
    id: 'diff-4',
    title: 'Sinergia de Serviços',
    subtitle: 'TUDO EM UM SÓ LUGAR',
    description: 'Do cabelo impecável ao design de sobrancelhas e unhas de luxo. Ganhe praticidade máxima com múltiplos serviços simultâneos.',
    badge: 'Eficiência de Tempo',
    size: 'large',
    icon: 'layers',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  }
];
