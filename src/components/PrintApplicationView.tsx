import React from 'react';
import { AdmissionApplication } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';
import { SchoolLogo } from './SchoolLogo';
import { Printer, X, CheckSquare } from 'lucide-react';

interface PrintApplicationViewProps {
  application: AdmissionApplication;
  onClose?: () => void;
}

export const PrintApplicationView: React.FC<PrintApplicationViewProps> = ({
  application,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-area bg-white text-slate-800 p-6 sm:p-8 max-w-3xl mx-auto rounded-2xl border border-slate-200 shadow-xl">
      {/* Screen Controls */}
      <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Official Admission Application Form
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Application / Save PDF</span>
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

      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-blue-900 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <SchoolLogo size="md" variant="color" />
          <div>
            <div className="text-xs text-slate-600 font-semibold">{SCHOOL_INFO.affiliation}</div>
            <div className="text-[11px] text-slate-500">{SCHOOL_INFO.address}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500">Application No:</div>
          <div className="text-sm font-bold font-mono text-blue-900">{application.applicationNumber}</div>
          <div className="text-[11px] text-slate-500 mt-1">Status: Paid & Submitted</div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-base font-bold uppercase tracking-wider text-blue-950">
          Student Admission Application Form (Session {SCHOOL_INFO.session})
        </h2>
      </div>

      {/* Student Details */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md mb-3 border-l-4 border-blue-700">
          1. Student Information
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block">Student Full Name:</span>
            <span className="font-bold text-slate-900 uppercase">{application.studentInfo.fullName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Date of Birth:</span>
            <span className="font-semibold text-slate-800">{application.studentInfo.dob}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Gender:</span>
            <span className="font-semibold text-slate-800">{application.studentInfo.gender}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Class Applying For:</span>
            <span className="font-bold text-blue-800">{application.studentInfo.classApplyingFor}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-500 block">Previous School Attended:</span>
            <span className="font-medium text-slate-800">
              {application.studentInfo.previousSchool || 'N/A (First School)'}
            </span>
          </div>
        </div>
      </div>

      {/* Parent Details */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md mb-3 border-l-4 border-blue-700">
          2. Parent / Guardian Details
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block">Father / Guardian Name:</span>
            <span className="font-semibold text-slate-900 uppercase">{application.parentInfo.fatherName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Mother Name:</span>
            <span className="font-semibold text-slate-900 uppercase">{application.parentInfo.motherName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Registered Mobile Number:</span>
            <span className="font-semibold text-slate-900">{application.parentInfo.mobile}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Email Address:</span>
            <span className="font-medium text-slate-800">{application.parentInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md mb-3 border-l-4 border-blue-700">
          3. Residential Address
        </h3>
        <div className="text-xs space-y-1">
          <p className="text-slate-800">{application.addressInfo.residentialAddress}</p>
          <p className="text-slate-600">
            {application.addressInfo.city}, {application.addressInfo.state} - PIN: {application.addressInfo.pinCode}
          </p>
        </div>
      </div>

      {/* Uploaded Documents Checklist */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md mb-3 border-l-4 border-blue-700">
          4. Documents Submitted Online
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {application.documents.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-slate-800 block truncate">{doc.label}</span>
                <span className="text-[10px] text-slate-500 font-mono truncate">{doc.fileName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Confirmation Stamp */}
      <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl mb-6 text-xs flex items-center justify-between">
        <div>
          <span className="font-bold text-blue-900">Application Fee Paid: ₹1,000</span>
          <span className="text-slate-500 block text-[11px]">Txn Ref: {application.transactionReference}</span>
        </div>
        <span className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[10px] uppercase">
          Verified Online
        </span>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 pt-8 border-t border-slate-200 text-xs text-center">
        <div>
          <div className="h-10"></div>
          <div className="border-t border-slate-400 mx-8 pt-1 text-slate-600 font-medium">
            Parent / Guardian Signature
          </div>
        </div>
        <div>
          <div className="h-10"></div>
          <div className="border-t border-slate-400 mx-8 pt-1 text-slate-600 font-medium">
            Principal / Admission Incharge
          </div>
        </div>
      </div>
    </div>
  );
};
