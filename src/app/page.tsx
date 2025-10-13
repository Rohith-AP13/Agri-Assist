import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'hero-farming'
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AgriAssist</span>
              <Logo />
            </Link>
          </div>
          <div className="flex lg:flex-1 lg:justify-end gap-x-4">
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative flex-1 flex items-center justify-center isolate">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover -z-10 brightness-50"
            priority
          />
        )}
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-headline">
            Welcome to AgriAssist
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            Data-driven insights for higher yield, optimized resource usage, and sustainable farming.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-background/80 backdrop-blur-sm p-4">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} AgriAssist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
