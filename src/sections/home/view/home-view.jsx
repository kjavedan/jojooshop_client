import { useScroll } from 'framer-motion';

import ScrollProgress from 'src/components/scroll-progress';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
    </>
  );
}
