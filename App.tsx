
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Zap, 
  Briefcase, Smile, Home, Scale, Sun, Stethoscope, Users, Hammer, BookOpen, Coffee,
  Calculator, Gavel, Camera, Activity, Crown, TrendingUp, ShieldCheck, PenTool, 
  Bug, Sofa, Video, Music, Globe, Sparkles, Truck, Dumbbell, FileText, Utensils,
  BarChart2, Target, DollarSign, Plus
} from 'lucide-react';
import { WhatsAppGenerator } from './components/WhatsAppGenerator';
import { NicheLayout } from './components/NicheFeatures';
import { NicheType, NicheConfig } from './types';

const niches: NicheConfig[] = [
  { id: 'general', label: 'Dashboard Geral', type: NicheType.GENERAL, icon: 'Zap' },
  { id: 'lawyer', label: 'Advocacia (Criminal/Família)', type: NicheType.LAWYER, icon: 'Scale' },
  { id: 'accounting', label: 'Contadores para MEIs', type: NicheType.ACCOUNTING_MEI, icon: 'Calculator' },
  { id: 'dentist_aesthetic', label: 'Dentistas Estéticos', type: NicheType.DENTIST_AESTHETIC, icon: 'Sparkles' },
  { id: 'ortho', label: 'Ortodontia', type: NicheType.ORTHODONTICS, icon: 'Smile' },
  { id: 'psych', label: 'Psicólogos e Psiquiatras', type: NicheType.PSYCHOLOGY, icon: 'Users' },
  { id: 'coach', label: 'Coach Executivo', type: NicheType.COACHING, icon: 'Crown' },
  { id: 'franchise', label: 'Consultor de Franquias', type: NicheType.FRANCHISE, icon: 'TrendingUp' },
  { id: 'realestate', label: 'Imobiliária Alto Padrão', type: NicheType.REAL_ESTATE, icon: 'Home' },
  { id: 'insurance', label: 'Corretor Seguros de Vida', type: NicheType.INSURANCE_LIFE, icon: 'ShieldCheck' },
  { id: 'architect', label: 'Arquiteto de Interiores', type: NicheType.ARCHITECT, icon: 'PenTool' },
  { id: 'design_com', label: 'Designer de Interiores Com.', type: NicheType.INTERIOR_DESIGN_COMMERCIAL, icon: 'Briefcase' },
  { id: 'safety', label: 'Eng. Segurança do Trabalho', type: NicheType.SAFETY_ENGINEER, icon: 'Hammer' },
  { id: 'pest', label: 'Empresas de Dedetização', type: NicheType.PEST_CONTROL, icon: 'Bug' },
  { id: 'furniture', label: 'Móveis Planejados', type: NicheType.CUSTOM_FURNITURE, icon: 'Sofa' },
  { id: 'curtains', label: 'Persianas Automatizadas', type: NicheType.AUTOMATION_CURTAINS, icon: 'Home' },
  { id: 'cctv', label: 'Empresas de CFTV', type: NicheType.CCTV, icon: 'Video' },
  { id: 'solar', label: 'Instalador Placas Solares', type: NicheType.SOLAR, icon: 'Sun' },
  { id: 'music', label: 'Escola de Música', type: NicheType.MUSIC_SCHOOL, icon: 'Music' },
  { id: 'language', label: 'Escola de Idiomas Online', type: NicheType.LANGUAGE_SCHOOL, icon: 'Globe' },
  { id: 'tutoring', label: 'Reforço para Concursos', type: NicheType.TUTORING, icon: 'BookOpen' },
  { id: 'organizer', label: 'Personal Organizer', type: NicheType.PERSONAL_ORGANIZER, icon: 'Activity' },
  { id: 'physio', label: 'Fisioterapia Domiciliar', type: NicheType.PHYSIOTHERAPY, icon: 'Activity' },
  { id: 'acu', label: 'Acupuntura Estética', type: NicheType.ACUPUNCTURE, icon: 'Sparkles' },
  { id: 'tattoo', label: 'Estúdio de Tatuagem', type: NicheType.TATTOO, icon: 'PenTool' },
  { id: 'dispatcher', label: 'Despachante Documentalista', type: NicheType.DISPATCHER, icon: 'FileText' },
  { id: 'dentist', label: 'Clínicas Odontológicas', type: NicheType.DENTIST, icon: 'Smile' },
  { id: 'food', label: 'Lanchonetes / Cardápios', type: NicheType.FOOD, icon: 'Utensils' },
  { id: 'aesthetics', label: 'Clínicas de Estética', type: NicheType.AESTHETICS, icon: 'Stethoscope' },
  { id: 'derma', label: 'Dermatologia/Harmonização', type: NicheType.DERMATOLOGY, icon: 'Stethoscope' },
  { id: 'laser', label: 'Depilação a Laser', type: NicheType.LASER_HAIR, icon: 'Zap' },
  { id: 'facilities', label: 'Manutenção Predial', type: NicheType.FACILITIES, icon: 'Hammer' },
  { id: 'logistics', label: 'Transportadoras/Logística', type: NicheType.LOGISTICS, icon: 'Truck' },
  { id: 'trainer', label: 'Personal Trainer', type: NicheType.PERSONAL_TRAINER, icon: 'Dumbbell' },
];

