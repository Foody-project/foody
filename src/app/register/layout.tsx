export const metadata = {
  title: 'Register - Find'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh' }} className="dark">{children}</body>
    </html>
  )
}
