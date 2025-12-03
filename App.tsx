import React, { useState } from 'react';
import { 
  Menu, X, Zap, 
  Briefcase, Smile, Home, Scale, Sun, Stethoscope, Users, Hammer, BookOpen, Coffee,
  Calculator, Gavel, Camera, Activity, Crown, TrendingUp, ShieldCheck, PenTool, 
  Bug, Sofa, Video, Music, Globe, Sparkles, Truck, Dumbbell, FileText, Utensils
} from 'lucide-react';
import { WhatsAppGenerator } from './components/WhatsAppGenerator';
import { NicheLayout } from './components/NicheFeatures';
import { NicheType, NicheConfig } from './types';

// Exact list requested by user
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

  const activeNiche = niches.find(n => n.id === activeNicheId) || niches[0];

  const renderIcon = (iconName?: string) => {
    // Dynamic icon mapper
    const icons: Record<string, React.ElementType> = {
      Zap, Briefcase, Smile, Home, Scale, Sun, Stethoscope, Users, Hammer, BookOpen, Coffee,
      Calculator, Gavel, Camera, Activity, Crown, TrendingUp, ShieldCheck, PenTool, 
      Bug, Sofa, Video, Music, Globe, Sparkles, Truck, Dumbbell, FileText, Utensils
    };
    const IconComponent = iconName ? icons[iconName] : Briefcase;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Navigation */}
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
          {niches.map((niche) => {
             return (
              <button
                key={niche.id}
                onClick={() => {
                  setActiveNicheId(niche.id);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`
                  w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeNicheId === niche.id 
                    ? 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-lg translate-x-1' 
                    : 'hover:bg-primary-light hover:text-white'}
                `}
              >
                <span className={`${activeNicheId === niche.id ? 'text-white' : 'text-gray-400'} mr-3`}>
                  {renderIcon(niche.icon)}
                </span>
                <span className="truncate">{niche.label}</span>
              </button>
             );
          })}
        </nav>

        <div className="p-4 bg-primary-light m-4 rounded-xl border border-gray-700 shrink-0">
          <p className="text-xs text-gray-400 mb-2 font-medium">Status do Servidor</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-green-400">Sistema Online</span>
          </div>
          <div className="w-full bg-gray-700 h-1.5 rounded-full">
            <div className="bg-gold h-1.5 rounded-full w-full animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-hidden flex flex-col h-screen">
        
        {/* Top Header (Mobile Only) */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shrink-0">
           <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gold rounded flex items-center justify-center text-white font-bold text-sm">Z</div>
                <span className="font-bold text-primary">ZapHub</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
             <Menu className="w-6 h-6" />
           </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto">
            
            {/* Niche Specific Header/Widgets */}
            {activeNiche.type !== NicheType.GENERAL && (
              <NicheLayout type={activeNiche.type} />
            )}

            {/* Dashboard Welcome (General Only) */}
            {activeNiche.type === NicheType.GENERAL && (
              <div className="mb-8 animate-fade-in text-center py-10">
                 <div className="inline-flex p-3 bg-gold/10 rounded-full mb-4">
                    <Zap className="w-8 h-8 text-gold-dark" />
                 </div>
                 <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Central de Produtividade</h1>
                 <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                   Selecione um nicho no menu lateral ou use o importador universal abaixo para transformar listas de contatos em links de WhatsApp instantâneos.
                 </p>
              </div>
            )}

            {/* Main Application Logic */}
            <WhatsAppGenerator />
          </div>
        </div>

        {/* Floating WhatsApp Action Button */}
        <a 
          href="https://wa.me/?text=Tenho%20interesse%20no%20sistema"
          target="_blank"
          rel="noreferrer" 
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20bd5a] transition-all hover:scale-110 z-50 flex items-center justify-center group"
          title="Fale Conosco"
        >
          <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded shadow text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Suporte Online</span>
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

      </main>
    </div>
  );
}

export default App;