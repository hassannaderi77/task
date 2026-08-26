import React from 'react'
import { FiX } from 'react-icons/fi'

function PreviewImage({setPreviewImage, previewImage}) {
  return (
    <div
              className="
          fixed inset-0 z-[9999]
          flex items-center justify-center
          bg-black/80
          p-4
          backdrop-blur-sm
        "
              onClick={() => setPreviewImage(null)}
            >
              <div
                className="
            relative
            max-h-[95vh]
            max-w-[95vw]
          "
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  className="
              max-h-[90vh]
              max-w-[90vw]
              rounded-2xl
              object-contain
              shadow-2xl
            "
                />
    
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="
              absolute
              right-3
              top-3
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/20
              bg-black/60
              text-white
              backdrop-blur-md
              transition
              hover:bg-red-500/70
            "
                  title="بستن"
                  aria-label="بستن تصویر"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
  )
}

export default PreviewImage