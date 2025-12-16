import React, { useState } from 'react';
import { CVData, ExperienceItem, EducationItem, SkillItem, CustomSectionItem } from '../types';
import { Sparkles, Trash2, Plus, ChevronDown, ChevronUp, Upload, X, Mail, Phone, MapPin, Globe, PenTool } from 'lucide-react';
import { improveTextSection } from '../services/geminiService';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
  jobRole: string;
}

const CVEditor: React.FC<CVEditorProps> = ({ data, onChange, jobRole }) => {
  const [activeSection, setActiveSection] = useState<string | null>('profile');
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleInputChange = (field: keyof CVData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    handleInputChange('photo', undefined);
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceItem, value: string) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    handleInputChange('experience', newExp);
  };

  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    handleInputChange('education', newEdu);
  };

  const handleCustomSectionChange = (index: number, field: keyof CustomSectionItem, value: string) => {
    const newSec = [...(data.customSections || [])];
    newSec[index] = { ...newSec[index], [field]: value };
    handleInputChange('customSections', newSec);
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    handleInputChange('experience', [...data.experience, newExp]);
  };

  const removeExperience = (index: number) => {
    const newExp = data.experience.filter((_, i) => i !== index);
    handleInputChange('experience', newExp);
  };
  
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
    };
    handleInputChange('education', [...data.education, newEdu]);
  };

  const removeEducation = (index: number) => {
    const newEdu = data.education.filter((_, i) => i !== index);
    handleInputChange('education', newEdu);
  };

  const addCustomSection = () => {
    const newSec: CustomSectionItem = {
      id: `custom-${Date.now()}`,
      title: 'New Section',
      content: '',
    };
    handleInputChange('customSections', [...(data.customSections || []), newSec]);
  };

  const removeCustomSection = (index: number) => {
    const newSec = (data.customSections || []).filter((_, i) => i !== index);
    handleInputChange('customSections', newSec);
  };

  const handleSkillsChange = (text: string) => {
      // Simple parser for comma separated skills
      const skillNames = text.split(',').map(s => s.trim()).filter(s => s);
      const newSkills: SkillItem[] = skillNames.map((name, i) => ({
          id: `skill-${i}`,
          name: name,
          level: 'Intermediate' // default
      }));
      handleInputChange('skills', newSkills);
  };

  const handleAIImprove = async (text: string, section: string, targetId: string, updateCb: (t: string) => void) => {
    if (!text) return;
    setLoadingAI(targetId);
    try {
      const improved = await improveTextSection(text, section, jobRole);
      updateCb(improved);
    } finally {
      setLoadingAI(null);
    }
  };

  const SectionHeader = ({ title, id, icon }: { title: string, id: string, icon?: React.ReactNode }) => (
    <button
      onClick={() => toggleSection(id)}
      className={`w-full flex items-center justify-between p-4 border rounded-lg shadow-sm transition-colors mb-2 
        ${activeSection === id 
            ? 'bg-slate-100 border-indigo-500 text-indigo-700 dark:bg-slate-700 dark:border-indigo-400 dark:text-indigo-300' 
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
        }`}
    >
      <div className="flex items-center gap-3 font-semibold text-sm">
        {icon}
        {title}
      </div>
      {activeSection === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  const ContactInput = ({ 
    label, 
    value, 
    field, 
    icon: Icon 
  }: { 
    label: string, 
    value: string, 
    field: keyof CVData, 
    icon: React.ElementType 
  }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
        <Icon size={10} /> {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full p-2 pr-8 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        {value && (
          <button 
            onClick={() => handleInputChange(field, '')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-20 custom-scrollbar">
      {/* Profile Section */}
      <div>
        <SectionHeader title="Profile" id="profile" />
        {activeSection === 'profile' && (
          <div className="p-4 bg-white dark:bg-slate-800 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 space-y-4 animate-fadeIn">
            
            {/* Photo Upload */}
            <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
               <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-300 dark:border-slate-600 relative shrink-0">
                  {data.photo ? (
                    <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={20} className="text-slate-400" />
                  )}
               </div>
               <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Profile Photo</label>
                  <div className="flex gap-2 items-center">
                     <label className="cursor-pointer text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition-colors">
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                     </label>
                     {data.photo && (
                       <button onClick={removePhoto} className="text-xs px-2 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded font-medium transition-colors flex items-center gap-1">
                          <X size={12} /> Remove
                       </button>
                     )}
                  </div>
               </div>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            
            {/* Summary */}
            <div className="space-y-1 relative">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Professional Summary</label>
                <button 
                  onClick={() => handleAIImprove(data.summary, "Professional Summary", 'summary', (val) => handleInputChange('summary', val))}
                  disabled={loadingAI === 'summary' || !data.summary}
                  className="text-[10px] flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-50"
                >
                  <Sparkles size={12} /> {loadingAI === 'summary' ? 'Improving...' : 'Improve with AI'}
                </button>
              </div>
              <textarea
                value={data.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                rows={4}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                placeholder="Brief professional summary..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div>
        <SectionHeader title="Contact Details" id="contact" />
        {activeSection === 'contact' && (
           <div className="p-4 bg-white dark:bg-slate-800 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 grid grid-cols-1 gap-4 animate-fadeIn">
              <ContactInput label="Email" value={data.email} field="email" icon={Mail} />
              <ContactInput label="Phone" value={data.phone} field="phone" icon={Phone} />
              <ContactInput label="Location" value={data.location} field="location" icon={MapPin} />
              <ContactInput label="Website / Link" value={data.website} field="website" icon={Globe} />
           </div>
        )}
      </div>

      {/* Experience */}
      <div>
        <SectionHeader title="Experience" id="experience" />
        {activeSection === 'experience' && (
          <div className="p-4 bg-white dark:bg-slate-800 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 space-y-6 animate-fadeIn">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="relative pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                <button 
                  onClick={() => removeExperience(index)}
                  className="absolute right-0 top-0 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4 pr-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Description</label>
                    <button 
                      onClick={() => handleAIImprove(exp.description, "Job Description", exp.id, (val) => handleExperienceChange(index, 'description', val))}
                      disabled={loadingAI === exp.id || !exp.description}
                      className="text-[10px] flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-50"
                    >
                      <Sparkles size={12} /> {loadingAI === exp.id ? 'Improving...' : 'Improve with AI'}
                    </button>
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                    placeholder="• Bullet point 1&#10;• Bullet point 2"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div>
        <SectionHeader title="Education" id="education" />
        {activeSection === 'education' && (
          <div className="p-4 bg-white dark:bg-slate-800 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 space-y-6 animate-fadeIn">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="relative pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                <button 
                  onClick={() => removeEducation(index)}
                  className="absolute right-0 top-0 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Start Date</label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">End Date</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <SectionHeader title="Skills" id="skills" />
        {activeSection === 'skills' && (
           <div className="p-4 bg-white dark:bg-slate-800 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 animate-fadeIn">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">Comma Separated Skills</label>
              <textarea
                value={data.skills.map(s => s.name).join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                rows={3}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                placeholder="React, TypeScript, Project Management, etc."
              />
           </div>
        )}
      </div>

      {/* Custom Sections (For Extra Pages) */}
      <div>
        <SectionHeader title="Custom Sections (Add Pages)" id="custom" icon={<PenTool size={16} />} />
        {activeSection === 'custom' && (
          <div className="p-4 bg-white dark:bg-slate-800 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 space-y-6 animate-fadeIn">
            <p className="text-xs text-slate-500 mb-2">
              Add new sections to your CV. If the first page is full, these will naturally flow to the next page.
            </p>
            {(data.customSections || []).map((sec, index) => (
              <div key={sec.id} className="relative pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                <button 
                  onClick={() => removeCustomSection(index)}
                  className="absolute right-0 top-0 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Section Title</label>
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => handleCustomSectionChange(index, 'title', e.target.value)}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      placeholder="e.g., Languages, Certifications"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Content</label>
                    <textarea
                      value={sec.content}
                      onChange={(e) => handleCustomSectionChange(index, 'content', e.target.value)}
                      rows={4}
                      className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                      placeholder="Enter text or bullet points..."
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addCustomSection}
              className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Custom Section
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default CVEditor;