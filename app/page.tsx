import Cards from "@/components/home/Cards";
import Fests from "@/components/home/Fests";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <div className="bg-navy-900">
        <Cards />
      </div>
      <Fests />
    </div>
  );
}