import React from 'react';
import { TemplateType } from '../types';
import { Layout, Palette, Briefcase } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelect: (t: TemplateType) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelect }) => {
  const templates = [
    {
      id: TemplateType.MINIMALIST,
      name: 'Minimalist',
      icon: <Layout className="w-6 h-6" />,
      desc: 'Clean, simple, whitespace-focused.',
    },
    {
      id: TemplateType.CREATIVE,
      name: 'Creative',
      icon: <Palette className="w-6 h-6" />,
      desc: 'Bold colors, sidebars, modern look.',
    },
    {
      id: TemplateType.EXECUTIVE,
      name: 'Executive',
      icon: <Briefcase className="w-6 h-6" />,
      desc: 'Traditional, authoritative, serif fonts.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2 group
            ${selectedTemplate === t.id 
              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' 
              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
            }`}
        >
          <div className={`p-3 rounded-full ${selectedTemplate === t.id ? 'bg-indigo-200' : 'bg-slate-100 group-hover:bg-indigo-100'}`}>
            {t.icon}
          </div>
          <span className="font-semibold text-sm">{t.name}</span>
          <span className="text-xs text-slate-500 opacity-80">{t.desc}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
