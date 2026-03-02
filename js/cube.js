document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const area = document.getElementById('interaction-area');
  const dots = document.querySelectorAll('.dot');

  let angle = 0;
  let currentIndex = 0;
  let timer = null;

  // 모바일 환경 감지 함수
  const isMobile = () => window.innerWidth <= 767;

  function updateRotate() {
    cube.style.transform = `rotateY(${angle}deg)`;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
  }

  function startTimer() {
    clearInterval(timer);
    // 모바일이면 오토슬라이드 실행 방지
    if (isMobile()) return;

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
    // 수동 회전 후 모바일이 아닐 때만 타이머 재시작
    if (!isMobile()) startTimer();
  };

  // 마우스 이벤트 (데스크탑)
  area.addEventListener('mouseenter', () => clearInterval(timer));
  area.addEventListener('mouseleave', () => !isMobile() && startTimer());

  // 터치 이벤트 (모바일/데스크탑 공통)
  let touchStartX = 0;
  area.addEventListener(
    'touchstart',
    (e) => {
      clearInterval(timer); // 터치 시작 시 멈춤
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  area.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;

    if (touchEndX - touchStartX > swipeThreshold) {
      manualRotate(-1); // 우측 스와이프
    } else if (touchStartX - touchEndX > swipeThreshold) {
      manualRotate(1); // 좌측 스와이프
    } else {
      // 스와이프가 아닌 터치 종료 시 타이머 재시작
      if (!isMobile()) startTimer();
    }
  });

  // 창 크기 조절 시 대응
  window.addEventListener('resize', () => {
    if (isMobile()) clearInterval(timer);
    else startTimer();
  });

  // 초기 시작
  startTimer();
});
