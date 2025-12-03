import React, { useState } from 'react';
import { NicheType } from '../types';
import { 
  Camera, Calendar, Calculator, Video, Home, Shield, DollarSign, 
  Clock, AlertTriangle, FileText, LayoutTemplate, Palette, 
  MousePointer, Zap, Smile, Crown
} from 'lucide-react';
import { Button } from './ui/Button';

// ----------------------------------------------------------------------
// WIDGETS
// ----------------------------------------------------------------------

// --- 1. Before / After (Dentist Aesthetic, Organizer, etc) ---
const BeforeAfterWidget = ({ title = "Galeria Antes & Depois" }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-serif font-bold text-gray-800 mb-4 flex items-center">
      <Camera className="w-5 h-5 mr-2 text-gold" />
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="relative group overflow-hidden rounded-lg bg-gray-100">
        <div className="aspect-[4/3] flex items-center justify-center text-gray-400">Antes</div>
        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">ANTES</div>
      </div>
      <div className="relative group overflow-hidden rounded-lg bg-gray-100">
        <div className="aspect-[4/3] flex items-center justify-center text-gray-400">Depois</div>
        <div className="absolute top-2 left-2 bg-green-600/80 text-white text-[10px] font-bold px-2 py-1 rounded">DEPOIS</div>
      </div>
    </div>
    <div className="mt-4 text-center">
       <Button variant="outline" className="w-full text-xs">Carregar Fotos</Button>
    </div>
  </div>
);

