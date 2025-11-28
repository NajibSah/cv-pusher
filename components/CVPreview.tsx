import React from 'react';
import { CVData, TemplateType, ColorTheme } from '../types';
import { THEME_COLORS } from '../constants';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
  theme: ColorTheme;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, template, theme }) => {
  const colors = THEME_COLORS[theme];

  // Helper for rendering photo if exists
  const Photo = ({ className }: { className?: string }) => {
    if (!data.photo) return null;
    return <img src={data.photo} alt={data.fullName} className={`object-cover ${className}`} />;
  };

  // --- Minimalist Template ---
  if (template === TemplateType.MINIMALIST) {
    return (
      <div className="w-full bg-white text-slate-800 p-6 h-full min-h-full">
        <header className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex-1">
            <h1 className={`text-2xl font-light uppercase tracking-wide mb-2 ${colors.text}`}>{data.fullName}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
              {data.email && <div className="flex items-center gap-1"><Mail size={10} /> {data.email}</div>}
              {data.phone && <div className="flex items-center gap-1"><Phone size={10} /> {data.phone}</div>}
              {data.location && <div className="flex items-center gap-1"><MapPin size={10} /> {data.location}</div>}
              {data.website && <div className="flex items-center gap-1"><Globe size={10} /> {data.website}</div>}
            </div>
          </div>
          {data.photo && (
            <div className="ml-4 w-16 h-16 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
               <Photo className="w-full h-full" />
            </div>
          )}
        </header>

        <section className="mb-4">
          <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${colors.accent}`}>Summary</h2>
          <p className="text-slate-600 text-xs leading-snug">{data.summary}</p>
        </section>

        <section className="mb-4">
          <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${colors.accent}`}>Experience</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-semibold text-slate-800 text-xs">{exp.role}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[10px] font-medium text-slate-500 mb-1">{exp.company}</div>
                <p className="text-[10px] text-slate-600 whitespace-pre-line leading-normal">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <section>
            <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${colors.accent}`}>Education</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-slate-800 text-xs">{edu.degree}</h3>
                  <div className="text-slate-500 text-[10px]">{edu.institution}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${colors.accent}`}>Skills</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill) => (
                <span key={skill.id} className={`px-2 py-0.5 bg-slate-50 text-slate-700 text-[9px] rounded font-medium border border-slate-200`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- Creative Template ---
  if (template === TemplateType.CREATIVE) {
    return (
      <div className="w-full bg-white text-slate-800 h-full min-h-full flex flex-row">
        {/* Sidebar */}
        <div className={`${colors.primary} text-white w-[30%] p-5 flex flex-col items-center text-center`}>
          {data.photo ? (
             <div className="w-20 h-20 rounded-full border-2 border-white/30 overflow-hidden mb-4 shadow-lg">
                <Photo className="w-full h-full" />
             </div>
          ) : (
             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              {data.fullName.charAt(0)}
             </div>
          )}
          
          <h1 className="text-lg font-bold leading-tight mb-2">{data.fullName}</h1>
          <div className="h-0.5 w-6 bg-white/50 mb-4"></div>
          
          <div className="space-y-1.5 text-[9px] opacity-90 w-full text-left pl-2">
            {data.email && <div className="flex items-center gap-1.5"><Mail size={9} /> <span className="break-all">{data.email}</span></div>}
            {data.phone && <div className="flex items-center gap-1.5"><Phone size={9} /> {data.phone}</div>}
            {data.location && <div className="flex items-center gap-1.5"><MapPin size={9} /> {data.location}</div>}
            {data.website && <div className="flex items-center gap-1.5"><Globe size={9} /> <span className="break-all">{data.website}</span></div>}
          </div>

          <div className="mt-8 w-full text-left pl-2">
            <h2 className="text-[10px] font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider opacity-80">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-[10px]">{edu.degree}</div>
                  <div className="text-[9px] opacity-80">{edu.institution}</div>
                  <div className="text-[8px] opacity-60 italic">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 w-full text-left pl-2">
            <h2 className="text-[10px] font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider opacity-80">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill) => (
                <span key={skill.id} className="bg-white/10 px-1.5 py-0.5 rounded text-[8px]">{skill.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[70%] p-6 bg-white">
          <section className="mb-5">
            <h2 className={`text-sm font-bold mb-1.5 flex items-center gap-2 ${colors.accent}`}>
              <span className={`w-1 h-4 ${colors.primary} block rounded-sm`}></span>
              Profile
            </h2>
            <p className="text-slate-600 text-xs leading-snug">
              {data.summary}
            </p>
          </section>

          <section>
            <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${colors.accent}`}>
              <span className={`w-1 h-4 ${colors.primary} block rounded-sm`}></span>
              Experience
            </h2>
            <div className="space-y-4 border-l border-slate-100 pl-3 ml-0.5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className={`absolute -left-[17px] top-1.5 w-2 h-2 rounded-full border border-white ${colors.primary}`}></div>
                  <h3 className="text-xs font-bold text-slate-800">{exp.role}</h3>
                  <div className={`text-[10px] font-semibold mb-0.5 ${colors.accent}`}>{exp.company}</div>
                  <div className="text-[9px] text-slate-400 mb-1 uppercase tracking-wide">{exp.startDate} — {exp.endDate}</div>
                  <p className="text-slate-600 text-[10px] leading-snug">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- Executive / Professional Template ---
  return (
    <div className="w-full bg-white text-slate-900 p-8 h-full min-h-full font-serif flex flex-col">
      <header className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
         <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2 font-serif uppercase">{data.fullName}</h1>
            <div className="flex flex-col gap-0.5 text-[10px] text-slate-600 font-sans">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.location && <span>{data.location}</span>}
              {data.website && <span>{data.website}</span>}
            </div>
         </div>
         {data.photo && (
            <div className="w-20 h-24 border border-slate-200 p-1 bg-white shadow-sm">
                <Photo className="w-full h-full object-cover" />
            </div>
         )}
      </header>

      <section className="mb-4">
        <h2 className={`font-sans text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-1.5 ${colors.accent}`}>Executive Summary</h2>
        <p className="text-slate-700 leading-snug font-sans text-xs">{data.summary}</p>
      </section>

      <section className="mb-4 flex-1">
        <h2 className={`font-sans text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-2.5 ${colors.accent}`}>Professional Experience</h2>
        <div className="space-y-3">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-end mb-0.5">
                <h3 className="text-sm font-bold font-serif">{exp.role}</h3>
                <span className="text-[10px] text-slate-600 font-sans italic">{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="text-xs font-semibold text-slate-700 font-sans mb-1">{exp.company}</div>
              <p className="text-[10px] text-slate-600 whitespace-pre-line leading-normal font-sans pl-2 border-l-2 border-slate-100 ml-0.5">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-3 gap-4 mt-auto">
        <section className="col-span-2">
          <h2 className={`font-sans text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-2 ${colors.accent}`}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-bold text-slate-800 font-serif text-xs">{edu.institution}</h3>
              <div className="text-[10px] text-slate-600 font-sans">{edu.degree}</div>
              <div className="text-[9px] text-slate-500 font-sans italic">{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </section>

        <section className="col-span-1">
          <h2 className={`font-sans text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-2 ${colors.accent}`}>Competencies</h2>
          <ul className="list-disc pl-3 space-y-0.5 font-sans text-[9px] text-slate-700">
            {data.skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CVPreview;