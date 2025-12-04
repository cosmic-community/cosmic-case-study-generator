'use client'

import { useState } from 'react'

interface DownloadButtonProps {
  caseStudyId: string
}

export default function DownloadButton({ caseStudyId }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  
  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      // In a production app, this would generate a PDF
      // For now, we'll just trigger a browser print dialog
      window.print()
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }
  
  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDownloading ? 'Preparing PDF...' : 'Download PDF'}
    </button>
  )
}