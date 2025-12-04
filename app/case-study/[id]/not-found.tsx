// app/case-study/[id]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Case Study Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The case study you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Analyze Your Website
        </Link>
      </div>
    </div>
  )
}