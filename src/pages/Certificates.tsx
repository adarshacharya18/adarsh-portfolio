import React from 'react';
import PageWrapper from '../components/organisms/PageWrapper';
import Section from '../components/atoms/Section';
import { usePersona } from '../hooks/usePersona';
import certificatesData from '../data/certificates.json';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
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

      <Section id="certificates-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
          >
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="border border-border-primary bg-bg-secondary p-6 rounded-lg flex items-start space-x-4 shadow-soft hover:border-border-focus transition"
              >
                <div className="p-3 bg-bg-tertiary rounded-lg border border-border-primary text-text-secondary shrink-0">
                  <FiAward className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-grow min-w-0">
                  <h2 className="text-sm font-semibold text-text-primary truncate">{cert.title}</h2>
                  <p className="text-xs text-text-secondary">{cert.issuer}</p>
                  <div className="flex justify-between items-center text-3xs text-text-muted font-mono pt-1">
                    <span>ID: {cert.credentialId}</span>
                    <span>{cert.date}</span>
                  </div>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-accent-primary hover:underline pt-2 cursor-pointer"
                  >
                    <span>Verify Credential</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
    </PageWrapper>
  );
};

export default Certificates;
