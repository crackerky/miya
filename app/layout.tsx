import type { Metadata } from 'next'
import './globals.css'
import FieldNotesHeader from '@/components/FieldNotesHeader'

export const metadata: Metadata = {
  title: '研究ノート No.77 ～255haの王国解明記～',
  description: 'フィールドノート風の研究記録',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <FieldNotesHeader />
        {children}
      </body>
    </html>
  )
}
