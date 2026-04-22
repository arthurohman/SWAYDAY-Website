import { VideoHero } from "@/components/VideoHero";
import { AboutSection } from "@/components/AboutSection";
import { SpotifySection } from "@/components/SpotifySection";
import { SocialsRow } from "@/components/SocialsRow";

export default function HomePage() {
  return (
    <>
      <VideoHero />
      <AboutSection />
      <SpotifySection />
      <SocialsRow />
    </>
  );
}
