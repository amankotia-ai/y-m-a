const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function revealHeading(heading) {
  const title = heading.textContent.trim();
  const words = title.split(/\s+/).map((word) => {
    const span = document.createElement('span');
    span.className = 'reveal-word';
    span.textContent = word;
    span.setAttribute('aria-hidden', 'true');
    return span;
  });

  heading.setAttribute('aria-label', title);
  heading.replaceChildren();
  words.forEach((word, index) => {
    if (index > 0) heading.append(' ');
    heading.append(word);
  });

  // Measure the wrapped lines so the stagger follows the current viewport.
  let line = -1;
  let previousTop;
  const linePositions = words.map((word) => word.offsetTop);

  words.forEach((word, index) => {
    const top = linePositions[index];
    if (top !== previousTop) line += 1;
    word.style.setProperty('--line', line);
    previousTop = top;
  });

  heading.classList.add('is-revealing');
  words.at(-1).addEventListener('animationend', () => {
    heading.classList.remove('is-revealing');
  }, { once: true });
}

if (!reducedMotion.matches) {
  revealHeading(document.querySelector('#studio-intro'));

  const approach = document.querySelector('#studio-approach');
  const headingObserver = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      observer.disconnect();
      if (!reducedMotion.matches) revealHeading(entry.target);
    }
  }, { threshold: 0.45 });
  headingObserver.observe(approach);
}
