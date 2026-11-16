const galleryMotion = matchMedia('(prefers-reduced-motion: reduce)');
const visibleVideos = new Set();

function updateVideos() {
  const allowPlayback = !document.hidden && !galleryMotion.matches;
  visibleVideos.forEach((video) => {
    if (allowPlayback && video.paused) video.play().catch(() => {});
    if (!allowPlayback) video.pause();
  });
}

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      visibleVideos.add(target);
    } else {
      visibleVideos.delete(target);
      target.pause();
    }
  });
  updateVideos();
}, { threshold: 0.15 });

document.querySelectorAll('video.project-media').forEach((video) => videoObserver.observe(video));

galleryMotion.addEventListener('change', updateVideos);
document.addEventListener('visibilitychange', updateVideos);
