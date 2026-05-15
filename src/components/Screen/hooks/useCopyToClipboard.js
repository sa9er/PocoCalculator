import { useState, useRef } from 'react';

export function useCopyToClipboard(text) {
  const [showCopied, setShowCopied] = useState(false);
  const lastTapRef = useRef(0);
  const timerRef = useRef(null);

  const handleDisplayTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (timerRef.current) clearTimeout(timerRef.current);
      copyText(text);
    }
    lastTapRef.current = now;
  };

  const copyText = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      showCopyFeedback();
    }).catch(() => {
      fallbackCopy(value);
    });
  };

  const fallbackCopy = (value) => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showCopyFeedback();
  };

  const showCopyFeedback = () => {
    setShowCopied(true);
    timerRef.current = setTimeout(() => setShowCopied(false), 1200);
  };

  return { showCopied, handleDisplayTap };
}