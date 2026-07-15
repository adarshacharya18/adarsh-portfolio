import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import contactData from '../data/contact.json';
import ContactPresenter from '../components/organisms/ContactPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { ContactData } from '../types/contact';

const Contact: React.FC = () => {
  const contact = contactData as unknown as ContactData;

  useDocumentMetadata({
    title: `${contact.title} | Developer Portfolio`,
    description: contact.description,
  });

  const handleSubmit = async (formData: { name: string; email: string; message: string }) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log('Form message received:', formData);
    return true;
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
