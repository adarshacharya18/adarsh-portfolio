import { useEffect } from 'react';

interface MetadataProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  canonicalUrl?: string;
}

export const useDocumentMetadata = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogImage,
  canonicalUrl,
}: MetadataProps) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. OpenGraph Title
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute('content', ogTitle || title);

    // 5. OpenGraph Description
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescTag) {
      ogDescTag = document.createElement('meta');
      ogDescTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescTag);
    }
    ogDescTag.setAttribute('content', ogDescription || description);

    // 6. OpenGraph Type
    let ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (!ogTypeTag) {
      ogTypeTag = document.createElement('meta');
      ogTypeTag.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeTag);
    }
    ogTypeTag.setAttribute('content', ogType);

    // 7. OpenGraph Image & Twitter Image
    const defaultImage = 'https://adarsh.dev/avatar.png'; // Fallback link
    const targetImage = ogImage || defaultImage;

    let ogImageTag = document.querySelector('meta[property="og:image"]');
    if (!ogImageTag) {
      ogImageTag = document.createElement('meta');
      ogImageTag.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageTag);
    }
    ogImageTag.setAttribute('content', targetImage);

    // 8. Twitter Cards
    let twitterCardTag = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCardTag) {
      twitterCardTag = document.createElement('meta');
      twitterCardTag.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCardTag);
    }
    twitterCardTag.setAttribute('content', 'summary_large_image');

    let twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitleTag) {
      twitterTitleTag = document.createElement('meta');
      twitterTitleTag.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitleTag);
    }
    twitterTitleTag.setAttribute('content', ogTitle || title);

    let twitterDescTag = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescTag) {
      twitterDescTag = document.createElement('meta');
      twitterDescTag.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescTag);
    }
    twitterDescTag.setAttribute('content', ogDescription || description);

    let twitterImageTag = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImageTag) {
      twitterImageTag = document.createElement('meta');
      twitterImageTag.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImageTag);
    }
    twitterImageTag.setAttribute('content', targetImage);

    // 9. Canonical Link
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogType, ogImage, canonicalUrl]);
};

export default useDocumentMetadata;
