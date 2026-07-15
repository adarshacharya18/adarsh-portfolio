import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import certificatesData from '../data/certificates.json';
import seoData from '../data/seo.json';
import CertificatesPresenter from '../components/organisms/CertificatesPresenter';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import type { CertificateItem } from '../types/certificate';
import type { SeoConfig } from '../types/seo';

const Certificates: React.FC = () => {
  const { activePersona } = usePersona();
  const seo = seoData as unknown as SeoConfig;

  const filteredCertificates = (certificatesData as unknown as CertificateItem[]).filter(
    (cert) => activePersona === 'overall' || cert.personas.includes(activePersona),
  );

  useDocumentMetadata({
    title: seo.certificates.title,
    description: seo.certificates.description,
  });

  return (
    <PageWrapper>
      <Section id="certificates-header" className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Credentials & Certifications
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm">
          Verified professional credentials and course completions relevant to the active track.
        </p>
      </Section>

      <CertificatesPresenter certificates={filteredCertificates} activePersona={activePersona} />
    </PageWrapper>
  );
};

export default Certificates;
