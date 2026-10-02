import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { X, ShieldCheck, FileText, RefreshCw, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  type: 'privacy' | 'terms' | 'refund' | 'documents' | 'process' | null;
  onClose: () => void;
  onApplyClick: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose, onApplyClick }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b132b] via-[#172554] to-[#0f172a] text-white p-5 sm:p-6 shrink-0 relative border-b border-indigo-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F8FAFC]">
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'terms' && 'Terms & Conditions'}
            {type === 'refund' && 'Admission Fee & Refund Policy'}
            {type === 'documents' && 'Required Admission Documents'}
            {type === 'process' && 'Admission Process (Session 2026–27)'}
          </h3>
          <p className="text-xs text-indigo-200 mt-1">{SCHOOL_INFO.name} · {SCHOOL_INFO.affiliation}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
          {type === 'privacy' && (
            <div className="space-y-4">
              <p>
                Shreyash Vidhyalay respects the privacy of students and parents. All personal data collected through
                this admission portal (including applicant names, contact numbers, residential addresses, and uploaded
                certificates) is strictly utilized for admission assessment, verification, and institutional correspondence.
              </p>
              <h4 className="font-bold text-slate-900">Payment Security</h4>
              <p>
                We do not store or process debit/credit card numbers, UPI PINs, or bank passwords on our servers. All
                payments are routed directly through secure, RBI-compliant payment gateway partners utilizing 256-bit SSL encryption.
              </p>
              <h4 className="font-bold text-slate-900">Information Disclosure</h4>
              <p>
                Student records are never sold, rented, or shared with third-party marketing agencies. Disclosure occurs only
                under legal mandates or board registration compliance.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <p>
                By accessing and submitting the online admission application for Shreyash Vidhyalay, parents and legal
                guardians agree to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                <li>Submission of the online form does not guarantee automatic admission; final enrollment is subject to seat availability, document scrutiny, and interaction.</li>
                <li>All documents submitted must be genuine. False statements or fabricated certificates will result in cancellation of the application.</li>
                <li>Students and parents agree to adhere to the disciplinary rules, code of conduct, and uniform norms established by the school management.</li>
              </ul>
            </div>
          )}

          {type === 'refund' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 font-medium">
                <strong>Advance Admission Application Fee: ₹1,000</strong>
              </div>
              <h4 className="font-bold text-slate-900">1. Advance Application Fee Terms</h4>
              <p>
                The ₹1,000 fee deposited at the time of online application submission covers administrative processing,
                digital verification, and the admission screening session.
              </p>
              <h4 className="font-bold text-slate-900">2. Refund Conditions</h4>
              <p>
                The ₹1,000 application fee is non-refundable once the application number has been generated and processing
                has commenced.
              </p>
              <h4 className="font-bold text-slate-900">3. Failed Transactions</h4>
              <p>
                In the event of an account deduction where no application number was generated due to network dropouts or
                gateway failure, the deducted amount is automatically refunded by the payment gateway to the source account
                within 5–7 banking business days.
              </p>
            </div>
          )}

          {type === 'documents' && (
            <div className="space-y-4">
              <p>
                Please ensure you have clear digital scans (PDF, JPG, or PNG, max 5MB each) of the following documents:
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Student Recent Passport Photo *</strong>
                    <span className="text-xs text-slate-500">Color photograph with white background.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Municipal Birth Certificate *</strong>
                    <span className="text-xs text-slate-500">Issued by Nagar Nigam / Gram Panchayat / Registrar.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Previous School Report Card</strong>
                    <span className="text-xs text-slate-500">Applicable for Class 1 and above.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Transfer Certificate (TC)</strong>
                    <span className="text-xs text-slate-500">Counter-signed by authorized board/education officer.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Aadhaar Card of Student & Parents</strong>
                    <span className="text-xs text-slate-500">For identity and residential verification.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'process' && (
            <div className="space-y-4">
              <p>The step-by-step admission roadmap for Shreyash Vidhyalay:</p>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-blue-50/40">
                  <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Step 1: Online Application</span>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill the online student and guardian details form and attach requested certificates.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-blue-50/40">
                  <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Step 2: Advance Fee Payment</span>
                  <p className="text-xs text-slate-600 mt-1">
                    Pay the advance registration fee of ₹1,000 via UPI, Net Banking, or Debit Card to generate your unique Application ID.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-blue-50/40">
                  <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Step 3: Document Verification & Interaction</span>
                  <p className="text-xs text-slate-600 mt-1">
                    Our admissions committee schedules an informal parent-student interaction at the school campus.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-blue-50/40">
                  <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Step 4: Formal Enrollment</span>
                  <p className="text-xs text-slate-600 mt-1">
                    Upon clearance, admission confirmation letter and welcome handbook are issued.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onApplyClick();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-bold text-xs sm:text-sm shadow-sm shadow-indigo-500/30 cursor-pointer"
          >
            Apply for Admission
          </button>
        </div>
      </div>
    </div>
  );
};
