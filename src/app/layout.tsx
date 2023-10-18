import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Providers from './Providers'
import Navbar from '@/components/Navbar'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Doctor Finder',
  description: 'Looking for a doctor? We can help you find one!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
