import React, { useState, useEffect } from 'react';
import { 
  motion 
} from 'motion/react';
import { 
  Sparkles, 
  UserCheck, 
  Sunset, 
  Layers, 
  Clock, 
  ArrowRight, 
  Phone, 
  Menu, 
  X, 
  Star, 
  Award, 
  Check, 
  CheckCircle, 
  Scissors, 
  Compass, 
  Gift, 
  MapPin, 
  Calendar, 
  ChevronRight,
  ChevronLeft,
  DollarSign
} from 'lucide-react';
import { 
  SERVICES, 
  TEAM, 
  TESTIMONIALS, 
  BENTO_DIFFERENTIALS, 
  Service, 
  TeamMember, 
  Testimonial 
} from './data';

export default function App() {
  // Navigation & Category States
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Cabelo' | 'Cores' | 'Estética' | 'Maquiagem'>('Todos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Booking Sheet / Planner States
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  // Styling Diagnostic Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<any | null>(null);

  // Testimonials slider index
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  // Success state for copy share or demo agendamento
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Scroll detection for glassy navbar transition
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick helper to scroll to section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Filter service items
  const filteredServices = activeCategory === 'Todos' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  // Toggle selection of service in planar
  const toggleServiceInPlanner = (service: Service) => {
    setSelectedServices(prev => {
      const alreadySelected = prev.some(s => s.id === service.id);
      if (alreadySelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
    // Open planner peek automatically
    setIsPlannerOpen(true);
  };

  const totalCalculatedPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);
  const totalCalculatedDuration = selectedServices.reduce((acc, s) => {
    const mins = parseInt(s.duration.split(' ')[0]) || 0;
    return acc + mins;
  }, 0);

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins > 0 ? `${hrs}h ${remMins}min` : `${hrs}h`;
  };

  // Core Diagnostic Quiz Questions
  const QUIZ_QUESTIONS = [
    {
      question: 'Qual é o seu principal objetivo com o cabelo atualmente?',
      options: [
        { label: 'Recuperar fios ressecados e elásticos', value: 'reconstrucao' },
        { label: 'Clareamento saudável (Loiro/Morena iluminada)', value: 'mechas' },
        { label: 'Brilho radiante, maciez e vitalidade no dia a dia', value: 'nutricao' },
        { label: 'Alinhamento natural e controle de frizz duradouro', value: 'alinhamento' }
      ]
    },
    {
      question: 'Como você sente a porosidade ou textura atual do seu fio?',
      options: [
        { label: 'Quebradiço, poroso ou enfraquecido por químicas anteriores', value: 'quimica_dano' },
        { label: 'Áspero nas pontas, opaco e difícil de pentear', value: 'desidratado' },
        { label: 'Oleoso na raiz e com pontas finas/desidratadas', value: 'misto' },
        { label: 'Saudável, mas gostaria de blindar contra agressões', value: 'resistente' }
      ]
    },
    {
      question: 'Com que frequência você expõe seu cabelo ao calor (secador, chapinha ou babyliss)?',
      options: [
        { label: 'Quase todos os dias (alta agressão térmica)', value: 'calor_alto' },
        { label: 'De 2 a 3 vezes por semana', value: 'calor_medio' },
        { label: 'Raramente ou apenas em ocasiões especiais', value: 'calor_baixo' },
        { label: 'Nunca uso fontes de calor', value: 'calor_nenhum' }
      ]
    }
  ];

  // Submit diagnostic quiz answers and analyze
  const handleQuizAnswerSubmit = (optionValue: string) => {
    const updatedAnswers = [...quizAnswers, optionValue];
    setQuizAnswers(updatedAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // Analyze results based on dominant answers
      // If client chose reconstruction or chemical damage pathway
      const isReconstructiveNeeded = updatedAnswers.includes('reconstrucao') || updatedAnswers.includes('quimica_dano');
      const isMechasWanted = updatedAnswers.includes('mechas');
      const isAlinhamentoWanted = updatedAnswers.includes('alinhamento');

      let solution = {
        name: 'Terapia Crono-Nutritiva L\'Essence',
        subtitle: 'Tratamento de Regeneração de Fios Opacos',
        description: 'Seu cabelo necessita de um banho profundo de óleos nobres e infusão de lipídios vegetais para reestruturar as pontas desidratadas e selar o frizz causado por calor intermediário.',
        duration: '90 min',
        suggestedPrice: 320,
        matchCode: 'CRONO',
        benefits: ['Recuperação instantânea do brilho tridimensional', 'Proteção ativa contra antioxidantes', 'Selagem térmica com óleo de Argan Premium'],
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
      };

      if (isReconstructiveNeeded) {
        solution = {
          name: 'Lumière Blonde & Protection Deluxe',
          subtitle: 'Reconstrução de Alta Performance Pós-Química',
          description: 'Diagnosticamos fragilidade estrutural severa pela presença de processos térmicos recorrentes ou descoloração. Recomendamos uma injeção de queratinas biocompatíveis e reequilíbrio imediato de pH capilar.',
          duration: '120 min',
          suggestedPrice: 450,
          matchCode: 'DELUXE_RECO',
          benefits: ['Blindagem de fios contra quebra involuntária (+92% resistência)', 'Equalização perfeita de pH e eliminação da elasticidade', 'Envelopamento molecular protetor de cutícula'],
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
        };
      } else if (isMechasWanted) {
        solution = {
          name: 'Mechas de Alta Costura + Blond Repair',
          subtitle: 'Iluminação Sob Medida com Tratamento S.O.S',
          description: 'A melhor rota para o loiro ou morena iluminada dos seus sonhos. Desenvolvemos o visagismo de cor com proteção plex integrada que mantém a massa capilar firme e protegida do pó descolorante.',
          duration: '240 min',
          suggestedPrice: 580,
          matchCode: 'MECHAS_SOS',
          benefits: ['Iluminação personalizada em véus com degradê suave', 'Proteção inteligente anti-rompimento durante o clareamento', 'Banho reconstrutor pós-coloração com ácido hialurônico'],
          image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'
        };
      } else if (isAlinhamentoWanted) {
        solution = {
          name: 'Alinhamento Progressivo Orgânico Lumière',
          subtitle: 'Liso Sedoso Natural Livre de Formol',
          description: 'Sua textura atual pede um relaxamento de escamas sem agressividade. Notre blend de ácidos orgânicos renova a queratina capilar sem cheiro e com brilho espelhado indescritível.',
          duration: '185 min',
          suggestedPrice: 450,
          matchCode: 'LISO_ORG',
          benefits: ['Efeito liso estético natural e extrema maciez ao toque', 'Livre de fumaça, ardência ou derivados nocivos', 'Ativação hidrofóbica com secagem super prática em casa'],
          image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=600&q=80'
        };
      }

      setQuizResult(solution);
    }
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  // Simulate WhatsApp booking dispatch with personalized text content
  const handleBookingConfirmDispatch = (textContext: string) => {
    setBookingSuccess(true);
    // Open whatsapp web dynamically
    const phone = '5511999999999'; // Placeholder premium phone
    const formattedText = encodeURIComponent(textContext);
    const url = `https://wa.me/${phone}?text=${formattedText}`;
    
    setTimeout(() => {
      window.open(url, '_blank', 'referrerPolicy=no-referrer');
      setBookingSuccess(false);
    }, 1500);
  };

  const getCustomWhatsAppTextFromPlanner = () => {
    const listString = selectedServices.map(s => `- ${s.name} (R$ ${s.price})`).join('%0A');
    return `Olá Lumière Studio! Gostaria de agendar um atendimento personalizado para os seguintes serviços que selecionei no site:%0A%0A${listString}%0A%0A*Total Estimado:* R$ ${totalCalculatedPrice}%0A*Tempo Estimado:* ${formatDuration(totalCalculatedDuration)}%0A%0APor favor, poderiam confirmar as datas disponíveis?`;
  };

  const getCustomWhatsAppTextFromQuiz = () => {
    if (!quizResult) return '';
    return `Olá Lumière! Fiz o diagnóstico online capilar no seu site e o plano recomendado foi o *${quizResult.name}* (R$ ${quizResult.suggestedPrice}). Gostaria de agendar uma avaliação cortesia para iniciar meu tratamento!`;
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FDFBF7] font-sans overflow-x-hidden selection:bg-luxury-gold/30 selection:text-[#FDFBF7]">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#050505] to-[#050505] pointer-events-none z-0" />
      <div className="absolute top-[80vh] left-[-20%] w-[60%] h-[50vh] bg-gold-900/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-[200vh] right-[-20%] w-[50%] h-[60vh] bg-gold-800/5 rounded-full filter blur-[130px] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-luxury-black/85 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-full border border-luxury-gold/60 flex items-center justify-center bg-luxury-black/80">
              <span className="font-serif italic font-semibold text-lg text-luxury-gold">L</span>
            </div>
            <div>
              <h1 className="font-display font-semibold tracking-[0.25em] text-lg text-luxury-cream">
                LUMIÈR<span className="text-luxury-gold">E</span>
              </h1>
              <p className="font-sans text-[8px] uppercase tracking-[0.4em] text-luxury-gold -mt-1 block">Studio de Beleza</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <button onClick={() => scrollToSection('diferenciais')} className="text-[#a8a8a8] hover:text-luxury-cream transition-colors relative group py-2">
              Diferenciais
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => scrollToSection('servicos')} className="text-[#a8a8a8] hover:text-luxury-cream transition-colors relative group py-2">
              Nossos Serviços
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => scrollToSection('calculadora')} className="text-[#a8a8a8] hover:text-luxury-cream transition-colors relative group py-2 flex items-center gap-1.5 bg-luxury-gold/5 px-2.5 py-1 rounded-full border border-luxury-gold/20 hover:bg-luxury-gold/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Monte Seu Plano
            </button>
            <button onClick={() => scrollToSection('diagnostic-quiz')} className="text-[#a8a8a8] hover:text-luxury-cream transition-colors relative group py-2">
              Diagnóstico Capilar
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => scrollToSection('artistas')} className="text-[#a8a8a8] hover:text-luxury-cream transition-colors relative group py-2">
              Especialistas
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-[#a8a8a8] hover:text-luxury-cream transition-colors relative group py-2">
              Depoimentos
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Call to action & Hamburger */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleBookingConfirmDispatch('Olá Lumière Studio! Gostaria de fazer um agendamento premium.')} 
              className="hidden lg:flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border border-luxury-gold/40 bg-luxury-black text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 rounded-none shadow-lg hover:shadow-luxury-gold/10"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Reservar Horário</span>
            </button>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-luxury-cream focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-luxury-black bg-opacity-98 flex flex-col justify-center px-10 space-y-8 pt-20"
        >
          <nav className="flex flex-col space-y-6 text-xl font-display font-medium">
            <button onClick={() => scrollToSection('diferenciais')} className="text-left text-[#c8c8c8] hover:text-luxury-gold py-2 border-b border-white/5">
              • Diferenciais
            </button>
            <button onClick={() => scrollToSection('servicos')} className="text-left text-[#c8c8c8] hover:text-luxury-gold py-2 border-b border-white/5">
              • Nossos Serviços
            </button>
            <button onClick={() => scrollToSection('calculadora')} className="text-left text-[#c8c8c8] hover:text-luxury-gold py-2 border-b border-white/5 flex items-center gap-2">
              • Planner de Atendimento <span className="text-[10px] bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full">Exclusivo</span>
            </button>
            <button onClick={() => scrollToSection('diagnostic-quiz')} className="text-left text-[#c8c8c8] hover:text-luxury-gold py-2 border-b border-white/5">
              • Diagnóstico Capilar
            </button>
            <button onClick={() => scrollToSection('artistas')} className="text-left text-[#c8c8c8] hover:text-luxury-gold py-2 border-b border-white/5">
              • Especialistas
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-left text-[#c8c8c8] hover:text-luxury-gold py-2 border-b border-white/5">
              • Depoimentos
            </button>
          </nav>

          <button 
            onClick={() => handleBookingConfirmDispatch('Olá Lumière Studio! Gostaria de fazer um agendamento premium.')} 
            className="w-full flex items-center justify-center space-x-2 py-4 text-sm font-semibold tracking-wider uppercase border border-luxury-gold/50 bg-luxury-gold text-luxury-black hover:bg-transparent hover:text-luxury-gold transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            <span>Agendar Agora pelo WhatsApp</span>
          </button>
        </motion.div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] md:min-h-screen flex items-center pt-24 md:pt-16 pb-12 overflow-hidden">
        {/* Parallax Hero Background Cover */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=82" 
            alt="Lumière Salon" 
            className="w-full h-full object-cover object-center opacity-30 select-none scale-105"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/90 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/95 to-luxury-black/60 md:hidden block" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 md:space-y-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-luxury-gold/10 border border-luxury-gold/30 px-3 py-1.5 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
              <span className="text-[10px] md:text-xs tracking-[0.15em] font-semibold uppercase text-luxury-gold leading-none">
                Atendimento de Luxo em São Paulo
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl lg:text-[72px] leading-[1.1] text-luxury-cream tracking-tight max-w-2xl"
              >
                Beleza que <br />
                <span className="italic font-normal gold-gradient text-glow">Lumina</span> de dentro para fora
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-lg text-[#ababab] max-w-xl font-light leading-relaxed"
              >
                O Lumière Studio proporciona atendimento de alta costura, profissionais internacionais e produtos de elite para traduzir a força da sua autoestima em um estilo inconfundível.
              </motion.p>
            </div>

            {/* Features snapshot badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 w-full max-w-md bg-white/2 pt-2 border-t border-white/5"
            >
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-xs text-[#d1d1d1]">Profissionais Internacionais</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-xs text-[#d1d1d1]">Kérastase & L'Oréal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-xs text-[#d1d1d1]">Cabines Privativas VIP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-xs text-[#d1d1d1]">Agendamento no Zap</span>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => handleBookingConfirmDispatch('Olá Lumière Studio! Gostaria de agendar um atendimento e conhecer mais sobre os seus serviços premium.')}
                className="relative group py-4 px-8 text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-luxury-gold to-[#a98f68] text-luxury-black transition-all duration-300 rounded-none overflow-hidden shadow-[0_10px_35px_rgba(197,168,128,0.2)] flex items-center justify-center space-x-2 active:scale-95"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>Conversar no WhatsApp</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('calculadora')}
                className="py-4 px-8 text-xs font-semibold tracking-widest uppercase border border-white/20 text-[#e6e6e6] hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 rounded-none bg-white/5 hover:bg-white/10 flex items-center justify-center space-x-2"
              >
                <span>Monte Seu Pacote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center space-x-3 text-xs text-[#8c8c8c]"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>4.9/5 estrelas no Google (1.200+ avaliações)</span>
            </motion.div>

          </div>

          {/* Right Hero Interactive Block (Quiz Callout) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 bg-luxury-card border border-white/5 rounded-none p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full filter blur-xl" />
            
            <div className="flex items-center space-x-2 text-luxury-gold">
              <Compass className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">Diagnóstico Cortesia</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-luxury-cream">Dúvidas no cronograma capilar?</h3>
              <p className="text-xs text-[#a0a0a0] leading-relaxed">
                Responda ao nosso questionário inteligente de 3 etapas e receba a recomendação ideal dos nossos estilistas diretamente para seu cabelo.
              </p>
            </div>

            <div className="bg-luxury-black/60 border border-white/5 p-4 rounded-none space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-[10px] text-luxury-gold font-bold">1</div>
                <span className="text-xs text-[#dfdfdf]">3 breves perguntas</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-[10px] text-luxury-gold font-bold">2</div>
                <span className="text-xs text-[#dfdfdf]">Análise avançada de fio e rotina</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-[10px] text-luxury-gold font-bold">3</div>
                <span className="text-xs text-[#dfdfdf]">Sugestão de plano + cupom de boas-vindas</span>
              </div>
            </div>

            <button 
              onClick={() => {
                scrollToSection('diagnostic-quiz');
                setShowQuiz(true);
              }}
              className="w-full py-3.5 bg-white/5 hover:bg-luxury-gold/15 text-xs text-luxury-cream hover:text-luxury-gold border border-white/10 hover:border-luxury-gold/50 transition-all duration-300 tracking-widest uppercase font-semibold flex items-center justify-center space-x-2"
            >
              <span>Descobrir Rota Ideal</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </motion.div>

        </div>
      </section>

      {/* AUTHORITY MARQUEE */}
      <section className="bg-[#0b0b0b] py-6 border-y border-white/5 relative z-10 overflow-hidden">
        <div className="flex w-full select-none">
          <div className="animate-marquee whitespace-nowrap text-xs tracking-[0.25em] font-light uppercase text-[#8a8a8a] flex items-center">
            
            {/* Repeated block to ensure seamless loop */}
            {[...Array(4)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <span className="mx-8 font-serif italic text-luxury-cream font-medium">Lumière Studio</span>
                <span className="mx-8 flex items-center text-[#555]"><Sparkles className="w-3.5 h-3.5 text-luxury-gold mr-2 inline" /> KÉRASTASE PARIS</span>
                <span className="mx-8 flex items-center text-[#555]"><Award className="w-3.5 h-3.5 text-luxury-gold mr-2 inline" /> 15.000+ CLIENTES SATISFEITOS</span>
                <span className="mx-8 flex items-center text-[#555]"><UserCheck className="w-3.5 h-3.5 text-luxury-gold mr-2 inline" /> ATENDIMENTO 1-ON-1</span>
                <span className="mx-8 flex items-center text-[#555]"><Sunset className="w-3.5 h-3.5 text-luxury-gold mr-2 inline" /> L'ORÉAL PROFESSIONNEL</span>
                <span className="mx-8 flex items-center text-[#555]"><Compass className="w-3.5 h-3.5 text-luxury-gold mr-2 inline" /> ESTILO E VISAGISMO</span>
                <span className="mx-8 flex items-center text-[#555]"><Layers className="w-3.5 h-3.5 text-luxury-gold mr-2 inline" /> PRODUTOS DE INTEGRIDADE</span>
              </React.Fragment>
            ))}

          </div>
        </div>
      </section>

      {/* DIFERENCIAIS SECTION (BENTO GRID) */}
      <section id="diferenciais" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header content section */}
        <div className="text-center md:text-left space-y-3 mb-16 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-luxury-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
            <span>O Jeito Lumière de Cuidar</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream leading-tight">
            Nossos diferenciais são construídos em volta do seu estilo e bem-estar
          </h2>
          <p className="text-[#a0a0a0] text-sm md:text-base font-light">
            Nosso salão se destaca pelo atendimento personalizado, profissionais qualificados, ambiente acolhedor, uso de produtos de alta qualidade e agendamento prático pelo WhatsApp.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: LARGE WIDTH (Spans 2 columns) */}
          <div className="md:col-span-2 group min-h-[300px] border border-white/5 bg-luxury-card rounded-none p-8 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-300 hover:border-luxury-gold/40">
            <div className="absolute top-0 right-0 w-[45%] h-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300 hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-card to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80" 
                alt="Individual styling consultation"
                className="w-full h-full object-cover object-left"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 max-w-sm sm:max-w-md relative z-20">
              <div className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-luxury-gold/15 text-luxury-gold">
                Foco em Você
              </div>
              <h3 className="font-serif text-2xl text-luxury-cream">Atendimento de Alta Costura</h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Nossos diferenciais começam no atendimento personalizado. Dedicamos tempo precioso para compreender o seu estilo de vida, preferências de rotina e saúde de cada fio antes de aplicar qualquer técnica. Cada cliente recebe uma experiência única e desenhada especialmente para si.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-luxury-gold pt-6 relative z-10 group-hover:translate-x-1 transition-transform">
              <span>Saber mais sobre o acolhimento Lumière</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: SMALL MEDIUM WIDTH (Spans 1 column) */}
          <div className="group border border-white/5 bg-luxury-card rounded-none p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-luxury-gold/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold border border-luxury-gold/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-luxury-gold/15 text-luxury-gold">
                Integridade no Cuidado
              </div>
              <h3 className="font-serif text-2xl text-luxury-cream">Sem Compromissos</h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Nossa prioridade máxima é trazer beleza com saúde. Por isso, trabalhamos apenas com as melhores linhas de cosméticos internacionais, livres de metais pesados, silicones oclusivos ou agentes nocivos à sua fibra capilar.
              </p>
            </div>

            <span className="text-xs text-[#808080] pt-6 group-hover:text-luxury-gold transition-colors block">
              Marcas: Kérastase, L'Oréal, Truss, Sebastian
            </span>
          </div>

          {/* Card 3: SMALL MEDIUM WIDTH (Spans 1 column) */}
          <div className="group border border-white/5 bg-luxury-card rounded-none p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-luxury-gold/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold border border-luxury-gold/20">
                <Sunset className="w-5 h-5" />
              </div>
              <div className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-luxury-gold/15 text-luxury-gold font-sans">
                Seu Refúgio Urbano
              </div>
              <h3 className="font-serif text-2xl text-luxury-cream">Ambiente Acolhedor</h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Cada segundo conosco deve ser repousante. Criamos um espaço minimalista, com acústica isolada de tráfegos urbanos, poltronas massageadoras de lavatório, aromas fitoterápicos desestressantes e mimos cortesia para transformar sua rotina em bem-estar.
              </p>
            </div>

            <span className="text-xs text-[#808080] pt-6 group-hover:text-luxury-gold transition-colors block">
              Bar de Drinks & Cafés Especiais inclusos
            </span>
          </div>

          {/* Card 4: LARGE WIDTH (Spans 2 columns) */}
          <div className="md:col-span-2 group min-h-[300px] border border-white/5 bg-luxury-card rounded-none p-8 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-300 hover:border-luxury-gold/40">
            <div className="absolute top-0 right-0 w-[45%] h-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300 hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-card to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80" 
                alt="Styling in synergy"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 max-w-sm sm:max-w-md relative z-20">
              <div className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-luxury-gold/15 text-luxury-gold">
                Eficiência & Conveniência
              </div>
              <h3 className="font-serif text-2xl text-luxury-cream">Sinergia Completa de Serviços</h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Oferecemos serviços completos de beleza em um só lugar. Você pode fazer escova orgânica, pedicure SPA, design de sobrancelhas e maquiagem com atendimento concomitante para otimizar ao máximo o seu tempo semanal, sempre cercada do maior luxo e atenção aos pormenores.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-luxury-gold pt-6 relative z-10 group-hover:translate-x-1 transition-transform">
              <span>Descubra a praticidade do nosso planejamento integrado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </section>

      {/* DETAILED SERVICES & PRICING WITH CATEGORY FILTERS */}
      <section id="servicos" className="py-24 bg-luxury-card border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-luxury-gold text-xs font-semibold uppercase tracking-widest">
                <Scissors className="w-4.5 h-4.5" />
                <span>Nosso Menu de Experiências</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream">A Alquimia dos Nossos Serviços</h2>
              <p className="text-neutral-400 text-sm max-w-xl">
                Navegue pelas nossas principais categorias de cuidado e estilo. Adicione serviços diretamente ao nosso planejador e estime valores e tempo de atendimento com agendamento instantâneo.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2 lg:border-none lg:pb-0">
              {(['Todos', 'Cabelo', 'Cores', 'Estética', 'Maquiagem'] as const).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-luxury-gold text-luxury-black font-semibold' 
                      : 'text-[#9c9c9c] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of filtered services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map(service => {
              const isSelected = selectedServices.some(s => s.id === service.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  key={service.id}
                  className="border border-white/5 bg-luxury-black p-5 flex flex-col justify-between hover:border-luxury-gold/30 transition-all duration-300 relative group"
                >
                  <div className="space-y-4">
                    {/* Service image with zoom effect */}
                    <div className="w-full h-40 overflow-hidden relative mb-4">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-luxury-black/80 backdrop-blur-sm text-[9px] uppercase tracking-wider text-luxury-gold px-2 py-0.5 border border-luxury-gold/20">
                        {service.category}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif text-[17px] font-medium text-luxury-cream group-hover:text-luxury-gold transition-colors line-clamp-1 tracking-wide leading-snug">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400/90 line-clamp-3 leading-relaxed min-h-[48px] font-sans font-light">
                        {service.description}
                      </p>
                    </div>

                    {/* Duration & Pricing block */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                      <div className="flex items-center space-x-1.5 text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="font-semibold text-luxury-cream">
                        R$ {service.price}
                      </div>
                    </div>
                  </div>

                  {/* Integrated dynamic planner click trigger */}
                  <button
                    onClick={() => toggleServiceInPlanner(service)}
                    className={`w-full mt-6 py-2.5 text-xs font-semibold tracking-wider uppercase border transition-all duration-300 ${
                      isSelected 
                        ? 'bg-amber-400/10 border-amber-400/40 text-amber-200' 
                        : 'border-white/10 hover:border-luxury-gold bg-[#0e0e0e] text-[#b8b8b8] hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Adicionado</span>
                      </span>
                    ) : (
                      <span>Adicionar ao Plano</span>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* QUICK PROMPT INJECTED FOR COMPLEMENTARY DISCOUNTS */}
          <div className="mt-12 bg-luxury-black border border-luxury-gold/15 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] text-luxury-gold font-bold uppercase tracking-widest bg-luxury-gold/10 px-2 py-1">Promoção de Inauguração</span>
              <h4 className="font-serif text-xl text-luxury-cream">Seja bem-vinda com 10% OFF cortesia</h4>
              <p className="text-xs text-neutral-400 max-w-xl">
                Faça o seu primeiro agendamento conosco hoje de qualquer serviço combinado e obtenha 10% de desconto de boas-vindas. Mimos exclusivos adicionados no seu dia de beleza!
              </p>
            </div>
            <button 
              onClick={() => handleBookingConfirmDispatch('Olá Lumière! Desejo agendar meu atendimento inaugural com o cupom de boas-vindas de 10%.')}
              className="px-6 py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase hover:bg-[#b0936b] transition-all duration-300 flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Garantir Desconto</span>
            </button>
          </div>

        </div>
      </section>

      {/* DYNAMIC CALCULATOR & SELECTION PLANNER (Ours exclusivity metric!) */}
      <section id="calculadora" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 text-luxury-gold text-xs font-semibold tracking-widest uppercase">
              <Calendar className="w-4 h-4 animate-bounce" />
              <span>Planejador Exclusivo</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream">Estime seu Dia de Beleza & Agende de Forma Inteligente</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Diferente de sistemas engessados, no Lumière você monta o seu próprio combo de tratamentos. Clique nos botões "Adicionar ao Plano" no menu acima para estimar em tempo real o tempo necessário no salão e o valor final.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center space-x-3.5 bg-luxury-card p-4 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-amber-400/5 text-amber-400 flex items-center justify-center text-xs">
                  ★
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-luxury-cream">Sem Fidelidade Oblígua</h4>
                  <p className="text-[11px] text-[#9c9c9c]">Mude, acrescente ou remova serviços à vontade no balcão.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 bg-luxury-card p-4 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-emerald-400/5 text-emerald-400 flex items-center justify-center text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-luxury-cream">Tratamento Concomitante</h4>
                  <p className="text-[11px] text-[#9c9c9c]">A depender do combo, múltiplos profissionais atuam simultaneamente.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-luxury-card border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-serif text-xl text-luxury-cream">Sua Seleção de Serviços</h3>
              <span className="text-xs text-luxury-gold font-mono">{selectedServices.length} {selectedServices.length === 1 ? 'item' : 'itens'}</span>
            </div>

            {selectedServices.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 bg-luxury-black/40 border border-dashed border-white/5">
                <Scissors className="w-8 h-8 text-neutral-600 animate-spin" />
                <div className="space-y-1">
                  <p className="text-sm text-[#ababab]">Nenhum serviço selecionado ainda.</p>
                  <p className="text-xs text-neutral-500 max-w-xs px-4">Utilize o menu de serviços logo acima e adicione os procedimentos que deseja realizar.</p>
                </div>
                <button 
                  onClick={() => scrollToSection('servicos')} 
                  className="text-xs text-luxury-gold underline hover:text-white transition-colors"
                >
                  Navegar pelos serviços
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
                {selectedServices.map(service => (
                  <div key={service.id} className="flex items-center justify-between bg-luxury-black/60 p-3.5 border border-white/5 group">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#f1f1f1] group-hover:text-luxury-gold transition-colors">{service.name}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-neutral-500">
                        <span>{service.category}</span>
                        <span>•</span>
                        <span>Tempo: {service.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-luxury-cream font-medium">R$ {service.price}</span>
                      <button 
                        onClick={() => toggleServiceInPlanner(service)}
                        className="text-neutral-500 hover:text-rose-400 text-xs transition-colors p-1"
                        title="Remover"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total Section */}
            {selectedServices.length > 0 && (
              <div className="bg-luxury-black/90 p-5 space-y-4 border-t border-luxury-gold/20">
                <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                  <div className="space-y-1">
                    <p className="text-[#a0a0a0]">Duração Estimada:</p>
                    <p className="text-base text-luxury-cream flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-luxury-gold" />
                      {formatDuration(totalCalculatedDuration)}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[#a0a0a0]">Valor Combinado:</p>
                    <p className="text-base text-luxury-gold font-bold">
                      R$ {totalCalculatedPrice}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleBookingConfirmDispatch(getCustomWhatsAppTextFromPlanner())}
                    className="w-full py-4 text-xs font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black hover:bg-[#b5986f] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {bookingSuccess ? (
                      <span>Redirecionando...</span>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        <span>Confirmar & Agendar por WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-neutral-500 mt-2">
                    *Horários e profissional definitivo sujeitos a alinhamento via atendente.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* HAIR DIAGNOSTIC QUIZ ADVISOR */}
      <section id="diagnostic-quiz" className="py-24 bg-[#080808] border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center space-x-2 text-luxury-gold text-xs font-semibold uppercase tracking-widest">
              <Compass className="w-4.5 h-4.5" />
              <span>Styling Advisor Digital</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream">Diagnóstico Capilar Lumière</h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
              Responda a estas 3 etapas simples baseadas em visagismo capilar e receba na hora a indicação científica de terapia e estilo para seu cabelo.
            </p>
          </div>

          <div className="bg-luxury-card border border-white/10 p-6 md:p-10 shadow-xl relative min-h-[350px] flex flex-col justify-between">
            
            {!showQuiz ? (
              // Intro template state
              <div className="my-auto py-6 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center mx-auto">
                  <Compass className="w-8 h-8 text-luxury-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-luxury-cream">Pronta para revelar a luminosidade dos seus fios?</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Nossos profissionais de elite mapearam este fluxo para identificar se seu cabelo precisa de reconstrução proteica, óleos vegetais de nutrição ou alinhamento protetor.
                  </p>
                </div>
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="px-8 py-3.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase hover:bg-[#b3956c] transition-all duration-300"
                >
                  Iniciar Diagnóstico Cortesia
                </button>
              </div>
            ) : quizResult ? (
              // Quiz analysis results display
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                <div className="border-b border-white/5 pb-4">
                  <span className="text-[9px] uppercase tracking-widest font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1">
                    Análise Concluída com Sucesso!
                  </span>
                  <p className="text-[10px] text-neutral-400 mt-2 font-mono">CÓDIGO DE ORIENTAÇÃO: #{quizResult.matchCode}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 h-48 rounded-none overflow-hidden border border-white/5">
                    <img 
                      src={quizResult.image} 
                      alt={quizResult.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#cca06a]">
                      {quizResult.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl text-luxury-cream">
                      {quizResult.name}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {quizResult.description}
                    </p>

                    <div className="pt-2 text-xs text-neutral-300 space-y-1.5">
                      <p className="font-semibold text-luxury-gold mb-1">Benefícios imediatos deste tratamento em salão:</p>
                      {quizResult.benefits.map((b: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-luxury-black/60 p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] text-[#808080] uppercase tracking-widest">Sessão Recomendada</span>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-sm text-luxury-cream">Duração: {quizResult.duration}</span>
                      <span className="text-xs text-[#8c8c8c]">•</span>
                      <span className="text-sm font-semibold text-luxury-gold">R$ {quizResult.suggestedPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={restartQuiz}
                      className="px-4 py-3 border border-white/10 text-xs hover:border-white/30 text-neutral-300 transition-colors"
                    >
                      Refazer
                    </button>
                    <button
                      onClick={() => handleBookingConfirmDispatch(getCustomWhatsAppTextFromQuiz())}
                      className="px-6 py-3 bg-luxury-gold text-luxury-black text-xs font-semibold tracking-wider uppercase hover:bg-[#b0936b] transition-all duration-300 flex items-center space-x-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Agendar no WhatsApp com 10% OFF</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Quiz questioning slides
              <div className="space-y-6 md:space-y-8">
                {/* Horizontal progress bar */}
                <div className="w-full bg-neutral-900 h-[2px]">
                  <div 
                    className="bg-luxury-gold h-full transition-all duration-300"
                    style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question Info */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#cca06a]">
                    Etapa {quizStep + 1} de {QUIZ_QUESTIONS.length}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-luxury-cream leading-snug">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>
                </div>

                {/* Option list selection */}
                <div className="grid grid-cols-1 gap-3">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswerSubmit(opt.value)}
                      className="w-full text-left p-4 bg-luxury-black hover:bg-luxury-gold/10 border border-white/5 hover:border-luxury-gold/40 text-xs md:text-sm text-neutral-300 hover:text-white transition-all duration-300 flex items-center justify-between"
                    >
                      <span>{opt.label}</span>
                      <ChevronRight className="w-4 h-4 text-neutral-600 hover:text-luxury-gold" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      if (quizStep > 0) {
                        setQuizStep(prev => prev - 1);
                        setQuizAnswers(prev => prev.slice(0, -1));
                      } else {
                        setShowQuiz(false);
                      }
                    }}
                    className="text-xs text-[#808080] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                  <span className="text-xs font-mono text-neutral-600">LUMIÈRE DIGITAL VISAGISMO</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* TEAM SPECIALISTS SECTION */}
      <section id="artistas" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-luxury-gold text-xs font-semibold uppercase tracking-widest">
            <Award className="w-4.5 h-4.5" />
            <span>Mesa de Mestres do Lumière</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4.5xl text-luxury-cream">Excelência em Cada Toque</h2>
          <p className="text-[#9e9e9e] text-sm max-w-lg mx-auto">
            Nossos cabeleireiros e esteticistas são treinados nas principais capitais mundiais da moda, trazendo as tendências mundiais adaptadas especialmente para o seu visual.
          </p>
        </div>

        {/* Group list mapping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <div key={i} className="group border border-white/5 bg-luxury-card rounded-none overflow-hidden flex flex-col justify-between shadow-lg hover:border-luxury-gold/30 transition-all duration-300">
              <div className="space-y-4">
                
                {/* Photo container */}
                <div className="w-full h-80 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-card via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 space-y-1.5 pt-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-gold">{member.role}</span>
                  <h3 className="font-serif text-xl text-luxury-cream">{member.name}</h3>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 mt-4">
                <span>Especialidade: <strong className="text-white font-normal">{member.specialty}</strong></span>
                <button 
                  onClick={() => handleBookingConfirmDispatch(`Olá Lumière Studio! Desejo agendar um atendimento especificamente com o profissional ${member.name}.`)}
                  className="text-luxury-gold cursor-pointer font-semibold uppercase tracking-wider hover:underline"
                >
                  Conectar
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* TESTIMONIALS SECTION (EXCLUSIVE CAROUSEL WITH MULTIPLE FEEDBACKS) */}
      <section id="depoimentos" className="py-24 bg-luxury-card border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-semibold text-luxury-gold uppercase tracking-widest">A VOZ DO CUIDADO</span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream">A Prova Social de 15 Mil Olhares Satisfeitos</h2>
          </div>

          {/* Testimonial component box */}
          <div className="bg-luxury-black/60 border border-white/5 p-8 md:p-12 relative min-h-[250px] flex flex-col justify-between">
            <span className="font-serif text-8xl text-luxury-gold/10 absolute top-2 left-6 pointer-events-none">“</span>

            <div className="space-y-6 relative z-10">
              {/* Rating stars */}
              <div className="flex text-amber-400">
                {[...Array(TESTIMONIALS[currentTestimonialIdx].rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="font-serif italic text-base md:text-lg text-neutral-300 leading-relaxed">
                "{TESTIMONIALS[currentTestimonialIdx].text}"
              </p>

              {/* User Bio */}
              <div className="flex items-center space-x-4">
                <img 
                  src={TESTIMONIALS[currentTestimonialIdx].avatar} 
                  alt={TESTIMONIALS[currentTestimonialIdx].name} 
                  className="w-12 h-12 rounded-full object-cover border border-luxury-gold/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-luxury-cream">{TESTIMONIALS[currentTestimonialIdx].name}</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{TESTIMONIALS[currentTestimonialIdx].role} • {TESTIMONIALS[currentTestimonialIdx].date}</p>
                </div>
              </div>
            </div>

            {/* Slider triggers */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/5 mt-8">
              <button
                onClick={() => setCurrentTestimonialIdx(prev => prev > 0 ? prev - 1 : TESTIMONIALS.length - 1)}
                className="w-10 h-10 border border-white/15 scroll-smooth hover:border-luxury-gold text-neutral-400 hover:text-luxury-gold flex items-center justify-center transition-colors"
                aria-label="Previous Testimonial"
              >
                <div className="rotate-180">&#10142;</div>
              </button>
              <button
                onClick={() => setCurrentTestimonialIdx(prev => prev < TESTIMONIALS.length - 1 ? prev + 1 : 0)}
                className="w-10 h-10 border border-white/15 hover:border-luxury-gold text-neutral-400 hover:text-luxury-gold flex items-center justify-center transition-colors"
                aria-label="Next Testimonial"
              >
                &#10142;
              </button>
            </div>

          </div>

          {/* Quick FAQ summary callout banner */}
          <div className="mt-16 bg-[#050505] p-6 md:p-8 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <h4 className="font-serif text-sm text-luxury-cream">Precisa de estacionamento?</h4>
              <p className="text-[11px] text-[#9c9c9c] leading-relaxed">Contamos com serviço de Valet cortesia totalmente monitorado na porta para sua total comodidade e segurança.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-sm text-luxury-cream">Formas de Pagamento</h4>
              <p className="text-[11px] text-[#9c9c9c] leading-relaxed">Aceitamos Pix, cartões de débito, crédito com parcelamento em até 6x parcelas sem juros nos pacotes premium.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-sm text-luxury-cream">Políticas de remarcação</h4>
              <p className="text-[11px] text-[#9c9c9c] leading-relaxed">Entendemos contratempos. Remarque gratuitamente seu atendimento conosco em até 4 horas antes do início agendado.</p>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL SQUEEZE CTA BANNER */}
      <section className="relative py-28 overflow-hidden z-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80" 
            alt="Lumiere background" 
            className="w-full h-full object-cover object-center opacity-15"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-luxury-black/90 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs font-semibold text-luxury-gold uppercase tracking-widest bg-luxury-gold/10 px-3 py-1 border border-luxury-gold/20">
            Sua Transformação Começa Aqui
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-luxury-cream leading-tight">
            Pronta para a experiência <br />
            de autocuidado que você merece?
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto font-light">
            Fuja da correria diária e sinta toda a comodidade, acolhimento e profissionalismo de um verdadeiro santuário de beleza sob medida.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleBookingConfirmDispatch('Olá Lumière Studio! Desejo reservar um horário premium para minha primeira visita de cuidados capilares.')}
              className="px-8 py-4 bg-luxury-gold hover:bg-[#b89a6d] text-[#111] font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center rounded-none"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>Agendar Agora por WhatsApp</span>
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="px-8 py-4 border border-white/20 text-[#e6e6e6] text-xs font-semibold tracking-widest uppercase hover:text-luxury-gold hover:border-luxury-gold transition-all duration-300 w-full sm:w-auto bg-luxury-black/80"
            >
              Ver Menu Completo
            </button>
          </div>

          <div className="text-[11px] text-neutral-500 pt-2 flex items-center justify-center space-x-2">
            <span>✓ Atendimento Hoje Disponível</span>
            <span>•</span>
            <span>✓ Café Gourmet de Boas-vindas</span>
          </div>
        </div>
      </section>

      {/* COMPACT FOOTER */}
      <footer className="bg-[#020202] py-16 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border border-luxury-gold flex items-center justify-center">
                <span className="font-serif italic text-luxury-gold">L</span>
              </div>
              <span className="font-display font-semibold tracking-[0.25em] text-sm text-luxury-cream">LUMIÈRE</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed max-w-xs">
              Trabalhamos para entregar beleza, bem-estar e confiança em cada atendimento, realçando a sua essência única com maestria.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm text-luxury-cream">Localização</h4>
            <div className="text-[11px] text-neutral-400 space-y-2 leading-relaxed">
              <p className="flex items-start">
                <MapPin className="w-4.5 h-4.5 text-luxury-gold mr-1.5 flex-shrink-0" />
                <span>Alameda Lorena, 1420 - Jardins<br />São Paulo - SP, CEP 01424-001</span>
              </p>
              <p>• Valet cortesia monitorado na porta</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm text-luxury-cream">Horários</h4>
            <div className="text-[11px] text-neutral-400 space-y-1.5">
              <p>Terça a Sábado: 09:00 às 20:00</p>
              <p>Segunda e Domingo: Fechado para descanso</p>
              <p className="text-luxury-gold font-medium font-sans">★ Agendamento Fácil via WhatsApp</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm text-luxury-cream">Contato</h4>
            <div className="text-[11px] text-neutral-400 space-y-2">
              <p>Telefone: (11) 3085-4424</p>
              <p>WhatsApp: (11) 99999-9999</p>
              <p>Email: contato@lumiere.com.br</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500">
          <p>© Copyright 2026 Lumière Studio de Beleza. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6">
            <a href="#diferenciais" onClick={(e) => { e.preventDefault(); scrollToSection('diferenciais'); }} className="hover:text-luxury-gold transition-colors">Termos de Uso</a>
            <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos'); }} className="hover:text-luxury-gold transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
