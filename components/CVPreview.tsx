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

  // Helper to render Custom Sections
  const CustomSections = ({ className = "mt-8" }) => {
    if (!data.customSections || data.customSections.length === 0) return null;
    return (
      <>
        {data.customSections.map(sec => (
          <div key={sec.id} className={className}>
             <h2 className={`text-xl font-bold uppercase tracking-widest ${colors.accent} mb-3 border-b-2 ${colors.border} pb-1`}>{sec.title}</h2>
             <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{sec.content}</p>
          </div>
        ))}
      </>
    );
  };

  // --- 1. Minimalist Template (Clean, Whitespace, Modern) ---
  if (template === TemplateType.MINIMALIST) {
    return (
      <div className="w-full bg-white text-slate-800 p-10 h-full min-h-[297mm] flex flex-col relative">
        <header className="flex items-start justify-between mb-10 pb-6 border-b-2 border-slate-100">
          <div className="flex-1 pr-6">
            <h1 className={`text-5xl font-light tracking-tight mb-4 ${colors.text}`}>{data.fullName}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
              {data.email && <div className="flex items-center gap-2"><Mail size={14} /> {data.email}</div>}
              {data.phone && <div className="flex items-center gap-2"><Phone size={14} /> {data.phone}</div>}
              {data.location && <div className="flex items-center gap-2"><MapPin size={14} /> {data.location}</div>}
              {data.website && <div className="flex items-center gap-2"><Globe size={14} /> {data.website}</div>}
            </div>
          </div>
          {data.photo && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm shrink-0">
               <Photo className="w-full h-full" />
            </div>
          )}
        </header>

        <div className="flex-1">
          <section className="mb-8">
            <div className={`flex items-center gap-3 mb-3`}>
               <div className={`w-1.5 h-6 ${colors.primary} rounded-full`}></div>
               <h2 className={`text-xl font-bold uppercase tracking-widest ${colors.accent}`}>Summary</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">{data.summary}</p>
          </section>

          <section className="mb-8">
             <div className={`flex items-center gap-3 mb-5`}>
               <div className={`w-1.5 h-6 ${colors.primary} rounded-full`}></div>
               <h2 className={`text-xl font-bold uppercase tracking-widest ${colors.accent}`}>Experience</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                    <span className="text-sm font-medium text-slate-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className={`text-md font-semibold ${colors.accent} mb-2`}>{exp.company}</div>
                  <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed pl-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <div className={`flex items-center gap-3 mb-4`}>
                 <div className={`w-1.5 h-6 ${colors.primary} rounded-full`}></div>
                 <h2 className={`text-xl font-bold uppercase tracking-widest ${colors.accent}`}>Education</h2>
              </div>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-md font-bold text-slate-800">{edu.degree}</h3>
                    <div className="text-sm text-slate-600 mb-1">{edu.institution}</div>
                    <div className="text-sm text-slate-400 italic">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className={`flex items-center gap-3 mb-4`}>
                 <div className={`w-1.5 h-6 ${colors.primary} rounded-full`}></div>
                 <h2 className={`text-xl font-bold uppercase tracking-widest ${colors.accent}`}>Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className={`px-3 py-1.5 bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200`}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <CustomSections />
        </div>
        
        {/* Visual Page Break Marker (screen only) */}
        <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-300 opacity-50 pointer-events-none no-print">
            <span className="absolute right-0 -top-6 text-xs text-red-400 bg-white px-2">End of Page 1</span>
        </div>
      </div>
    );
  }

  // --- 2. Creative Template (Bold Sidebar, Graphic) ---
  if (template === TemplateType.CREATIVE) {
    return (
      <div className="w-full bg-white text-slate-800 h-full min-h-[297mm] flex flex-row relative">
        <div className={`${colors.primary} text-white w-[35%] p-8 flex flex-col pt-12 relative overflow-hidden`}>
           <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white opacity-5"></div>
           <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white opacity-5"></div>

          <div className="flex flex-col items-center text-center mb-8 z-10">
            {data.photo ? (
               <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden mb-6 shadow-xl">
                  <Photo className="w-full h-full" />
               </div>
            ) : (
               <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                {data.fullName.charAt(0)}
               </div>
            )}
            
            <h1 className="text-2xl font-black leading-tight mb-2 tracking-wide">{data.fullName}</h1>
            <div className="h-1 w-12 bg-white/40 mb-2 rounded-full"></div>
          </div>

          {(data.email || data.phone || data.location || data.website) && (
            <div className="mt-4 w-full text-left z-10">
              <h2 className="text-sm font-bold border-b border-white/20 pb-2 mb-4 uppercase tracking-widest opacity-80 flex items-center gap-2">Contact</h2>
              <div className="space-y-3 text-xs opacity-90 w-full text-left font-medium">
                {data.email && <div className="flex items-center gap-3"><Mail size={12} className="shrink-0" /> <span className="break-all">{data.email}</span></div>}
                {data.phone && <div className="flex items-center gap-3"><Phone size={12} className="shrink-0" /> {data.phone}</div>}
                {data.location && <div className="flex items-center gap-3"><MapPin size={12} className="shrink-0" /> {data.location}</div>}
                {data.website && <div className="flex items-center gap-3"><Globe size={12} className="shrink-0" /> <span className="break-all">{data.website}</span></div>}
              </div>
            </div>
          )}

          <div className="mt-8 w-full text-left z-10">
            <h2 className="text-sm font-bold border-b border-white/20 pb-2 mb-4 uppercase tracking-widest opacity-80 flex items-center gap-2">Education</h2>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-sm mb-0.5">{edu.degree}</div>
                  <div className="text-xs opacity-80 mb-0.5">{edu.institution}</div>
                  <div className="text-xs opacity-60 italic">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 w-full text-left z-10">
            <h2 className="text-sm font-bold border-b border-white/20 pb-2 mb-4 uppercase tracking-widest opacity-80">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="bg-white/15 px-2.5 py-1 rounded-md text-xs font-medium">{skill.name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[65%] p-10 bg-white flex flex-col justify-start">
          <section className="mb-10">
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-3 ${colors.accent} uppercase tracking-wider bg-slate-50 p-2 rounded-r-lg border-l-4 ${colors.border}`}>Profile</h2>
            <p className="text-slate-700 text-sm leading-7">{data.summary}</p>
          </section>

          <section>
            <h2 className={`text-lg font-bold mb-6 flex items-center gap-3 ${colors.accent} uppercase tracking-wider bg-slate-50 p-2 rounded-r-lg border-l-4 ${colors.border}`}>Professional Experience</h2>
            <div className="space-y-8 border-l-2 border-slate-100 pl-6 ml-2">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${colors.primary} shadow-sm`}></div>
                  <h3 className="text-lg font-extrabold text-slate-800 mb-0.5">{exp.role}</h3>
                  <div className={`text-sm font-bold mb-2 ${colors.accent}`}>{exp.company} <span className="text-slate-300 mx-2">|</span> <span className="text-slate-400 font-normal uppercase text-xs">{exp.startDate} — {exp.endDate}</span></div>
                  <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          <CustomSections />
        </div>
         {/* Visual Page Break Marker (screen only) */}
         <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-300 opacity-50 pointer-events-none no-print">
            <span className="absolute right-0 -top-6 text-xs text-red-400 bg-white px-2">End of Page 1</span>
        </div>
      </div>
    );
  }

  // --- 3. Executive Template (Classic Serif, Centered) ---
  if (template === TemplateType.EXECUTIVE) {
      return (
        <div className="w-full bg-white text-slate-900 p-12 h-full min-h-[297mm] font-serif flex flex-col relative">
          <header className="flex flex-col items-center border-b-4 border-double border-slate-800 pb-8 mb-8 relative">
             {data.photo && (
                <div className="absolute left-0 top-0 w-24 h-28 border border-slate-200 p-1 bg-white shadow-sm hidden md:block">
                    <Photo className="w-full h-full object-cover" />
                </div>
             )}
             
             <h1 className="text-5xl font-bold tracking-tight mb-4 font-serif uppercase text-center">{data.fullName}</h1>
             
             <div className="flex gap-4 text-xs text-slate-600 font-sans tracking-wide uppercase">
                {data.email && <span className="border-r border-slate-300 pr-4 last:border-0">{data.email}</span>}
                {data.phone && <span className="border-r border-slate-300 pr-4 last:border-0">{data.phone}</span>}
                {data.location && <span className="border-r border-slate-300 pr-4 last:border-0">{data.location}</span>}
                {data.website && <span className="last:border-0">{data.website}</span>}
             </div>
          </header>
    
          <section className="mb-8">
            <h2 className={`font-serif text-lg font-bold uppercase tracking-widest border-b border-slate-900 pb-1 mb-3 ${colors.accent}`}>Executive Summary</h2>
            <p className="text-slate-800 leading-relaxed font-serif text-base text-justify">{data.summary}</p>
          </section>
    
          <section className="mb-8 flex-1">
            <h2 className={`font-serif text-lg font-bold uppercase tracking-widest border-b border-slate-900 pb-1 mb-6 ${colors.accent}`}>Professional Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold font-serif text-slate-900">{exp.role}</h3>
                    <span className="text-sm text-slate-600 font-sans font-semibold">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-base font-semibold text-slate-700 font-sans mb-3 italic">{exp.company}</div>
                  <p className="text-sm text-slate-800 whitespace-pre-line leading-7 font-serif pl-4 border-l-2 border-slate-200">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
    
          <div className="grid grid-cols-3 gap-10 mt-auto pt-6 border-t border-slate-200">
            <section className="col-span-2">
              <h2 className={`font-serif text-md font-bold uppercase tracking-widest mb-4 ${colors.accent}`}>Education</h2>
              <div className="space-y-4">
                 {data.education.map((edu) => (
                   <div key={edu.id} className="flex justify-between items-baseline border-b border-dotted border-slate-300 pb-2 last:border-0">
                     <div>
                        <h3 className="font-bold text-slate-900 font-serif text-base">{edu.institution}</h3>
                        <div className="text-sm text-slate-700 font-serif italic">{edu.degree}</div>
                     </div>
                     <div className="text-sm text-slate-500 font-sans">{edu.startDate} - {edu.endDate}</div>
                   </div>
                 ))}
              </div>
            </section>
    
            <section className="col-span-1">
              <h2 className={`font-serif text-md font-bold uppercase tracking-widest mb-4 ${colors.accent}`}>Competencies</h2>
              <ul className="list-square pl-4 space-y-2 font-serif text-sm text-slate-800">
                {data.skills.map((skill) => (
                  <li key={skill.id} className="leading-snug">{skill.name}</li>
                ))}
              </ul>
            </section>
          </div>
          
          <CustomSections />
          
           {/* Visual Page Break Marker (screen only) */}
           <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-300 opacity-50 pointer-events-none no-print">
             <span className="absolute right-0 -top-6 text-xs text-red-400 bg-white px-2">End of Page 1</span>
           </div>
        </div>
      );
  }

  // --- 4. Modern Template (Left Sidebar, Clean, Grid) ---
  if (template === TemplateType.MODERN) {
    return (
      <div className="w-full bg-white text-slate-800 h-full min-h-[297mm] flex relative">
        {/* Left Sidebar */}
        <div className={`w-[30%] ${colors.highlight} p-8 flex flex-col pt-12`}>
            <div className="mb-10 text-center">
                {data.photo && (
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                        <Photo className="w-full h-full" />
                    </div>
                )}
                <h1 className="text-2xl font-bold leading-tight mb-4">{data.fullName}</h1>
                <div className={`w-10 h-1 ${colors.primary} mx-auto mb-6`}></div>
                
                <div className="text-left space-y-4 text-xs font-medium text-slate-600">
                    {data.email && <div className="flex items-center gap-2"><Mail size={12} /> {data.email}</div>}
                    {data.phone && <div className="flex items-center gap-2"><Phone size={12} /> {data.phone}</div>}
                    {data.location && <div className="flex items-center gap-2"><MapPin size={12} /> {data.location}</div>}
                    {data.website && <div className="flex items-center gap-2"><Globe size={12} /> {data.website}</div>}
                </div>
            </div>

            <div className="mb-10">
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2 border-slate-300 ${colors.accent}`}>Education</h3>
                <div className="space-y-6">
                    {data.education.map((edu) => (
                        <div key={edu.id}>
                            <div className="font-bold text-sm">{edu.degree}</div>
                            <div className="text-xs text-slate-600 mb-1">{edu.institution}</div>
                            <div className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2 border-slate-300 ${colors.accent}`}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                        <span key={skill.id} className="bg-white border border-slate-200 px-2 py-1 text-xs rounded shadow-sm">{skill.name}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
            <section className="mb-10">
                 <h2 className={`text-xl font-bold uppercase tracking-wider mb-4 ${colors.accent} flex items-center gap-2`}>
                    <span className={`w-2 h-2 rounded-full ${colors.primary}`}></span> Profile
                 </h2>
                 <p className="text-slate-600 text-sm leading-relaxed">{data.summary}</p>
            </section>

            <section>
                 <h2 className={`text-xl font-bold uppercase tracking-wider mb-6 ${colors.accent} flex items-center gap-2`}>
                    <span className={`w-2 h-2 rounded-full ${colors.primary}`}></span> Experience
                 </h2>
                 <div className="space-y-10">
                    {data.experience.map((exp) => (
                        <div key={exp.id} className="relative border-l-2 border-slate-100 pl-6">
                             <div className={`absolute -left-[5px] top-2 w-2 h-2 rounded-full ${colors.primary}`}></div>
                             <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500">{exp.startDate} - {exp.endDate}</span>
                             </div>
                             <div className={`text-sm font-bold mb-3 ${colors.accent}`}>{exp.company}</div>
                             <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                 </div>
            </section>
            
            <CustomSections />
        </div>
        
         {/* Visual Page Break Marker (screen only) */}
         <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-300 opacity-50 pointer-events-none no-print">
            <span className="absolute right-0 -top-6 text-xs text-red-400 bg-white px-2">End of Page 1</span>
        </div>
      </div>
    );
  }

  // --- 5. Bold Template (Heavy Header Block) ---
  if (template === TemplateType.BOLD) {
    return (
      <div className="w-full bg-white text-slate-900 h-full min-h-[297mm] flex flex-col relative font-display">
        {/* Header Block */}
        <div className={`${colors.primary} text-white p-12 flex items-center gap-8`}>
             {data.photo && (
                <div className="w-32 h-32 rounded-lg bg-white/10 shrink-0 overflow-hidden border-2 border-white/30">
                    <Photo className="w-full h-full" />
                </div>
             )}
             <div className="flex-1">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{data.fullName}</h1>
                <p className="text-white/80 text-sm max-w-xl leading-relaxed font-sans">{data.summary}</p>
             </div>
        </div>
        <div className={`${colors.secondary} px-12 py-3 flex gap-6 text-xs font-bold uppercase tracking-widest ${colors.accent} border-b border-slate-200`}>
             {data.email && <span>{data.email}</span>}
             {data.phone && <span>{data.phone}</span>}
             {data.location && <span>{data.location}</span>}
             {data.website && <span>{data.website}</span>}
        </div>

        <div className="p-12 flex-1 font-sans">
             <div className="grid grid-cols-12 gap-8 h-full">
                 <div className="col-span-8 space-y-8">
                     <section>
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-slate-900 pb-2">Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                        <span className={`text-sm font-bold ${colors.accent}`}>{exp.startDate} // {exp.endDate}</span>
                                    </div>
                                    <div className="text-md font-semibold text-slate-500 mb-3">{exp.company}</div>
                                    <p className="text-sm text-slate-700 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                     </section>
                     <CustomSections />
                 </div>

                 <div className="col-span-4 space-y-8">
                      <section>
                         <h2 className="text-lg font-black uppercase tracking-tighter mb-4 border-b-2 border-slate-200 pb-2">Education</h2>
                         <div className="space-y-4">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="bg-slate-50 p-4 rounded-lg">
                                    <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                                    <div className="text-xs text-slate-500">{edu.institution}</div>
                                    <div className="text-xs text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                         </div>
                      </section>

                      <section>
                         <h2 className="text-lg font-black uppercase tracking-tighter mb-4 border-b-2 border-slate-200 pb-2">Skillset</h2>
                         <div className="space-y-2">
                             {data.skills.map((skill) => (
                                 <div key={skill.id} className="flex items-center justify-between text-sm font-bold text-slate-700 pb-2 border-b border-slate-100 last:border-0">
                                     <span>{skill.name}</span>
                                     <div className={`w-2 h-2 ${colors.primary} rounded-full`}></div>
                                 </div>
                             ))}
                         </div>
                      </section>
                 </div>
             </div>
        </div>
         {/* Visual Page Break Marker (screen only) */}
         <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-300 opacity-50 pointer-events-none no-print">
            <span className="absolute right-0 -top-6 text-xs text-red-400 bg-white px-2">End of Page 1</span>
        </div>
      </div>
    );
  }

  // --- 6. Technical Template (Monospace Headers, Very Structured) ---
  if (template === TemplateType.TECHNICAL) {
     return (
        <div className="w-full bg-white text-slate-900 p-10 h-full min-h-[297mm] flex flex-col relative font-mono text-sm">
             <header className={`border-b-2 ${colors.border} pb-8 mb-8 flex items-end justify-between`}>
                 <div>
                    <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
                    <div className="text-slate-500 space-x-4">
                        {data.email && <span>&lt;{data.email}&gt;</span>}
                        {data.phone && <span>{data.phone}</span>}
                    </div>
                 </div>
                 {data.photo && (
                     <div className="w-20 h-20 grayscale border-2 border-slate-900">
                         <Photo className="w-full h-full" />
                     </div>
                 )}
             </header>

             <div className="grid grid-cols-12 gap-8 flex-1">
                 <div className="col-span-8">
                     <section className="mb-8">
                         <h2 className={`text-lg font-bold uppercase mb-4 border-b ${colors.border} pb-1 flex items-center`}>
                            <span className="mr-2 text-slate-400">#</span> Summary
                         </h2>
                         <p className="text-slate-700 leading-relaxed font-sans">{data.summary}</p>
                     </section>

                     <section>
                         <h2 className={`text-lg font-bold uppercase mb-6 border-b ${colors.border} pb-1 flex items-center`}>
                            <span className="mr-2 text-slate-400">#</span> Experience
                         </h2>
                         <div className="space-y-8">
                             {data.experience.map((exp) => (
                                 <div key={exp.id}>
                                     <div className="flex justify-between items-start mb-2">
                                         <div>
                                            <h3 className="text-base font-bold">{exp.role}</h3>
                                            <div className={`text-xs ${colors.accent} uppercase tracking-wider`}>@{exp.company}</div>
                                         </div>
                                         <div className="bg-slate-100 px-2 py-1 text-xs rounded">{exp.startDate} -> {exp.endDate}</div>
                                     </div>
                                     <p className="text-slate-600 font-sans leading-relaxed text-sm pl-4 border-l border-slate-200">{exp.description}</p>
                                 </div>
                             ))}
                         </div>
                     </section>
                     <CustomSections />
                 </div>

                 <div className="col-span-4 space-y-8">
                      <section className={`p-4 ${colors.softBg} rounded border ${colors.border}`}>
                          <h2 className="font-bold border-b border-slate-300 pb-2 mb-3">EDUCATION_</h2>
                          <div className="space-y-4">
                             {data.education.map((edu) => (
                                 <div key={edu.id}>
                                     <div className="font-bold">{edu.degree}</div>
                                     <div className="text-xs mb-1">{edu.institution}</div>
                                     <div className="text-xs opacity-50">{edu.startDate} - {edu.endDate}</div>
                                 </div>
                             ))}
                          </div>
                      </section>

                      <section>
                          <h2 className="font-bold border-b border-slate-300 pb-2 mb-3">SKILLS_</h2>
                          <div className="flex flex-col gap-2">
                              {data.skills.map((skill) => (
                                  <div key={skill.id} className="flex items-center gap-2">
                                      <span className="text-slate-400 text-xs">{'>'}</span>
                                      <span>{skill.name}</span>
                                  </div>
                              ))}
                          </div>
                      </section>
                      
                      {data.location && (
                          <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
                              Based in: {data.location}
                          </div>
                      )}
                 </div>
             </div>
              {/* Visual Page Break Marker (screen only) */}
             <div className="absolute top-[297mm] left-0 w-full border-b-2 border-dashed border-red-300 opacity-50 pointer-events-none no-print">
                 <span className="absolute right-0 -top-6 text-xs text-red-400 bg-white px-2">End of Page 1</span>
             </div>
        </div>
     );
  }

  return null;
};

export default CVPreview;