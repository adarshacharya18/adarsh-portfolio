import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import contactData from '../data/contact.json';
import seoData from '../data/seo.json';
import ContactPresenter from '../components/organisms/ContactPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { ContactData } from '../types/contact';
import type { SeoConfig } from '../types/seo';

const Contact: React.FC = () => {
  const contact = contactData as unknown as ContactData;
  const seo = seoData as unknown as SeoConfig;

  useDocumentMetadata({
    title: seo.contact.title,
    description: seo.contact.description || contact.description,
  });

  const handleSubmit = async (formData: { name: string; email: string; message: string }) => {
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || contact.formAction || '';

    // If no production endpoint is set, run simulated post fallback to prevent crashings in local dev
    if (!endpoint || endpoint.includes('placeholder_id')) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Local dev fallback form submission:', formData);
      return true;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to submit form:', error);
      return false;
    }
  };

  return (
    <PageWrapper>
      <Section id="contact-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{contact.title}</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">{contact.description}</p>
      </Section>

      <ContactPresenter labels={contact.labels} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default Contact;
