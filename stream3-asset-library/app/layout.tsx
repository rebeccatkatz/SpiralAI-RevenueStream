export default function Layout({children}:{children:React.ReactNode}){
  return (<html lang="en"><body className="min-h-screen bg-neutral-50">
    <header className="p-6 bg-white border-b">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <b>📦 Growth Vault</b>
        <nav className="flex gap-4 text-sm"><a href="/api/auth/login">Log in</a><a href="/api/auth/logout">Log out</a></nav>
      </div>
    </header>
    <main className="max-w-5xl mx-auto p-6">{children}</main>
    <footer className="p-8 text-center text-sm text-neutral-500">© 2025 Growth Vault</footer>
  </body></html>)
}
