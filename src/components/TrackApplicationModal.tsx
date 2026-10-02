import React, { useState, useEffect } from 'react';
import { AdmissionApplication } from '../types';
import { AdmissionReceipt } from './AdmissionReceipt';
import { PrintApplicationView } from './PrintApplicationView';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  AlertCircle,
  FileCheck,
  UserCheck,
} from 'lucide-react';

interface TrackApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAppNumber?: string;
  initialMobile?: string;
}

export const TrackApplicationModal: React.FC<TrackApplicationModalProps> = ({
  isOpen,
  onClose,
  initialAppNumber = '',
  initialMobile = '',
}) => {
  const [appNumber, setAppNumber] = useState(initialAppNumber);
  const [mobile, setMobile] = useState(initialMobile);
  const [foundApp, setFoundApp] = useState<AdmissionApplication | null>(null);
  const [searched, setSearched] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState(false);
  const [viewingPrintApp, setViewingPrintApp] = useState(false);

  useEffect(() => {
    if (initialAppNumber) {
      setAppNumber(initialAppNumber);
    }
    if (initialMobile) {
      setMobile(initialMobile);
    }
    if (initialAppNumber && initialMobile) {
      handleSearch(initialAppNumber, initialMobile);
    }
  }, [initialAppNumber, initialMobile, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (appNumParam?: string, mobileParam?: string) => {
    const searchAppNum = (appNumParam || appNumber).trim().toUpperCase();
    const searchMobile = (mobileParam || mobile).trim().replace(/\D/g, '');

    setSearched(true);

    try {
      const stored = localStorage.getItem('shreyash_applications') || localStorage.getItem('trident_applications');
      const list: AdmissionApplication[] = stored ? JSON.parse(stored) : [];

      const match = list.find((app) => {
        const appNumMatch = app.applicationNumber.toUpperCase() === searchAppNum;
        const mobileMatch =
          app.parentInfo.mobile.replace(/\D/g, '') === searchMobile ||
          app.parentInfo.mobile.endsWith(searchMobile);
        return appNumMatch && mobileMatch;
      });

      if (match) {
        setFoundApp(match);
      } else {
        // If not found in local, check if this is an initial test query
        setFoundApp(null);
      }
    } catch {
      setFoundApp(null);
    }
  };

  const stages = [
    { title: 'Application & Fee Submitted', desc: '₹1,000 received', done: true },
    { title: 'Document Verification', desc: 'Scrutiny in progress', done: true, current: true },
    { title: 'Interaction / Entrance', desc: 'Date will be sent via SMS', done: false },
    { title: 'Admission Decision', desc: 'Formal offer letter', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b132b] via-[#172554] to-[#0f172a] text-white p-6 relative border-b border-indigo-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F8FAFC]">
            Track Admission Application Status
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-indigo-200">
            Enter your Application Number and Registered Mobile Number to check real-time updates.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Lookup Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3"
          >
            <div className="sm:col-span-6">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Application Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ADM-2026-12345"
                value={appNumber}
                onChange={(e) => setAppNumber(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] font-mono"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Mobile
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10 digit number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] font-mono"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/30 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Results Area */}
          {searched && foundApp && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Application Snapshot Card */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-blue-200 gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Application No.
                    </span>
                    <div className="text-lg font-mono font-extrabold text-blue-950">
                      {foundApp.applicationNumber}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{foundApp.applicationStatus}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Student Name:</span>
                    <strong className="text-slate-900 uppercase">{foundApp.studentInfo.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Class Applying:</span>
                    <strong className="text-blue-900">{foundApp.studentInfo.classApplyingFor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date Submitted:</span>
                    <span>{foundApp.submittedAt}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Parent Name:</span>
                    <span>{foundApp.parentInfo.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Advance Fee:</span>
                    <span className="font-bold text-emerald-700">₹{foundApp.feeAmount} (PAID)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Txn Reference:</span>
                    <span className="font-mono text-slate-600">{foundApp.transactionReference}</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">
                  Admission Processing Timeline
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {stages.map((stage, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs ${
                        stage.current
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : stage.done
                          ? 'border-emerald-200 bg-emerald-50/50'
                          : 'border-slate-200 bg-slate-50 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-[10px] uppercase tracking-wider">
                          Stage 0{idx + 1}
                        </span>
                        {stage.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                      <div className="font-bold text-slate-800 text-[11px]">{stage.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{stage.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Download Receipt & Print Application */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewingReceipt(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View & Download Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewingPrintApp(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Application</span>
                </button>
              </div>
            </div>
          )}

          {/* Searched but Not Found */}
          {searched && !foundApp && (
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">No Application Record Found</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                We could not locate an application with number &quot;{appNumber}&quot; and mobile &quot;{mobile}&quot;.
                Please ensure you have entered the exact application number received after paying the ₹1,000 fee.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sub-modals for Receipt & Application Form */}
      {viewingReceipt && foundApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-2xl w-full my-6">
            <AdmissionReceipt
              application={foundApp}
              onClose={() => setViewingReceipt(false)}
            />
          </div>
        </div>
      )}

      {viewingPrintApp && foundApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-3xl w-full my-6">
            <PrintApplicationView
              application={foundApp}
              onClose={() => setViewingPrintApp(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
