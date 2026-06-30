import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Resume from "./components/Resume";
import MotionLayer from "./components/MotionLayer";
import { WorkContactSection } from "./components/contact/WorkContactSection";

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Resume />
      <Featured />
      <WorkContactSection />
      <MotionLayer />
    </main>
  );
}
