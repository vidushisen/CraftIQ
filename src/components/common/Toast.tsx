import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none md:bottom-6">
      {toasts.map((toast) => {
        let bg = 'bg-white border-stone-200 text-stone-900';
        let icon = <Info className="w-5 h-5 text-blue-600" />;

        if (toast.type === 'success') {
          bg = 'bg-emerald-50 border-emerald-300 text-emerald-950';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-50 border-amber-300 text-amber-950';
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-rose-50 border-rose-300 text-rose-950';
          icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-craft-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${bg}`}
          >
            {icon}
            <div className="flex-1 text-sm">
              <div className="font-semibold leading-snug">{toast.title}</div>
              <div className="text-xs mt-0.5 opacity-90 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
