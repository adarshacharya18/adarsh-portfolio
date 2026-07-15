import React, { useState } from 'react';
import Section from '../atoms/Section';
import type { ContactLabels } from '../../types/contact';

interface ContactPresenterProps {
  labels: ContactLabels;
  onSubmit: (formData: { name: string; email: string; message: string }) => Promise<boolean>;
}

const ContactPresenter: React.FC<ContactPresenterProps> = ({ labels, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    try {
      const success = await onSubmit({ name, email, message });
      if (success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact-form" className="max-w-xl mx-auto w-full text-left">
      <form
        onSubmit={handleSubmit}
        className="border border-border-primary rounded-xl p-6 bg-bg-secondary space-y-5 shadow-soft"
      >
        <div className="space-y-1.5">
          <label htmlFor="name-input" className="text-xs font-semibold text-text-secondary">
            {labels.name}
          </label>
          <input
            id="name-input"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            placeholder={labels.namePlaceholder}
            className="w-full text-xs p-3 rounded-lg bg-bg-primary border border-border-primary text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus transition disabled:opacity-50"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email-input" className="text-xs font-semibold text-text-secondary">
            {labels.email}
          </label>
          <input
            id="email-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder={labels.emailPlaceholder}
            className="w-full text-xs p-3 rounded-lg bg-bg-primary border border-border-primary text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus transition disabled:opacity-50"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message-input" className="text-xs font-semibold text-text-secondary">
            {labels.message}
          </label>
          <textarea
            id="message-input"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            placeholder={labels.messagePlaceholder}
            rows={5}
            className="w-full text-xs p-3 rounded-lg bg-bg-primary border border-border-primary text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus transition resize-none disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-text-primary text-bg-primary font-semibold text-xs rounded-lg hover:opacity-90 active:scale-[0.99] transition disabled:opacity-50 shadow-soft cursor-pointer"
        >
          {isSubmitting ? labels.submitting : labels.submit}
        </button>

        {status === 'success' && (
          <div className="p-3 text-2xs rounded-lg border border-border-primary bg-bg-primary text-accent-primary text-center">
            {labels.success}
          </div>
        )}

        {status === 'error' && (
          <div className="p-3 text-2xs rounded-lg border border-red-500/20 bg-bg-primary text-red-500 text-center">
            {labels.error}
          </div>
        )}
      </form>
    </Section>
  );
};

export default ContactPresenter;
