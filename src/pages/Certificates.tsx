import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import certificatesData from '../data/certificates.json';
import CertificatesPresenter from '../components/organisms/CertificatesPresenter';
import type { CertificateItem } from '../types/certificate';

const Certificates: React.FC = () => {
  const { activePersona } = usePersona();

  const filteredCertificates = (certificatesData as unknown as CertificateItem[]).filter((cert) =>
    cert.personas.includes(activePersona),
  );

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
