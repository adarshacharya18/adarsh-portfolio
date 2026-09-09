import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '../components/organisms/PageWrapper';
import { FiDownload, FiShare2, FiCheck, FiExternalLink, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import JsonLd from '../components/atoms/JsonLd';
import { usePersona } from '../hooks/usePersona';
import profileData from '../data/profile.json';
import seoData from '../data/seo.json';
import type { Profile, PersonaContent } from '../types/profile';
import { type PersonaType, isPersonaType, getResumeRoute } from '../types/persona';
import type { SeoConfig } from '../types/seo';

const Resume: React.FC = () => {
  const { persona: routePersona } = useParams<{ persona?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { activePersona, setPersona } = usePersona();
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const profile = profileData as unknown as Profile;
  const seo = seoData as unknown as SeoConfig;

  // Normalize /resume/overall or invalid route params to /resume
  useEffect(() => {
    if (routePersona === 'overall' || (routePersona && !isPersonaType(routePersona))) {
      navigate('/resume', { replace: true });
    }
  }, [routePersona, navigate]);

  // Determine target persona from route parameter
  const targetPersonaFromRoute: PersonaType =
    isPersonaType(routePersona) && routePersona !== 'overall' ? routePersona : 'overall';

  // Ref tracking the last handled route parameter
  const prevRoutePersonaRef = useRef(routePersona);
  const isMountedRef = useRef(false);

  // 1. Sync Route -> Header Persona (only on initial mount or when route parameter actually changes externally)
  useEffect(() => {
    const isRouteChange = !isMountedRef.current || prevRoutePersonaRef.current !== routePersona;
    isMountedRef.current = true;
    prevRoutePersonaRef.current = routePersona;

    if (isRouteChange && activePersona !== targetPersonaFromRoute) {
      setPersona(targetPersonaFromRoute);
    }
  }, [routePersona, targetPersonaFromRoute, activePersona, setPersona]);

  // 2. Sync Header Persona -> Route (when user selects a persona from the header dropdown)
  useEffect(() => {
    const expectedPath = getResumeRoute(activePersona);
    if (location.pathname !== expectedPath) {
      prevRoutePersonaRef.current = activePersona === 'overall' ? undefined : activePersona;
      navigate(expectedPath, { replace: true });
    }
  }, [activePersona, location.pathname, navigate]);

  // Clean up copy feedback timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const currentPersonaContent = (profile.personaContent as Record<PersonaType, PersonaContent>)[
    activePersona
  ];

  const resumeUrl =
    profile.personaResumes?.[activePersona] ||
    currentPersonaContent?.resumeUrl ||
    profile.resumeUrl;

  const downloadFilename = `adarsh-acharya-resume-${activePersona}-2026.pdf`;
  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adarsh.dev';
  const canonicalPath = getResumeRoute(activePersona);
  const canonicalUrl = `${originUrl}${canonicalPath}`;

  useDocumentMetadata({
    title:
      activePersona === 'overall'
        ? `${profile.name} | Resume`
        : `${profile.name} | ${currentPersonaContent?.title || 'Engineer'} Resume`,
    description:
      currentPersonaContent?.description ||
      seo.resume?.description ||
      'Software engineering resume and professional profile.',
    canonicalUrl,
  });

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(canonicalUrl).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  const resumeSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: `${profile.name} Resume (${currentPersonaContent?.title || 'Software Engineer'})`,
      description: currentPersonaContent?.description,
      url: canonicalUrl,
      author: {
        '@type': 'Person',
        name: profile.name,
        email: profile.email,
        jobTitle: currentPersonaContent?.title,
        url: originUrl,
      },
    }),
    [
      profile.name,
      profile.email,
      currentPersonaContent?.title,
      currentPersonaContent?.description,
      canonicalUrl,
      originUrl,
    ],
  );

  return (
    <PageWrapper className="space-y-4">
      <JsonLd data={resumeSchema as Record<string, unknown>} />

      {/* Centered A4 Document Wrapper */}
      <div className="w-full max-w-[850px] mx-auto space-y-3">
        {/* Action Toolbar: Copy, Download, Open in Tab */}
        <div className="flex items-center justify-end flex-wrap gap-2.5">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border-primary bg-bg-secondary hover:bg-bg-tertiary text-text-primary transition cursor-pointer shadow-soft"
            title="Copy public link to share with recruiters"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center space-x-1.5 text-accent-primary"
                >
                  <FiCheck className="w-3.5 h-3.5" />
                  <span>Copied Link!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center space-x-1.5"
                >
                  <FiShare2 className="w-3.5 h-3.5 text-text-muted" />
                  <span>Copy Link</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href={resumeUrl}
            download={downloadFilename}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-text-primary text-bg-primary hover:opacity-90 transition cursor-pointer shadow-soft"
            title="Download official PDF copy"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border-primary bg-bg-secondary hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition cursor-pointer shadow-soft"
            title="Open raw PDF file in new browser tab"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            <span>Open in Tab</span>
          </a>
        </div>

        {/* PDF Viewport Container (A4 Proportioned) */}
        <div className="w-full bg-bg-secondary border border-border-primary rounded-xl overflow-hidden shadow-card min-h-[750px] md:min-h-[1050px] lg:h-[1180px] flex flex-col">
          <object
            key={resumeUrl}
            data={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            className="w-full flex-1 min-h-[750px] md:min-h-[1050px] lg:h-[1180px]"
            aria-label={`${profile.name} Resume PDF`}
          >
            {/* Fallback for browsers / mobile without native PDF plugin */}
            <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center border border-border-primary">
                <FiFileText className="w-6 h-6 text-text-secondary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-primary">
                  Inline PDF preview not supported by this browser
                </p>
                <p className="text-xs text-text-muted max-w-sm">
                  You can download the resume directly or view it in a dedicated browser tab.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={resumeUrl}
                  download={downloadFilename}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-text-primary text-bg-primary text-xs font-semibold rounded-lg hover:opacity-90 transition shadow-soft"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-bg-tertiary text-text-primary text-xs font-semibold rounded-lg hover:bg-border-primary transition border border-border-primary shadow-soft"
                >
                  <FiExternalLink className="w-4 h-4" />
                  <span>Open in Tab</span>
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Resume;
