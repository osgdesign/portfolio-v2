document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const area = document.getElementById('interaction-area');
  const dots = document.querySelectorAll('.dot');

  let angle = 0;
  let currentIndex = 0;
  let timer = null;

  function updateRotate() {
    cube.style.transform = `rotateY(${angle}deg)`;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % 3;
      angle -= 120;
      updateRotate();
    }, 3000);
  }

  window.manualRotate = function (direction) {
    clearInterval(timer);
    currentIndex = (currentIndex + direction + 3) % 3;
    angle -= direction * 120;
    updateRotate();
    startTimer();
  };

  // 마우스 이벤트
  area.addEventListener('mouseenter', () => {
    clearInterval(timer);
    timer = null;
  });

  area.addEventListener('mouseleave', () => {
    startTimer();
  });

  // 모바일 터치 이벤트
  let touchStartX = 0;
  let touchEndX = 0;

  area.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  area.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchEndX - touchStartX > swipeThreshold) {
      manualRotate(-1);
    } else if (touchStartX - touchEndX > swipeThreshold) {
      manualRotate(1);
    }
  });

  // 초기 시작
  startTimer();
});