// --- 2. Orthodontic Simulator ---
const OrthodonticSimulator = () => {
  const [fixed, setFixed] = useState(false);
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-serif font-bold text-gray-800 mb-4 flex items-center">
        <Smile className="w-5 h-5 mr-2 text-primary" />
        Simulador de Sorriso
      </h3>
      <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-4 border border-gray-200">
         {/* Placeholder for teeth visualization */}
         <div className={`transition-all duration-700 transform ${fixed ? 'scale-100 opacity-100' : 'scale-95 opacity-50 blur-[1px]'}`}>
            <Smile className="w-24 h-24 text-green-500" />
         </div>
         {!fixed && <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">Sorriso Original</div>}
         {fixed && <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold mt-24">Sorriso Alinhado</div>}
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
        <span className="text-sm font-medium text-gray-600">Alinhadores Invisíveis</span>
        <button 
          onClick={() => setFixed(!fixed)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${fixed ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${fixed ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
      </div>
    </div>
  );
};

// --- 3. ROI / Economy Calculator (Solar, Franchise) ---
const RoiCalculator = ({ niche }: { niche: string }) => {
  const [value, setValue] = useState(500);
  return (
    <div className="bg-primary text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <h3 className="text-lg font-bold mb-4 flex items-center relative z-10">
        <Calculator className="w-5 h-5 mr-2 text-gold" />
        {niche === 'Franchise' ? 'ROI Estimado' : 'Simulador de Economia'}
      </h3>
      <div className="space-y-4 relative z-10">
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            {niche === 'Franchise' ? 'Investimento Inicial (R$)' : 'Conta de Luz Atual (R$)'}
          </label>
          <input 
            type="number" 
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full px-3 py-2 bg-primary-light border border-gray-600 rounded text-white focus:ring-gold focus:border-gold"
          />
        </div>
        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">{niche === 'Franchise' ? 'Retorno Mensal Est.' : 'Economia Anual Est.'}</p>
          <p className="text-2xl font-bold text-green-400">R$ {(value * (niche === 'Franchise' ? 0.15 : 11.5)).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
        </div>
        <Button variant="gold" className="w-full text-sm">Gerar Relatório PDF</Button>
      </div>
    </div>
  );
};

// --- 4. Furniture Metrage Calculator ---
const FurnitureCalculator = () => {
  const [width, setWidth] = useState(2);
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-serif font-bold text-gray-800 mb-4 flex items-center">
        <LayoutTemplate className="w-5 h-5 mr-2 text-blue-600" />
        Orçamento Rápido
      </h3>
      <div className="space-y-3">
        <div>
           <label className="block text-xs font-medium text-gray-500">Largura da Parede (m)</label>
           <input type="range" min="1" max="10" step="0.5" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full accent-blue-600"/>
           <div className="flex justify-between text-xs text-gray-400">
             <span>1m</span>
             <span className="text-blue-600 font-bold">{width}m</span>
             <span>10m</span>
           </div>
        </div>
        <div className="bg-blue-50 p-3 rounded text-center">
           <p className="text-xs text-blue-800">Valor Estimado (MDF Branco)</p>
           <p className="text-xl font-bold text-blue-900">R$ {(width * 1200).toLocaleString('pt-BR')}</p>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Solicitar Projeto</Button>
      </div>
    </div>
  );
};

// --- 5. Quick Quote / Urgency (Pest Control, Maintenance, Insurance) ---
const QuickQuoteWidget = ({ isUrgent = false, label = "Orçamento" }) => (
  <div className={`p-6 rounded-xl shadow-sm border ${isUrgent ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
    <h3 className={`text-lg font-bold mb-4 flex items-center ${isUrgent ? 'text-red-700' : 'text-gray-800'}`}>
      {isUrgent ? <AlertTriangle className="w-5 h-5 mr-2" /> : <Clock className="w-5 h-5 mr-2" />}
      {isUrgent ? 'Atendimento de Urgência' : label}
    </h3>
    <div className="space-y-3">
       <input type="text" placeholder="Seu Nome" className="w-full p-2 border rounded text-sm"/>
       {isUrgent ? (
         <Button className="w-full bg-red-600 hover:bg-red-700 text-white animate-pulse">
           CHAMAR TÉCNICO AGORA
         </Button>
       ) : (
         <Button variant="secondary" className="w-full">
           Cotar em 30 segundos
         </Button>
       )}
    </div>
  </div>
);

// --- 6. Style Filter (Architect, Interior Design) ---
const StyleFilterWidget = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
     <h3 className="text-lg font-serif font-bold text-gray-800 mb-4 flex items-center">
       <Palette className="w-5 h-5 mr-2 text-purple-600" />
       Selecione o Estilo
     </h3>
     <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
       {['Moderno', 'Clássico', 'Industrial', 'Rústico'].map(s => (
         <button key={s} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors whitespace-nowrap">
           {s}
         </button>
       ))}
     </div>
     <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-200 h-24 rounded"></div>
        <div className="bg-gray-200 h-24 rounded"></div>
     </div>
  </div>
);

// --- 7. Scheduler (Psych, Music, Languages) ---
const SchedulerWidget = ({ label = "Agendamento" }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-serif font-bold text-gray-800 mb-4 flex items-center">
      <Calendar className="w-5 h-5 mr-2 text-primary" />
      {label}
    </h3>
    <div className="space-y-2">
      {['09:00', '14:00', '16:30'].map(time => (
        <div key={time} className="flex justify-between items-center p-2 bg-gray-50 rounded border hover:border-primary cursor-pointer transition-colors">
          <span className="font-medium text-sm">{time}</span>
          <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Livre</span>
        </div>
      ))}
    </div>
    <Button variant="outline" className="w-full mt-4 text-xs">Ver Agenda Completa</Button>
  </div>
);

// --- 8. Lawyer Tools ---
const LawyerWidget = () => (
  <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700">
     <h3 className="font-serif text-xl text-gold mb-2 flex items-center">
       <Shield className="w-5 h-5 mr-2" /> Jurídico 24h
     </h3>
     <p className="text-xs text-gray-400 mb-4">Ferramentas rápidas para o dia a dia.</p>
     <div className="grid grid-cols-2 gap-2">
       <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white text-xs py-1">Calc. Prazos</Button>
       <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white text-xs py-1">Liquidação</Button>
     </div>
     <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
       <span className="text-xs text-green-400 flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div> Plantão Ativo</span>
       <Button variant="gold" className="text-xs px-2 h-8">WhatsApp</Button>
     </div>
  </div>
);

// --- 9. Real Estate Showcase ---
const RealEstateShowcase = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-serif font-bold text-gray-800 mb-4 flex items-center">
      <Home className="w-5 h-5 mr-2 text-gold-dark" />
      Imóveis 360º + Drone
    </h3>
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <Video className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
      <span className="absolute bottom-2 left-2 text-white text-xs font-bold">Ver Tour Virtual</span>
    </div>
    <div className="grid grid-cols-3 gap-2 mt-3">
       <div className="h-12 bg-gray-100 rounded border border-gray-200"></div>
       <div className="h-12 bg-gray-100 rounded border border-gray-200"></div>
       <div className="h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-500">+12</div>
    </div>
  </div>
);

// --- Main Niche Layout Wrapper ---
export const NicheLayout: React.FC<{ type: NicheType }> = ({ type }) => {
  
  const getWidget = () => {
    switch(type) {
      // 1. Aesthetics / Images
      case NicheType.DENTIST_AESTHETIC:
      case NicheType.AESTHETICS:
      case NicheType.DERMATOLOGY:
      case NicheType.TATTOO:
      case NicheType.PERSONAL_ORGANIZER:
      case NicheType.ACUPUNCTURE:
        return <BeforeAfterWidget title={type === NicheType.TATTOO ? "Galeria de Arte" : "Antes & Depois"} />;
      
      // 2. Simulators / Calculators
      case NicheType.ORTHODONTICS:
        return <OrthodonticSimulator />;
      case NicheType.CUSTOM_FURNITURE:
        return <FurnitureCalculator />;
      case NicheType.FRANCHISE:
        return <RoiCalculator niche="Franchise" />;
      case NicheType.SOLAR:
        return <RoiCalculator niche="Energy" />;
      
      // 3. Scheduling
      case NicheType.PSYCHOLOGY:
      case NicheType.MUSIC_SCHOOL:
      case NicheType.LANGUAGE_SCHOOL:
      case NicheType.TUTORING:
      case NicheType.PHYSIOTHERAPY:
      case NicheType.PERSONAL_TRAINER:
      case NicheType.DENTIST:
        return <SchedulerWidget label={`Agenda ${type === NicheType.DENTIST ? 'Clínica' : 'Profissional'}`} />;

      // 4. Forms / Urgency / Quotes
      case NicheType.INSURANCE_LIFE:
      case NicheType.LOGISTICS:
      case NicheType.FACILITIES:
        return <QuickQuoteWidget label="Cotação Rápida" />;
      case NicheType.PEST_CONTROL:
        return <QuickQuoteWidget isUrgent={true} />;
      case NicheType.DISPATCHER:
        return (
          <div className="bg-white p-6 rounded-xl border border-gray-100">
             <h3 className="font-bold text-gray-800 mb-3 flex items-center"><FileText className="w-4 h-4 mr-2"/> Regularize seu Veículo</h3>
             <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] mr-2">1</div> Envie foto do documento</div>
                <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] mr-2">2</div> Receba os débitos</div>
                <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] mr-2">3</div> Pague parcelado</div>
             </div>
          </div>
        );

      // 5. Visual / Style
      case NicheType.ARCHITECT:
      case NicheType.INTERIOR_DESIGN_COMMERCIAL:
      case NicheType.AUTOMATION_CURTAINS:
        return <StyleFilterWidget />;
      
      // 6. Real Estate
      case NicheType.REAL_ESTATE:
        return <RealEstateShowcase />;

      // 7. Lawyer
      case NicheType.LAWYER:
        return <LawyerWidget />;

      // 8. Coach (Premium Dark)
      case NicheType.COACHING:
        return (
          <div className="bg-black text-white p-8 rounded-xl shadow-2xl border border-gray-800 text-center">
             <Crown className="w-12 h-12 text-gold mx-auto mb-4" />
             <h3 className="font-serif text-2xl text-white mb-2 tracking-widest uppercase">High Stakes</h3>
             <p className="text-gray-400 text-sm mb-6 font-light">Mentoria exclusiva para líderes que moldam o futuro.</p>
             <Button variant="gold" className="w-full">Aplicar para Mentoria</Button>
          </div>
        );

      // Default
      default:
        return (
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-full flex flex-col justify-center items-center text-center">
            <MousePointer className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">Ferramentas de {type} prontas para uso.</p>
          </div>
        );
    }
  };

  const widget = getWidget();

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">{type}</h2>
        <span className="ml-4 px-3 py-1 bg-gold/10 text-gold-dark text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider hidden md:inline-block">
          Recursos Especializados
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left: The Niche Widget */}
        <div className="md:col-span-1">
           {widget}
        </div>

        {/* Right: Specific Tips/CTA for this niche */}
        <div className="md:col-span-2 bg-gradient-to-br from-primary to-slate-800 rounded-xl p-8 text-white relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-3 flex items-center text-white">
               <Zap className="w-5 h-5 mr-2 text-gold" />
               Aumente sua conversão em {type}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-6">
              Use nossa ferramenta de extração para contatar leads de forma massiva e personalizada. 
              Para este nicho, recomendamos mensagens curtas focadas em <span className="text-gold font-medium">solução imediata</span> e <span className="text-gold font-medium">exclusividade</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
             <div className="flex items-center px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm border border-white/5">
               <Video className="w-3 h-3 mr-2 text-gold" /> Tutorial Rápido
             </div>
             <div className="flex items-center px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm border border-white/5">
               <DollarSign className="w-3 h-3 mr-2 text-gold" /> Scripts de Venda
             </div>
             {type === NicheType.COACHING && (
                <div className="flex items-center px-3 py-1.5 bg-gold text-primary rounded-full text-xs font-bold shadow-lg shadow-gold/20">
                   Premium Access
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};