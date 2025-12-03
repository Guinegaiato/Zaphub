export interface ProcessedLead {
  id: string;
  originalName: string;
  originalPhone: string;
  sanitizedPhone: string;
  status: 'valid' | 'invalid';
  generatedLink: string;
  message: string;
}

export interface ColumnMapping {
  nameIndex: number;
  phoneIndex: number;
}

export enum NicheType {
  GENERAL = 'General',
  
  // Specified List
  LAWYER = 'Advocacia',
  ACCOUNTING_MEI = 'Contadores MEI',
  DENTIST_AESTHETIC = 'Dentistas Estéticos',
  ORTHODONTICS = 'Ortodontia',
  PSYCHOLOGY = 'Psicólogos e Psiquiatras',
  COACHING = 'Coach Executivo',
  FRANCHISE = 'Consultor de Franquias',
  REAL_ESTATE = 'Imobiliária Alto Padrão',
  INSURANCE_LIFE = 'Seguros de Vida',
  ARCHITECT = 'Arquiteto de Interiores',
  INTERIOR_DESIGN_COMMERCIAL = 'Design Comercial',
  SAFETY_ENGINEER = 'Eng. Segurança Trabalho',
  PEST_CONTROL = 'Dedetização',
  CUSTOM_FURNITURE = 'Móveis Planejados',
  AUTOMATION_CURTAINS = 'Persianas/Automação',
  CCTV = 'CFTV e Segurança',
  SOLAR = 'Energia Solar',
  MUSIC_SCHOOL = 'Escola de Música',
  LANGUAGE_SCHOOL = 'Escola de Idiomas',
  TUTORING = 'Reforço para Concursos',
  PERSONAL_ORGANIZER = 'Personal Organizer',
  PHYSIOTHERAPY = 'Fisioterapia Domiciliar',
  ACUPUNCTURE = 'Acupuntura Estética',
  TATTOO = 'Estúdio de Tatuagem',
  DISPATCHER = 'Despachante',
  DENTIST = 'Clínicas Odontológicas',
  FOOD = 'Lanchonetes',
  AESTHETICS = 'Clínicas de Estética',
  DERMATOLOGY = 'Dermatologia',
  LASER_HAIR = 'Depilação a Laser',
  FACILITIES = 'Manutenção Predial',
  LOGISTICS = 'Transportadoras',
  PERSONAL_TRAINER = 'Personal Trainer'
}

export interface NicheConfig {
  id: string;
  label: string;
  type: NicheType;
  icon?: string;
}