function App() {
  const [activeNicheId, setActiveNicheId] = useState<string>('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'app' | 'dashboard'>('app');

  // Stats State
  const [stats, setStats] = useState({
    sentLog: [] as string[],
    revenueLog: [] as { amount: number, date: string }[]
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('ZAPHUB_STATS_V1');
    if (savedStats) setStats(JSON.parse(savedStats));

    // Listener for stats updates from other components
    const handleStatsUpdate = () => {
      const updatedStats = localStorage.getItem('ZAPHUB_STATS_V1');
      if (updatedStats) setStats(JSON.parse(updatedStats));
    };
    window.addEventListener('storage_stats_updated', handleStatsUpdate);
    return () => window.removeEventListener('storage_stats_updated', handleStatsUpdate);
  }, []);

  const activeNiche = niches.find(n => n.id === activeNicheId) || niches[0];

  const renderIcon = (iconName?: string) => {
    const icons: Record<string, React.ElementType> = {
      Zap, Briefcase, Smile, Home, Scale, Sun, Stethoscope, Users, Hammer, BookOpen, Coffee,
      Calculator, Gavel, Camera, Activity, Crown, TrendingUp, ShieldCheck, PenTool, 
      Bug, Sofa, Video, Music, Globe, Sparkles, Truck, Dumbbell, FileText, Utensils
    };
    const IconComponent = iconName ? icons[iconName] : Briefcase;
    return <IconComponent className="w-5 h-5" />;
  };

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    return stats.sentLog.filter(date => date.startsWith(today)).length;
  };

  const getWeeklyRevenue = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    return stats.revenueLog
      .filter(item => new Date(item.date) >= startOfWeek)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const addRevenue = () => {
    const amount = prompt("Valor da conversão (R$):");
    if (amount && !isNaN(Number(amount))) {
      const newStats = {
        ...stats,
        revenueLog: [...stats.revenueLog, { amount: Number(amount), date: new Date().toISOString() }]
      };
      setStats(newStats);
      localStorage.setItem('ZAPHUB_STATS_V1', JSON.stringify(newStats));
    }
  };

  const RenderDashboard = () => {
    const todayCount = getTodayStats();
    const weeklyRevenue = getWeeklyRevenue();
    const totalSent = stats.sentLog.length;

    return (
      <div className="animate-fade-in space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Dashboard CRM</h1>
            <p className="text-gray-500">Acompanhamento de metas e produtividade em tempo real.</p>
          </div>
          <button 
            onClick={addRevenue}
            className="bg-gold text-white px-6 py-2 rounded-lg font-bold hover:bg-gold-dark transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus size={18} /> Registrar Venda
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Prospecting Goal */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
             <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gold" strokeDasharray={364.4} strokeDashoffset={364.4 - (Math.min(todayCount, 60) / 60) * 364.4} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-primary">{todayCount}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">De 60</span>
                </div>
             </div>
             <h3 className="font-bold text-gray-800 flex items-center gap-2">
               <Target size={16} className="text-gold" /> Meta Diária
             </h3>
             <p className="text-xs text-gray-500 mt-1">Prospecções realizadas hoje</p>
          </div>

          {/* Weekly Revenue Goal */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <DollarSign size={16} className="text-green-500" /> Meta Semanal
                  </h3>
                  <p className="text-xs text-gray-500">Faturamento alvo: R$ 600,00</p>
                </div>
                <span className="text-2xl font-black text-green-600">R$ {weeklyRevenue.toFixed(2)}</span>
             </div>
             <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000" 
                  style={{ width: `${Math.min((weeklyRevenue / 600) * 100, 100)}%` }}
                ></div>
             </div>
             <div className="mt-2 flex justify-between text-[10px] font-bold text-gray-400">
                <span>0%</span>
                <span>{((weeklyRevenue / 600) * 100).toFixed(0)}% Concluído</span>
                <span>100%</span>
             </div>
          </div>

          {/* Total History */}
          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gold opacity-10 rounded-full blur-2xl"></div>
             <div>
               <h3 className="font-bold flex items-center gap-2 opacity-80">
                 <Zap size={16} className="text-gold" /> Total Acumulado
               </h3>
               <p className="text-4xl font-black mt-4">{totalSent.toLocaleString()}</p>
               <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Mensagens Enviadas</p>
             </div>
             <div className="mt-6 flex items-center gap-2 text-gold text-xs font-bold">
               <TrendingUp size={14} /> +{stats.sentLog.length > 10 ? '12%' : '0%'} vs mês anterior
             </div>
          </div>
        </div>

        {/* Recent Activity Table placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Logs de Receita Recentes</h3>
          </div>
          <table className="w-full text-left">
            <tbody className="divide-y">
              {stats.revenueLog.slice(-5).reverse().map((log, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-600">{new Date(log.date).toLocaleDateString()}</td>
                  <td className="p-4 text-sm text-gray-400">{new Date(log.date).toLocaleTimeString()}</td>
                  <td className="p-4 text-right font-bold text-green-600">+ R$ {log.amount.toFixed(2)}</td>
                </tr>
              ))}
              {stats.revenueLog.length === 0 && (
                <tr><td colSpan={3} className="p-10 text-center text-gray-400 italic">Nenhuma venda registrada esta semana.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-primary text-gray-300 transform transition-transform duration-200 ease-in-out flex flex-col h-full
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-gold/20">
                Z
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-wide">ZapHub Pro</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <button 
            onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium mb-4 transition-all ${view === 'dashboard' ? 'bg-gold text-white shadow-lg' : 'hover:bg-primary-light text-gray-400 hover:text-white'}`}
          >
            <BarChart2 className="w-5 h-5 mr-3" /> Dashboard CRM
          </button>

          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Nichos Especializados</div>
          {niches.map((niche) => (
            <button
              key={niche.id}
              onClick={() => {
                setActiveNicheId(niche.id);
                setView('app');
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`
                w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-1
                ${activeNicheId === niche.id && view === 'app' 
                  ? 'bg-primary-light text-gold border-l-4 border-gold' 
                  : 'hover:bg-primary-light hover:text-white'}
              `}
            >
              <span className={`${activeNicheId === niche.id && view === 'app' ? 'text-gold' : 'text-gray-400'} mr-3`}>
                {renderIcon(niche.icon)}
              </span>
              <span className="truncate">{niche.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 bg-primary-light m-4 rounded-xl border border-gray-700 shrink-0">
          <p className="text-xs text-gray-400 mb-2 font-medium">Meta Diária: {getTodayStats()}/60</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full">
            <div 
              className="bg-gold h-1.5 rounded-full transition-all" 
              style={{ width: `${(getTodayStats() / 60) * 100}%` }}
            ></div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden flex flex-col h-screen">
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shrink-0">
           <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gold rounded flex items-center justify-center text-white font-bold text-sm">Z</div>
                <span className="font-bold text-primary">ZapHub</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
             <Menu className="w-6 h-6" />
           </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto">
            {view === 'dashboard' ? (
              <RenderDashboard />
            ) : (
              <>
                {activeNiche.type !== NicheType.GENERAL && <NicheLayout type={activeNiche.type} />}
                {activeNiche.type === NicheType.GENERAL && (
                  <div className="mb-8 animate-fade-in text-center py-10">
                     <div className="inline-flex p-3 bg-gold/10 rounded-full mb-4">
                        <Zap className="w-8 h-8 text-gold-dark" />
                     </div>
                     <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Central de Produtividade</h1>
                     <p className="text-gray-600 text-lg max-w-2xl mx-auto">Importe seus leads e automatize sua prospecção de forma inteligente.</p>
                  </div>
                )}
                <WhatsAppGenerator />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
