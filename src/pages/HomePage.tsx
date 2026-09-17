import { FamilySection } from '../components/home/FamilySection'
import { FeaturedMenuSection } from '../components/home/FeaturedMenuSection'
import { GallerySection } from '../components/home/GallerySection'
import { HeroSection } from '../components/home/HeroSection'
import { LocationSection } from '../components/home/LocationSection'
import { Ribbon } from '../components/home/Ribbon'
import { StorySection } from '../components/home/StorySection'
import { Layout } from '../components/layout/Layout'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** Hero dilewati karena sudah terlihat saat halaman dibuka. */
const REVEAL_TARGETS = '#terlaris, #paket, #cerita, #galeri, .testimonial, #lokasi'

export function HomePage() {
  const mainRef = useScrollReveal<HTMLElement>(REVEAL_TARGETS)

  return (
    <Layout page="home" title="Beranda — Restoran Rahmawati">
      <main id="main" ref={mainRef}>
        <HeroSection />
        <Ribbon />
        <FeaturedMenuSection />
        <FamilySection />
        <StorySection />
        <GallerySection />
        <LocationSection />
      </main>
    </Layout>
  )
}
