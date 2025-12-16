import React from 'react';
import { TemplateType } from '../types';
import { Layout, Palette, Briefcase, Box, Type, Grid } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelect: (t: TemplateType) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelect }) => {
  const templates = [
    {
      id: TemplateType.MINIMALIST,
      name: 'Minimalist',
      icon: <Layout className="w-5 h-5" />,
      desc: 'Clean & Simple',
    },
    {
      id: TemplateType.CREATIVE,
      name: 'Creative',
      icon: <Palette className="w-5 h-5" />,
      desc: 'Graphic & Bold',
    },
    {
      id: TemplateType.EXECUTIVE,
      name: 'Executive',
      icon: <Briefcase className="w-5 h-5" />,
      desc: 'Classic Serif',
    },
    {
      id: TemplateType.MODERN,
      name: 'Modern',
      icon: <Box className="w-5 h-5" />,
      desc: 'Split Layout',
    },
    {
      id: TemplateType.BOLD,
      name: 'Bold',
      icon: <Type className="w-5 h-5" />,
      desc: 'High Contrast',
    },
    {
      id: TemplateType.TECHNICAL,
      name: 'Technical',
      icon: <Grid className="w-5 h-5" />,
      desc: 'Structured',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`relative p-3 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 group
            ${selectedTemplate === t.id 
              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' 
              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
            }`}
        >
          <div className={`p-2 rounded-full ${selectedTemplate === t.id ? 'bg-indigo-200' : 'bg-slate-100 group-hover:bg-indigo-100'}`}>
            {t.icon}
          </div>
          <span className="font-semibold text-xs">{t.name}</span>
          <span className="text-[10px] text-slate-500 opacity-80 leading-tight">{t.desc}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;