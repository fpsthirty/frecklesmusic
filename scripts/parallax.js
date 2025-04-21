document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.parallax-content');
  
  function updateParallax() {
    const scrollTop = window.pageYOffset;
    
    // Параллакс только для контента
    content.style.transform = `translateY(${scrollTop * 0.3}px)`;
    content.style.opacity = 1 - Math.min(scrollTop / 300, 0.5);
    
    requestAnimationFrame(updateParallax);
  }
  
  updateParallax();
});