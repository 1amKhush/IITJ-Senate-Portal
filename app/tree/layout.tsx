import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Senate Structure | IIT Jodhpur Senate Portal",
  description: "Explore the hierarchical structure of the student senate at IIT Jodhpur, including councils, boards, clubs, and committees.",
};

export default function TreeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gray-900 h-18"></div>
      <div className="min-h-screen bg-gray-900">
        {children}
      </div>
    </>

  );
}