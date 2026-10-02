import React from 'react';
import { AdmissionApplication } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';
import { SchoolLogo } from './SchoolLogo';
import { Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface AdmissionReceiptProps {
  application: AdmissionApplication;
  onClose?: () => void;
}

export const AdmissionReceipt: React.FC<AdmissionReceiptProps> = ({ application, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-area bg-white text-slate-800 p-6 sm:p-8 max-w-2xl mx-auto rounded-2xl border border-slate-200 shadow-xl">
      {/* Header controls for screen */}
      <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Official Fee Payment Receipt
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt / PDF</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Official Receipt Header */}
      <div className="flex items-start justify-between border-b-2 border-blue-900 pb-5 mb-5">
        <div className="flex items-start gap-3">
          <SchoolLogo size="md" variant="color" />
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {SCHOOL_INFO.affiliation}
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">
              {SCHOOL_INFO.address}
            </div>
            <div className="text-[11px] text-slate-500">
              Helpline: {SCHOOL_INFO.phone} · {SCHOOL_INFO.email}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block px-2.5 py-1 bg-blue-50 text-blue-800 rounded font-bold text-xs uppercase tracking-wider border border-blue-200">
            E-Receipt
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            {application.transactionReference}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-blue-950 uppercase tracking-wide">
          Advance Admission Fee Receipt
        </h2>
        <p className="text-xs text-slate-500">Academic Session {SCHOOL_INFO.session}</p>
      </div>

      {/* Primary Key-Value Details */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
        <div>
          <span className="text-slate-500 block">Application Number:</span>
          <span className="font-bold text-blue-900 text-sm font-mono">{application.applicationNumber}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Date & Time:</span>
          <span className="font-semibold text-slate-800">{application.submittedAt}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Student Name:</span>
          <span className="font-bold text-slate-900 uppercase">{application.studentInfo.fullName}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Class Applying For:</span>
          <span className="font-semibold text-slate-900">{application.studentInfo.classApplyingFor}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Father / Guardian:</span>
          <span className="font-medium text-slate-800">{application.parentInfo.fatherName}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Registered Mobile:</span>
          <span className="font-medium text-slate-800">{application.parentInfo.mobile}</span>
        </div>
      </div>

      {/* Payment Breakup Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-4">Description</th>
              <th className="py-2.5 px-4 text-right">Amount (INR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 px-4">
                <div className="font-semibold text-slate-800">
                  Advance Admission Application & Processing Fee
                </div>
                <div className="text-[11px] text-slate-500">
                  Non-refundable initial admission registration fee for Session {SCHOOL_INFO.session}
                </div>
              </td>
              <td className="py-3 px-4 text-right font-medium text-slate-900">
                ₹1,000.00
              </td>
            </tr>
            <tr className="bg-blue-50/60 font-bold text-blue-950">
              <td className="py-2.5 px-4 text-sm">Total Paid</td>
              <td className="py-2.5 px-4 text-right text-base text-blue-900">₹1,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Meta */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Payment Status: <strong>SUCCESS (CONFIRMED)</strong> via {application.paymentMethod || 'Online Gateway'}
          </span>
        </div>
        <div className="text-slate-500 text-[11px] mt-1 sm:mt-0 font-mono">
          Ref: {application.transactionReference}
        </div>
      </div>

      {/* Seal & Authorized Signature representation */}
      <div className="grid grid-cols-2 items-end pt-4 border-t border-slate-200 text-xs">
        <div>
          <div className="inline-block p-2 border-2 border-dashed border-emerald-600 rounded-lg text-emerald-700 font-bold text-[10px] uppercase text-center rotate-[-4deg]">
            Shreyash Vidhyalay
            <br />
            ★ FEE RECEIVED ★
            <br />
            GUJARAT
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="font-serif italic text-blue-900 font-semibold text-sm">
            Admissions Accounts Office
          </div>
          <div className="border-t border-slate-300 pt-1 text-[11px] text-slate-500">
            Computer Generated Valid Receipt
          </div>
        </div>
      </div>
    </div>
  );
};
