"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface BrochureFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  brochurePdfUrl: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  query: string;
}

export default function BrochureFormDialog({
  isOpen,
  onClose,
  courseName,
  brochurePdfUrl,
}: BrochureFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    query: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof FormData]: value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name as keyof FormData]: undefined }));
    }
  };

  const downloadPdf = () => {
    // Open PDF in new tab
    window.open(brochurePdfUrl, '_blank');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitStatus('idle');

    try {
      // Submit form data to Google Sheets via API
      const response = await fetch('/api/submit-brochure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          courseName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      
      // Download PDF after successful submission
      setTimeout(() => {
        downloadPdf();
        // Close dialog after download
        setTimeout(() => {
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            college: '',
            query: '',
          });
          setSubmitStatus('idle');
          onClose();
        }, 1000);
      }, 500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-white text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Download Brochure - {courseName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-100 text-green-800 rounded text-sm">
              Thank you! Your brochure is opening in a new tab...
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-3 bg-red-100 text-red-800 rounded text-sm">
              Error submitting form. Please try again.
            </div>
          )}

          <div>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
              maxLength={10}
              className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              name="college"
              placeholder="College Name"
              value={formData.college}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full bg-black text-white border-white placeholder:text-gray-400 focus:ring-white"
            />
            {errors.college && (
              <p className="text-red-500 text-sm mt-1">{errors.college}</p>
            )}
          </div>

          <div>
            <textarea
              name="query"
              placeholder="Your Query (Optional)"
              value={formData.query}
              onChange={handleInputChange}
              disabled={loading}
              rows={3}
              className="w-full bg-black text-white border border-white rounded-md px-3 py-2 placeholder:text-gray-400 focus:ring-white focus:outline-none resize-none"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-base h-14 min-h-[56px] shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Download Brochure'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

