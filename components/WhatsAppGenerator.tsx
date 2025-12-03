import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileSpreadsheet, Download, RefreshCw, Send, CheckCircle, AlertCircle, Copy, FileText } from 'lucide-react';
import { parseFile, sanitizePhoneNumber, generateWhatsAppLink, extractLeadsFromText } from '../services/dataProcessing';
import { ProcessedLead } from '../types';
import { Button } from './ui/Button';

export const WhatsAppGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [rawData, setRawData] = useState<any[][]>([]);
  const [leads, setLeads] = useState<ProcessedLead[]>([]);
  const [message, setMessage] = useState("Olá, tudo bem?");
  const [isProcessing, setIsProcessing] = useState(false);
  const [columnMapping, setColumnMapping] = useState<{name: number, phone: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const data = await parseFile(file);
      if (data && data.length > 0) {
        setRawData(data);
        // Reset mapping to force user selection or auto-detect
        setColumnMapping(null); 
        autoDetectColumns(data);
      }
    } catch (error) {
      console.error("Error reading file", error);
      alert("Erro ao ler o arquivo. Certifique-se que é um .csv ou .xlsx válido.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextPaste = () => {
    if(!textInputRef.current) return;
    const text = textInputRef.current.value;
    const extracted = extractLeadsFromText(text);
    
    const processed: ProcessedLead[] = extracted.map((item, idx) => {
      const sanitized = sanitizePhoneNumber(item.phone);
      return {
        id: `lead-${idx}`,
        originalName: item.name,
        originalPhone: item.phone,
        sanitizedPhone: sanitized,
        status: (sanitized ? 'valid' : 'invalid') as 'valid' | 'invalid',
        generatedLink: generateWhatsAppLink(sanitized, message),
        message: message
      };
    });
    setLeads(processed);
    setRawData([]); // Clear excel data if using paste
  };

  const autoDetectColumns = (data: any[][]) => {
    // Simple heuristic: look for "nome" and "telefone" in first row
    const headers = data[0].map((h: any) => String(h).toLowerCase());
    const nameIdx = headers.findIndex(h => h.includes('nome') || h.includes('name') || h.includes('cliente'));
    const phoneIdx = headers.findIndex(h => h.includes('tel') || h.includes('cel') || h.includes('phone') || h.includes('contato') || h.includes('whatsapp'));

    if (nameIdx >= 0 && phoneIdx >= 0) {
      setColumnMapping({ name: nameIdx, phone: phoneIdx });
      processLeads(data, nameIdx, phoneIdx);
    } else {
      // If we can't detect, we don't process yet, UI will show column selector
    }
  };

  const processLeads = useCallback((data: any[][], nameIdx: number, phoneIdx: number) => {
    const processed: ProcessedLead[] = data.slice(1).map((row, index) => {
      const rawPhone = row[phoneIdx];
      const sanitized = sanitizePhoneNumber(rawPhone);
      return {
        id: `row-${index}`,
        originalName: row[nameIdx] || `Lead ${index + 1}`,
        originalPhone: rawPhone,
        sanitizedPhone: sanitized,
        status: (sanitized ? 'valid' : 'invalid') as 'valid' | 'invalid',
        generatedLink: generateWhatsAppLink(sanitized, message),
        message: message
      };
    }).filter(l => l.originalPhone); // Filter out empty rows
    setLeads(processed);
  }, [message]);

  const handleManualMapping = (nameIdx: number, phoneIdx: number) => {
    setColumnMapping({ name: nameIdx, phone: phoneIdx });
    processLeads(rawData, nameIdx, phoneIdx);
  };

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    // Regenerate links with new message
    setLeads(prev => prev.map(lead => ({
      ...lead,
      message: newMessage,
      generatedLink: generateWhatsAppLink(lead.sanitizedPhone, newMessage)
    })));
  };

  const copyAllLinks = () => {
    const allLinks = leads
      .filter(l => l.status === 'valid')
      .map(l => `${l.originalName}: ${l.generatedLink}`)
      .join('\n');
    navigator.clipboard.writeText(allLinks);
    alert(`${leads.filter(l => l.status === 'valid').length} links copiados!`);
  };

  const downloadCSV = () => {
    const headers = "Nome,Telefone Original,Telefone Formatado,Link WhatsApp\n";
    const rows = leads.map(l => 
      `"${l.originalName}","${l.originalPhone}","${l.sanitizedPhone}","${l.generatedLink}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "leads_whatsapp_zaphub.csv";
    link.click();
  };

  const validLeadsCount = leads.filter(l => l.status === 'valid').length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 bg-primary text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gold-light">Gerador de Links WhatsApp</h2>
          <p className="text-gray-300 text-sm mt-1">Transforme suas listas em conversas instantâneas.</p>
        </div>
        <div className="hidden md:block">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" /> Sistema Online
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'upload' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Importar Arquivo (.xlsx/.csv)
          </button>
          <button 
            onClick={() => setActiveTab('text')}
            className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'text' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
             Colar Texto / PDF
          </button>
        </div>

        {/* Input Area */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-primary/50">
          {activeTab === 'upload' ? (
            <div className="flex flex-col items-center justify-center text-center">
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600 mb-4">Arraste sua planilha aqui ou clique para buscar</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                className="hidden" 
              />
              <Button onClick={() => fileInputRef.current?.click()} isLoading={isProcessing}>
                Selecionar Planilha
              </Button>
            </div>
          ) : (
             <div className="flex flex-col">
               <label className="text-sm font-semibold text-gray-700 mb-2">Cole o conteúdo aqui (texto copiado de PDF ou Docs)</label>
               <textarea 
                 ref={textInputRef}
                 className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                 placeholder="Ex: João da Silva (11) 99999-9999..."
               />
               <div className="mt-4 flex justify-end">
                 <Button onClick={handleTextPaste} variant="secondary">
                   <FileText className="w-4 h-4 mr-2" /> Extrair Contatos
                 </Button>
               </div>
             </div>
          )}
        </div>

        {/* Column Mapping (If needed) */}
        {rawData.length > 0 && !columnMapping && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Mapeamento de Colunas Necessário
            </h3>
            <p className="text-sm text-yellow-700 mb-4">Não conseguimos identificar automaticamente. Por favor, selecione as colunas:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Coluna de Nome</label>
                <select id="nameCol" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                   {rawData[0].map((h: any, i: number) => <option key={i} value={i}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Coluna de Telefone</label>
                <select id="phoneCol" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                   {rawData[0].map((h: any, i: number) => <option key={i} value={i}>{h}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
               <Button onClick={() => {
                 const n = (document.getElementById('nameCol') as HTMLSelectElement).value;
                 const p = (document.getElementById('phoneCol') as HTMLSelectElement).value;
                 handleManualMapping(Number(n), Number(p));
               }}>Confirmar Mapeamento</Button>
            </div>
          </div>
        )}

        {/* Config & Output */}
        {leads.length > 0 && (
          <div className="animate-fade-in">
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem Padrão</label>
                 <div className="flex gap-2">
                   <input 
                      type="text" 
                      value={message} 
                      onChange={(e) => handleMessageChange(e.target.value)} 
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button onClick={() => handleMessageChange(message)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" title="Recalcular Links">
                      <RefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                 </div>
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={copyAllLinks} variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" /> Copiar Tudo
                </Button>
                <Button onClick={downloadCSV} variant="secondary" className="flex-1">
                  <Download className="w-4 h-4 mr-2" /> CSV
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
               <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                 <span className="font-semibold text-gray-700">Leads Processados ({validLeadsCount})</span>
                 {leads.length - validLeadsCount > 0 && (
                   <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                     {leads.length - validLeadsCount} inválidos
                   </span>
                 )}
               </div>
               <div className="max-h-96 overflow-y-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50 sticky top-0">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {leads.map((lead) => (
                       <tr key={lead.id} className={lead.status === 'invalid' ? 'bg-red-50' : 'hover:bg-gray-50'}>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.originalName}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {lead.status === 'valid' ? lead.sanitizedPhone : <span className="text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> {lead.originalPhone}</span>}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                           {lead.status === 'valid' ? (
                             <a 
                               href={lead.generatedLink} 
                               target="_blank" 
                               rel="noreferrer"
                               className="inline-flex items-center text-green-600 hover:text-green-900 font-bold"
                             >
                               Enviar <Send className="w-4 h-4 ml-1" />
                             </a>
                           ) : (
                             <span className="text-gray-400 cursor-not-allowed">Inválido</span>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};