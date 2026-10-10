import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Optional short text shown under the broken-image icon. */
  fallbackLabel?: string;
};

/**
 * Drop-in <img> replacement that renders a styled placeholder when the source
 * fails to load (404, offline, blocked, corrupt). Keeps the same className so
 * layout never shifts between the real image and the fallback.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackLabel,
  onError,
  onLoad,
  loading = 'lazy',
  ...rest
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'Image unavailable'}
        className={`${className} flex flex-col items-center justify-center gap-1 overflow-hidden bg-slate-100 text-slate-400 select-none`}
      >
        <ImageOff className="w-6 h-6 shrink-0" />
        {fallbackLabel ? (
          <span className="px-2 text-center text-[10px] leading-tight">{fallbackLabel}</span>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      onLoad={onLoad}
      {...rest}
    />
  );
};
