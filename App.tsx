import React, { useState, useEffect } from 'react';
import { CVData, TemplateType, ColorTheme } from './types';
import { INITIAL_CV_DATA, JOB_ROLE_THEMES, getThemeForRole } from './constants';
import { generateCVDraft } from './services/geminiService';
import CVEditor from './components/CVEditor';
import CVPreview from './components/CVPreview';
import TemplateSelector from './components/TemplateSelector';
import { Sparkles, Printer, Briefcase, ChevronRight, Loader2, ArrowLeft, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [jobRole, setJobRole] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>(TemplateType.MINIMALIST);
  const [theme, setTheme] = useState<ColorTheme>(ColorTheme.SLATE);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Derive theme from job role when starting
  const handleStart = async () => {
    if (!jobRole.trim()) return;

    setIsGenerating(true);
    try {
      // 1. Determine theme
      const determinedTheme = getThemeForRole(jobRole);
      setTheme(determinedTheme);

      // 2. Generate content via Gemini
      const draft = await generateCVDraft(jobRole);
      
      // 3. Merge draft with structure
      setCvData(prev => ({ ...prev, ...draft }));
      setIsStarted(true);

    } catch (error: any) {
      console.error("Failed to generate CV", error);
      alert(`AI Generation failed: ${error.message || "Unknown error"}. Check console for details.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(confirm("Are you sure? This will lose all current progress.")) {
        setIsStarted(false);
        setJobRole('');
        setCvData(INITIAL_CV_DATA);
    }
  };

  // --- Landing Screen ---
  if (!isStarted) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300
        ${isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-indigo-50 to-blue-100'}`}>
        
        <button 
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 backdrop-blur text-slate-600 dark:text-slate-300 hover:bg-white/20 transition-colors"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg rotate-3 transform hover:rotate-6 transition-transform">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">CV Forge AI</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Create a perfectly tailored, modern resume in seconds. Enter your target job title and let AI build your first draft.
            </p>

            <div className="space-y-4">
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  placeholder="E.g. Senior React Developer"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-800 dark:text-white placeholder-slate-400"
                />
              </div>

              <button
                onClick={handleStart}
                disabled={!jobRole.trim() || isGenerating}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Generating Draft...
                  </>
                ) : (
                  <>
                    Build My CV <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-4 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Powered by Google Gemini 2.5 Flash
          </div>
        </div>
      </div>
    );
  }

  // --- Main Editor Interface ---
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col h-screen overflow-hidden transition-colors duration-300">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between z-10 no-print shadow-sm h-16 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={handleReset} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400" title="Back to Start">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
               CV Forge AI <span className="hidden sm:inline-block px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full uppercase tracking-wide">{jobRole}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
             onClick={toggleDarkMode}
             className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
             title="Toggle Dark Mode"
          >
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-700 font-medium text-sm transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT: Editor Panel */}
        <div className="w-full md:w-[450px] bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col no-print z-20 shadow-xl">
           <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Select Template</h3>
                <TemplateSelector selectedTemplate={activeTemplate} onSelect={setActiveTemplate} />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Content Editor</h3>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">AI Assisted</span>
              </div>
              
              <CVEditor 
                data={cvData} 
                onChange={setCvData} 
                jobRole={jobRole}
              />
           </div>
        </div>

        {/* RIGHT: Preview Panel */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-950 overflow-auto p-4 md:p-8 flex justify-center items-start print-container relative transition-colors duration-300">
           {/* We intentionally keep the CV preview white to mimic paper */}
           <div className="print-only bg-white shadow-2xl w-[210mm] min-h-[297mm] transition-all duration-300 origin-top transform scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.85] xl:scale-100">
              <CVPreview 
                data={cvData} 
                template={activeTemplate} 
                theme={theme}
              />
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;