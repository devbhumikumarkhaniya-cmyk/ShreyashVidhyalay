import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentInfo,
  ParentInfo,
  AddressInfo,
  UploadedDoc,
  AdmissionApplication,
} from '../types';
import { SCHOOL_INFO, CLASS_OPTIONS } from '../data/schoolData';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { AdmissionReceipt } from './AdmissionReceipt';
import { PrintApplicationView } from './PrintApplicationView';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileCheck,
  CreditCard,
  Printer,
  Download,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Search,
} from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackApp: (appNumber: string, mobile: string) => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  onTrackApp,
}) => {
  // Wizard steps: 'form' | 'review' | 'payment_summary' | 'gateway' | 'failed' | 'success'
  const [currentStep, setCurrentStep] = useState<
    'form' | 'review' | 'payment_summary' | 'gateway' | 'failed' | 'success'
  >('form');

  // Form State
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: '',
    dob: '',
    gender: '',
    classApplyingFor: '',
    previousSchool: '',
  });

  const [parentInfo, setParentInfo] = useState<ParentInfo>({
    fatherName: '',
    motherName: '',
    mobile: '',
    email: '',
  });

  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    residentialAddress: '',
    city: 'Patna',
    state: 'Bihar',
    pinCode: '',
  });

  const [documents, setDocuments] = useState<UploadedDoc[]>([
    { id: 'photo', label: 'Student Photograph', required: true },
    { id: 'birth_cert', label: 'Birth Certificate', required: true },
    { id: 'report_card', label: 'Previous School Report Card', required: false },
    { id: 'tc', label: 'Transfer Certificate (if applicable)', required: false },
    { id: 'other_doc', label: 'Other Required Document (Aadhaar / ID)', required: false },
  ]);

  const [isConfirmedAccurate, setIsConfirmedAccurate] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Payment & Result State
  const [completedApplication, setCompletedApplication] = useState<AdmissionApplication | null>(null);
  const [paymentFailureReason, setPaymentFailureReason] = useState<string>('');
  const [viewingReceipt, setViewingReceipt] = useState(false);
  const [viewingPrintApp, setViewingPrintApp] = useState(false);

  if (!isOpen) return null;

  // Validation logic
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Student Info
    if (!studentInfo.fullName.trim()) errors.fullName = 'Student Full Name is required';
    if (!studentInfo.dob) errors.dob = 'Date of Birth is required';
    if (!studentInfo.gender) errors.gender = 'Please select gender';
    if (!studentInfo.classApplyingFor) errors.classApplyingFor = 'Please select class applying for';

    // Parent Info
    if (!parentInfo.fatherName.trim()) errors.fatherName = "Father's name is required";
    if (!parentInfo.motherName.trim()) errors.motherName = "Mother's name is required";

    // Indian Phone validation (10 digits, usually starting 6-9)
    const cleanPhone = parentInfo.mobile.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!parentInfo.email || !emailRegex.test(parentInfo.email)) {
      errors.email = 'Enter a valid email address';
    }

    // Address
    if (!addressInfo.residentialAddress.trim()) errors.residentialAddress = 'Residential address is required';
    if (!addressInfo.city.trim()) errors.city = 'City is required';
    if (!addressInfo.state.trim()) errors.state = 'State is required';
    if (!addressInfo.pinCode.trim() || addressInfo.pinCode.length < 6) errors.pinCode = 'Valid 6-digit PIN code required';

    // Checkbox confirmation
    if (!isConfirmedAccurate) {
      errors.isConfirmed = 'Please confirm that the information provided is accurate';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(`File size exceeds 5MB limit: ${file.name}`);
      return;
    }

    // Validate type (image or pdf)
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      alert('Only PDF and image formats (JPG, PNG) are supported.');
      return;
    }

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              file: {
                name: file.name,
                size: file.size,
                type: file.type,
              },
            }
          : d
      )
    );
  };

  const handleRemoveFile = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, file: undefined } : d))
    );
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep('review');
    }
  };

  const handleProceedToPaymentSummary = () => {
    setCurrentStep('payment_summary');
  };

  const handleOpenGateway = () => {
    setCurrentStep('gateway');
  };

  const handlePaymentSuccess = (paymentMeta: { method: string; transactionReference: string }) => {
    // Generate unique Application Number
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newAppNumber = `ADM-${new Date().getFullYear()}-${randomSuffix}`;
    const nowStr = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newApp: AdmissionApplication = {
      applicationNumber: newAppNumber,
      transactionReference: paymentMeta.transactionReference,
      submittedAt: nowStr,
      studentInfo,
      parentInfo,
      addressInfo,
      documents: documents
        .filter((d) => d.file)
        .map((d) => ({
          label: d.label,
          fileName: d.file!.name,
          fileSize: d.file!.size,
        })),
      feeAmount: SCHOOL_INFO.applicationFee,
      paymentStatus: 'PAID',
      applicationStatus: 'Under Document Verification',
      paymentMethod: paymentMeta.method,
    };

    // Save to localStorage for tracking later
    try {
      const stored = localStorage.getItem('shreyash_applications') || localStorage.getItem('trident_applications');
      const list: AdmissionApplication[] = stored ? JSON.parse(stored) : [];
      list.unshift(newApp);
      localStorage.setItem('shreyash_applications', JSON.stringify(list));
    } catch {
      // storage unavailable fallback
    }

    setCompletedApplication(newApp);
    setCurrentStep('success');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handlePaymentFailure = (reason: string) => {
    setPaymentFailureReason(reason);
    setCurrentStep('failed');
  };

  const handleResetForm = () => {
    setCurrentStep('form');
    setCompletedApplication(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b132b] via-[#0f172a] to-[#172554] text-white p-5 sm:p-6 shrink-0 relative border-b border-indigo-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#818CF8] mb-1 font-regal">
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span>Admission Session: {SCHOOL_INFO.session}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F8FAFC]">
            Start Your Admission Journey
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-indigo-100/80">
            Please fill in the details below to submit your admission application.
          </p>

          {/* Stepper Indicator in Indigo */}
          <div className="mt-4 pt-3 border-t border-indigo-500/20 flex items-center justify-between text-[11px] sm:text-xs">
            <span className={currentStep === 'form' ? 'text-[#818CF8] font-bold' : 'text-slate-400'}>
              1. Application Form
            </span>
            <span className="text-slate-600">→</span>
            <span className={currentStep === 'review' ? 'text-[#818CF8] font-bold' : 'text-slate-400'}>
              2. Review Details
            </span>
            <span className="text-slate-600">→</span>
            <span className={currentStep === 'payment_summary' || currentStep === 'gateway' ? 'text-[#818CF8] font-bold' : 'text-slate-400'}>
              3. ₹1,000 Advance Fee
            </span>
            <span className="text-slate-600">→</span>
            <span className={currentStep === 'success' ? 'text-[#818CF8] font-bold' : 'text-slate-400'}>
              4. Confirmation
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {/* ================= STEP 1: FORM ================= */}
          {currentStep === 'form' && (
            <form onSubmit={handleProceedToReview} className="space-y-8">
              {/* 1. Student Information */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Student Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Student Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={studentInfo.fullName}
                      onChange={(e) => setStudentInfo({ ...studentInfo, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {validationErrors.fullName && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.fullName}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={studentInfo.dob}
                      onChange={(e) => setStudentInfo({ ...studentInfo, dob: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {validationErrors.dob && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.dob}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={studentInfo.gender}
                      onChange={(e) =>
                        setStudentInfo({
                          ...studentInfo,
                          gender: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.gender}</p>
                    )}
                  </div>

                  {/* Class Applying For */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Class Applying For *
                    </label>
                    <select
                      value={studentInfo.classApplyingFor}
                      onChange={(e) =>
                        setStudentInfo({ ...studentInfo, classApplyingFor: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Class</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {validationErrors.classApplyingFor && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.classApplyingFor}</p>
                    )}
                  </div>

                  {/* Previous School Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Previous School Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. St. Xavier's / DPS (or leave blank if Nursery)"
                      value={studentInfo.previousSchool}
                      onChange={(e) =>
                        setStudentInfo({ ...studentInfo, previousSchool: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Parent / Guardian Information */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Parent / Guardian Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Father / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={parentInfo.fatherName}
                      onChange={(e) => setParentInfo({ ...parentInfo, fatherName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {validationErrors.fatherName && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.fatherName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mother Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunita Sharma"
                      value={parentInfo.motherName}
                      onChange={(e) => setParentInfo({ ...parentInfo, motherName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {validationErrors.motherName && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.motherName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent / Guardian Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-semibold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={parentInfo.mobile}
                        onChange={(e) =>
                          setParentInfo({
                            ...parentInfo,
                            mobile: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                    {validationErrors.mobile && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.mobile}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={parentInfo.email}
                      onChange={(e) => setParentInfo({ ...parentInfo, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {validationErrors.email && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Residential Address */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Residential Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Residential Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House No, Apartment / Street, Landmark"
                      value={addressInfo.residentialAddress}
                      onChange={(e) =>
                        setAddressInfo({ ...addressInfo, residentialAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {validationErrors.residentialAddress && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.residentialAddress}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patna"
                      value={addressInfo.city}
                      onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bihar"
                      value={addressInfo.state}
                      onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 800001"
                      value={addressInfo.pinCode}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          pinCode: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    {validationErrors.pinCode && (
                      <p className="text-xs text-rose-500 mt-1">{validationErrors.pinCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Document Upload */}
              <div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      Document Upload
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500">PDF, JPG, PNG (Max 5MB each)</span>
                </div>

                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          {doc.file ? (
                            <FileCheck className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800">
                            {doc.label} {doc.required && <span className="text-rose-500">*</span>}
                          </div>
                          {doc.file ? (
                            <div className="text-[11px] text-emerald-700 font-mono">
                              {doc.file.name} ({(doc.file.size / 1024).toFixed(0)} KB)
                            </div>
                          ) : (
                            <div className="text-[11px] text-slate-400">Not uploaded yet</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {doc.file ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(doc.id)}
                            className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded font-medium transition-colors"
                          >
                            Remove
                          </button>
                        ) : (
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-blue-700 hover:bg-blue-50 shadow-sm transition-colors flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Select File</span>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => handleFileUpload(doc.id, e)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accuracy Confirmation Checkbox */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isConfirmedAccurate}
                    onChange={(e) => setIsConfirmedAccurate(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    I confirm that the information provided is accurate.
                  </span>
                </label>
                {validationErrors.isConfirmed && (
                  <p className="text-xs text-rose-500 mt-1 pl-7">{validationErrors.isConfirmed}</p>
                )}
              </div>

              {/* Proceed Button */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-regal font-bold text-sm shadow-md shadow-indigo-500/25 cursor-pointer"
                >
                  <span>Review Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: REVIEW ================= */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-heading font-bold text-base text-slate-900 mb-3">
                  Please Review Your Application Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Student Name:</span>
                    <strong className="text-slate-900 text-sm uppercase">{studentInfo.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Class Applying For:</span>
                    <strong className="text-indigo-600 text-sm">{studentInfo.classApplyingFor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date of Birth / Gender:</span>
                    <span>{studentInfo.dob} · {studentInfo.gender}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Previous School:</span>
                    <span>{studentInfo.previousSchool || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Father / Mother:</span>
                    <span>{parentInfo.fatherName} / {parentInfo.motherName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mobile & Email:</span>
                    <span>{parentInfo.mobile} · {parentInfo.email}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Address:</span>
                    <span>
                      {addressInfo.residentialAddress}, {addressInfo.city}, {addressInfo.state} - {addressInfo.pinCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents attached */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Uploaded Documents
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {documents.filter((d) => d.file).map((d) => (
                    <div key={d.id} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <span className="font-semibold text-slate-800 block truncate">{d.label}</span>
                        <span className="text-[10px] text-slate-500 font-mono truncate">{d.file?.name}</span>
                      </div>
                    </div>
                  ))}
                  {documents.filter((d) => d.file).length === 0 && (
                    <p className="text-xs text-slate-400 italic">No files attached (can be submitted at school desk during interaction).</p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep('form')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToPaymentSummary}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-regal font-bold text-sm shadow-md shadow-indigo-500/25 cursor-pointer"
                >
                  <span>Proceed to Advance Fee Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: ADVANCE ADMISSION FEE SUMMARY ================= */}
          {currentStep === 'payment_summary' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto py-2">
                <h3 className="text-2xl font-serif-luxury font-bold text-slate-900">
                  Admission Application Fee
                </h3>
                <div className="mt-4 text-4xl sm:text-5xl font-serif-luxury font-bold text-[#4F46E5] tracking-tight">
                  ₹1,000
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  An advance admission fee of ₹1,000 is required to submit the application.
                </p>
              </div>

              {/* Payment Summary Box */}
              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600 pb-2 border-b border-slate-200">
                  <span>Application Fee:</span>
                  <span className="font-semibold text-slate-800">₹1,000</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-slate-900 pt-1">
                  <span>Total Payable:</span>
                  <span className="text-lg text-[#4F46E5] font-bold">₹1,000</span>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Official School Payment Gateway · Instant E-Receipt Generated</span>
              </div>

              {/* Large Payment CTA in Royal Indigo */}
              <div className="max-w-md mx-auto space-y-3 pt-4">
                <button
                  type="button"
                  onClick={handleOpenGateway}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#4338CA] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-regal font-bold text-base shadow-xl shadow-indigo-500/30 transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5 text-white" />
                  <span>PAY ₹1,000 & SUBMIT APPLICATION</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep('review')}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Back to Review
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: PAYMENT FAILED ================= */}
          {currentStep === 'failed' && (
            <div className="text-center py-6 max-w-lg mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                  Payment Unsuccessful
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your application has not been completed because the payment was not successful.
                </p>
                {paymentFailureReason && (
                  <p className="mt-1 text-xs text-rose-600 font-mono">{paymentFailureReason}</p>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentStep('gateway')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm shadow-md"
                >
                  Try Payment Again
                </button>

                <button
                  onClick={() => setCurrentStep('review')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm"
                >
                  Review Application
                </button>
              </div>

              <div className="pt-4 text-xs text-slate-400">
                Note: No application ID is issued until fee payment is verified.
              </div>
            </div>
          )}

          {/* ================= STEP 5: SUCCESS ================= */}
          {currentStep === 'success' && completedApplication && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                  Application Submitted Successfully!
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Your admission application and advance fee payment have been received successfully.
                </p>
              </div>

              {/* Prominent Application & Transaction Card */}
              <div className="max-w-md mx-auto bg-blue-50/80 rounded-2xl p-5 border border-blue-200 text-left space-y-2">
                <div className="text-center pb-2 border-b border-blue-200">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Your Application Number
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-blue-900 mt-0.5">
                    {completedApplication.applicationNumber}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div>
                    <span className="text-slate-500 block">Payment Amount:</span>
                    <strong className="text-slate-900 text-sm">₹1,000</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date & Time:</span>
                    <span className="text-slate-800 font-medium">{completedApplication.submittedAt}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Transaction Reference:</span>
                    <span className="text-slate-700 font-mono">{completedApplication.transactionReference}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Please save your application number. You can track your admission status anytime using your
                application number and registered mobile number ({completedApplication.parentInfo.mobile}).
              </p>

              {/* Action Buttons: "Download Receipt", "Print Application", "Back to Home" */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setViewingReceipt(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>

                <button
                  onClick={() => setViewingPrintApp(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Application</span>
                </button>

                <button
                  onClick={() => {
                    handleResetForm();
                    onTrackApp(
                      completedApplication.applicationNumber,
                      completedApplication.parentInfo.mobile
                    );
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm"
                >
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>Track Application</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-semibold"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gateway Modal Overlay */}
      {currentStep === 'gateway' && (
        <PaymentGatewayModal
          amount={SCHOOL_INFO.applicationFee}
          studentName={studentInfo.fullName}
          classApplying={studentInfo.classApplyingFor}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
          onCancel={() => setCurrentStep('payment_summary')}
        />
      )}

      {/* Modal for viewing/printing receipt */}
      {viewingReceipt && completedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-2xl w-full my-6">
            <AdmissionReceipt
              application={completedApplication}
              onClose={() => setViewingReceipt(false)}
            />
          </div>
        </div>
      )}

      {/* Modal for viewing/printing full application */}
      {viewingPrintApp && completedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-3xl w-full my-6">
            <PrintApplicationView
              application={completedApplication}
              onClose={() => setViewingPrintApp(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
