import React from 'react'

export default function MiddlePalmIcon() {
  return (
    <svg width="124" height="124" viewBox="0 0 124 124" fill="none">
      <rect width="124" height="124" fill="white" />
      <rect width="124" height="124" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <use
            href="#image0"
            transform="translate(0 0.130631) scale(0.00900901)"
          />
        </pattern>
        <image
          id="image0"
          width="110"
          height="91"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}
