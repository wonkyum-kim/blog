'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '../hooks/useThemeStore';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((state) => state.theme);

  useEffect(
    function setScript() {
      if (!ref.current || ref.current.hasChildNodes()) {
        return;
      }
      const scriptElem = document.createElement('script');
      scriptElem.src = 'https://giscus.app/client.js';
      scriptElem.setAttribute('data-repo', 'wonkyum-kim/blog');
      scriptElem.setAttribute('data-repo-id', 'R_kgDOK7gL-A');
      scriptElem.setAttribute('data-category', 'General');
      scriptElem.setAttribute('data-category-id', 'DIC_kwDOK7gL-M4Cb3b1');
      scriptElem.setAttribute('data-mapping', 'pathname');
      scriptElem.setAttribute('data-strict', '0');
      scriptElem.setAttribute('data-reactions-enabled', '1');
      scriptElem.setAttribute('data-emit-metadata', '0');
      scriptElem.setAttribute('data-input-position', 'bottom');
      scriptElem.setAttribute('data-theme', theme);
      scriptElem.setAttribute('data-lang', 'ko');
      scriptElem.crossOrigin = 'anonymous';
      scriptElem.async = true;
      ref.current.appendChild(scriptElem);
    },
    [theme]
  );

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    // const isDarkMode = document.documentElement.classList.contains('dark');
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }, [theme]);

  return <section ref={ref} />;
}
