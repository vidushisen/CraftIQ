import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const VoiceProductInput: React.FC<{ onTranscriptReady: (t: string) => void }> = ({ onTranscriptReady }) => {
  const { isHindi } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const sampleTranscripts = isHindi
    ? ['यह हाथ से बना हुआ जयपुरी ब्लू पॉटरी का बाउल है जिसमें प्राकृतिक रंगों से फूलों की नक्काशी की गई है।', 'यह मिथिला मधुबनी पेंटिंग है जिसे बांस की तीली और हल्दी-नील के रंगों से बनाया गया है।', 'यह बस्तर की 4000 साल पुरानी ढोकरा पीतल ढलाई कला से बनी आदिवासी संगीतकार की मूर्ति है।']
    : ['This is a handmade Jaipur blue pottery floral bowl made using powdered quartz and natural cobalt glaze.', 'This is an authentic Madhubani painting created with bamboo twigs and organic vegetable dyes.', 'This is a lost-wax cast Dhokra brass tribal musician sculpture handcrafted in Bastar.'];

  const handleSimulatedVoice = (text: string) => {
    setIsListening(true);
    setTranscript('');
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < text.length) {
        setTranscript(text.slice(0, idx + 4));
        idx += 4;
      } else {
        clearInterval(interval);
        setIsListening(false);
        setTranscript(text);
        onTranscriptReady(text);
      }
    }, 35);
  };

  const startListening = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = isHindi ? 'hi-IN' : 'en-IN';
        rec.onstart = () => { setIsListening(true); setTranscript(''); };
        rec.onresult = (e: any) => {
          const t = e.results[e.resultIndex][0].transcript;
          setTranscript(t);
          if (e.results[e.resultIndex].isFinal) onTranscriptReady(t);
        };
        rec.onerror = () => { setIsListening(false); handleSimulatedVoice(sampleTranscripts[0]); };
        rec.onend = () => setIsListening(false);
        rec.start();
        return;
      } catch {}
    }
    handleSimulatedVoice(sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)]);
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center"><Mic className="w-3.5 h-3.5" /></div>
          <div>
            <h4 className="text-xs font-bold text-craft-earth">{isHindi ? '🎙️ बोलकर बताएं (वॉयस इनपुट)' : '🎙️ Tell us about your craft (Voice)'}</h4>
            <p className="text-[10px] text-stone-500">{isHindi ? 'माइक दबाकर अपनी भाषा में बताएं, AI समझ लेगा' : 'Speak in your language to auto-populate'}</p>
          </div>
        </div>
        <button type="button" onClick={startListening} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-craft-terracotta hover:bg-craft-terracottaLight text-white'}`}>
          {isListening ? <><MicOff className="w-3.5 h-3.5" /><span>{isHindi ? 'सुन रहा हूँ...' : 'Listening...'}</span></> : <><Mic className="w-3.5 h-3.5" /><span>{isHindi ? 'बोलना शुरू करें' : 'Start Speaking'}</span></>}
        </button>
      </div>
      {transcript && (
        <div className="bg-white rounded-xl p-2.5 border border-amber-200 text-xs text-stone-800 flex items-start gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1"><span className="font-semibold text-craft-earth mr-1">{isHindi ? 'पहचाना गया:' : 'Recognized:'}</span><span className="italic">"{transcript}"</span></div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {sampleTranscripts.map((t, i) => (
          <button key={i} type="button" onClick={() => handleSimulatedVoice(t)} className="text-[10px] bg-white hover:bg-amber-100 border border-amber-200 text-stone-700 px-2 py-0.5 rounded-lg transition-colors">
            <Volume2 className="w-2.5 h-2.5 inline mr-1 text-amber-600" /><span>{t.slice(0, 32)}...</span>
          </button>
        ))}
      </div>
    </div>
  );
};
