export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans bg-navy min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-navy via-navy-light to-navy -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fulvous/5 via-transparent to-transparent -z-10" />
      {children}
    </div>
  );
}