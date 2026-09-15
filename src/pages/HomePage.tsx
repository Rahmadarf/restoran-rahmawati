import { FamilySection } from '../components/home/FamilySection'
import { FeaturedMenuSection } from '../components/home/FeaturedMenuSection'
import { GallerySection } from '../components/home/GallerySection'
import { HeroSection } from '../components/home/HeroSection'
import { LocationSection } from '../components/home/LocationSection'
import { Ribbon } from '../components/home/Ribbon'
import { StorySection } from '../components/home/StorySection'
import { Layout } from '../components/layout/Layout'

export function HomePage() {
  return (
    <Layout page="home" title="Beranda — Restoran Rahmawati">
      <main id="main">
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
