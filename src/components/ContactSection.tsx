import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle2, Navigation, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !phone.trim()) return;

    try {
      const stored = localStorage.getItem('shreyash_enquiries');
      const list = stored ? JSON.parse(stored) : [];
      list.push({
        id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
        parentName,
        phone,
        query,
        date: new Date().toISOString(),
      });
      localStorage.setItem('shreyash_enquiries', JSON.stringify(list));
    } catch {}

    setEnquirySent(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0b132b] text-[#F8FAFC] relative border-b border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#818CF8] mb-3 font-regal">
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Admissions Desk & Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC]">
            Connect With Our School
          </h2>
          <p className="mt-4 text-base sm:text-lg text-indigo-200/80 font-light leading-relaxed">
            Have questions about admissions, fees, curriculum, or school visits? We are here to guide you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Phone & Action Buttons + Address & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Phone Callout Card in Deep Blue & Indigo */}
            <div className="bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#0b132b] text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/30">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6366F1]/15 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs uppercase font-semibold tracking-wider text-[#818CF8] block mb-2 font-regal">
                Main Admissions Helpline
              </span>
              <div className="text-2xl sm:text-3xl font-serif-luxury font-bold tracking-tight text-[#F8FAFC] mb-6">
                {SCHOOL_INFO.phone}
              </div>

              {/* Dedicated Buttons: "Call Now" & "WhatsApp" */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${SCHOOL_INFO.rawPhone}`}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-regal font-bold text-sm transition-all shadow-md shadow-indigo-500/25 active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${SCHOOL_INFO.whatsappPhone}?text=Hello%20Shreyash%20Vidhyalay,%20I%20would%20like%20to%20enquire%20about%20admissions%20for%20Session%20${encodeURIComponent(SCHOOL_INFO.session)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* School Contact Information Placeholders */}
            <div className="bg-[#0f172a] rounded-2xl p-6 border border-indigo-500/20 shadow-sm space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-[#818CF8] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-200/80 uppercase tracking-wider font-regal">School Address</h4>
                  <p className="text-sm font-semibold text-[#F8FAFC] mt-0.5 leading-snug">
                    {SCHOOL_INFO.address}
                  </p>
                </div>
              </div>

              {/* School Timings */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-indigo-500/15">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-[#818CF8] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-200/80 uppercase tracking-wider font-regal">School Timings</h4>
                  <p className="text-sm font-semibold text-[#F8FAFC] mt-0.5">
                    {SCHOOL_INFO.timings}
                  </p>
                  <p className="text-xs text-indigo-200/60 mt-0.5">
                    Administrative Office: {SCHOOL_INFO.officeTimings}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Location & Prominent Address Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Maps Container */}
            <div className="bg-[#0f172a] rounded-3xl p-5 border border-indigo-500/30 shadow-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 px-1 gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <MapPin className="w-4 h-4 text-[#6366F1]" />
                    <span className="font-regal uppercase tracking-wider text-[#818CF8]">Detected Campus Location</span>
                  </div>
                  <p className="text-xs text-indigo-200/70 mt-0.5">
                    {SCHOOL_INFO.address}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Shreyash Vidhyalay, ${SCHOOL_INFO.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-[#6366F1] text-[#818CF8] hover:text-white text-xs font-regal font-semibold transition-all border border-indigo-500/30"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Live Interactive Google Map Embed detected at 2-Mansarovar Park, Aji dem Chokdi, Gujarat 360003 */}
              <div className="w-full h-72 sm:h-80 rounded-2xl bg-black relative overflow-hidden border border-indigo-500/25 shadow-inner">
                <iframe
                  title="Shreyash Vidhyalay Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('2-Mansarovar Park, Aji dem Chokdi, Gujarat 360003')}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Floating Location Tag overlay */}
                <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-2 bg-[#0b132b]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-500/30 shadow-lg text-[11px] text-[#F8FAFC]">
                  <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping" />
                  <span className="font-semibold">Shreyash Vidhyalay · Aji Dam Chokdi</span>
                </div>
              </div>
            </div>

            {/* Prominent Address & Campus Visit Information Card */}
            <div className="bg-[#0f172a] rounded-2xl p-6 sm:p-7 border border-indigo-500/30 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-[#818CF8] flex items-center justify-center border border-indigo-500/30">
                    <MapPin className="w-5 h-5 text-[#6366F1]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-regal font-semibold uppercase tracking-widest text-[#818CF8]">
                      Official Registered Address
                    </span>
                    <h4 className="text-lg font-serif-luxury font-bold text-[#F8FAFC]">
                      Shreyash Vidhyalay Campus
                    </h4>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-[11px] font-regal font-semibold text-[#818CF8]">
                  Gujarat 360003
                </div>
              </div>

              {/* Full Address Block */}
              <div className="p-4 rounded-xl bg-[#0b132b] border border-indigo-500/20 space-y-1.5">
                <span className="text-[10px] text-indigo-300 font-regal tracking-wider uppercase">
                  Complete Postal Address
                </span>
                <p className="text-base sm:text-lg font-heading font-bold text-[#F8FAFC] leading-snug">
                  2-Mansarovar Park, Aji dem Chokdi, Gujarat 360003
                </p>
                <p className="text-xs text-indigo-200/70 pt-1">
                  Landmark: Near Aji Dam Chokdi Ring Road · Rajkot Highway Junction
                </p>
              </div>

              {/* Visiting Guidelines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-indigo-500/15">
                  <div className="flex items-center gap-1.5 text-[#818CF8] font-regal font-semibold uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>Inquiry Hours</span>
                  </div>
                  <p className="text-[#F8FAFC] font-medium">8:00 AM – 4:30 PM</p>
                  <p className="text-[11px] text-indigo-200/60 mt-0.5">Monday to Saturday</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-indigo-500/15">
                  <div className="flex items-center gap-1.5 text-[#818CF8] font-regal font-semibold uppercase tracking-wider mb-1">
                    <Navigation className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>How to Reach</span>
                  </div>
                  <p className="text-[#F8FAFC] font-medium">Aji Dam Chokdi Circle</p>
                  <p className="text-[11px] text-indigo-200/60 mt-0.5">Frequent bus & auto connectivity</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Shreyash Vidhyalay, 2-Mansarovar Park, Aji dem Chokdi, Gujarat 360003')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#6366F1] hover:to-[#4F46E5] text-white font-regal font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Open Directions in Maps</span>
                </a>

                <a
                  href={`tel:${SCHOOL_INFO.rawPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#F8FAFC] font-regal font-semibold text-xs uppercase tracking-wider border border-indigo-500/20 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#6366F1]" />
                  <span>Call Campus</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
