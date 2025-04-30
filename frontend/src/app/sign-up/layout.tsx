export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans">
      {/* Main Content Area */}
      <main className="flex justify-center items-center min-h-screen p-8">
        {/* Render the page content passed as children */}
        {children}
      </main>
    </div>
  );
}