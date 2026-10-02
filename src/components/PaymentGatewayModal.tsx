import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  ShieldCheck,
  QrCode,
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Lock,
  Loader2,
  X,
} from 'lucide-react';

interface PaymentGatewayModalProps {
  amount: number;
  studentName: string;
  classApplying: string;
  onSuccess: (paymentData: { method: string; transactionReference: string }) => void;
  onFailure: (reason: string) => void;
  onCancel: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  amount,
  studentName,
  classApplying,
  onSuccess,
  onFailure,
  onCancel,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('SBI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const generateTxnId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = 'TXN-';
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSimulatePayment = (success: boolean) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (success) {
        onSuccess({
          method:
            selectedMethod === 'upi'
              ? 'UPI / QR Code'
              : selectedMethod === 'card'
              ? 'Debit/Credit Card'
              : `Net Banking (${selectedBank})`,
          transactionReference: generateTxnId(),
        });
      } else {
        onFailure('Bank response: Transaction declined by bank / user cancelled.');
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-black via-[#0a0d10] to-[#040608] text-white p-5 sm:p-6 relative border-b border-white/10">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Payment"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e6ca85] mb-1 font-regal">
            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Secure School Payment Gateway</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
            Shreyash Vidhyalay Fee Portal
          </h3>

          <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/15 text-xs">
            <div>
              <span className="text-slate-300">Applicant: </span>
              <span className="font-semibold text-white uppercase">{studentName}</span>
              <span className="text-slate-400"> ({classApplying})</span>
            </div>
            <div className="text-right">
              <span className="text-slate-300">Amount: </span>
              <span className="font-extrabold text-[#f0d699] text-sm">₹{amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Processing State Overlay */}
        {isProcessing && (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <div>
              <h4 className="text-lg font-bold text-slate-900">Verifying Payment with Bank...</h4>
              <p className="text-xs text-slate-500 mt-1">
                Please do not refresh or close this window while we securely confirm your advance fee.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-mono">
              Secure 256-Bit Bank Handshake
            </div>
          </div>
        )}

        {!isProcessing && (
          <div className="p-6 space-y-6">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedMethod('upi')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedMethod === 'upi'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4 mb-1" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedMethod === 'card'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-1" />
                <span>Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('netbanking')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedMethod === 'netbanking'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 mb-1" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Method 1: UPI / QR Code */}
            {selectedMethod === 'upi' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  {/* Generated QR Code illustration */}
                  <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex flex-col items-center justify-center shrink-0">
                    <QrCode className="w-24 h-24 text-slate-900" />
                    <span className="text-[9px] font-bold text-blue-800 tracking-wider">BHIM UPI QR</span>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Scan with any UPI App
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      Google Pay, PhonePe, Paytm, Cred, or BHIM. Amount ₹1,000 will be auto-filled.
                    </p>
                    <div className="pt-1 text-[11px] font-mono text-slate-500">
                      UPI ID: tridentpublicschool@upi
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Or Enter Your UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. yourname@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Method 2: Debit / Credit Card */}
            {selectedMethod === 'card' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Number (RuPay, Visa, Mastercard)
                  </label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4111 2222 3333 4444"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name as printed on card"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  />
                </div>
              </div>
            )}

            {/* Method 3: Net Banking */}
            {selectedMethod === 'netbanking' && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Your Indian Bank
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Bank of Baroda'].map(
                    (bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 text-xs font-semibold rounded-xl border text-left transition-all ${
                          selectedBank === bank
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {bank}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Security disclaimer (Per prompt: DO NOT store card/UPI/payment credentials) */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Payment provider integration placeholder. No payment credentials or pins are stored on our servers.
              </span>
            </div>

            {/* Simulation Gateway Action Buttons in Luxury Gold */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => handleSimulatePayment(true)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88e3e] hover:from-[#d4af37] hover:to-[#c5a059] text-black font-regal font-bold text-base shadow-lg shadow-[#c5a059]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-5 h-5 text-black" />
                <span>CONFIRM & PAY ₹{amount.toLocaleString('en-IN')} (SUCCESS)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulatePayment(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Simulate Payment Failure / Cancel Flow</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
