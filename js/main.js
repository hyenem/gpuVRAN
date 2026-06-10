// 모바일 사이드바 토글 + 현재 페이지 메뉴 하이라이트
document.addEventListener('DOMContentLoaded', () => {
  // 모바일 토글
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    sidebar.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => sidebar.classList.remove('open')));
  }

  // 현재 페이지 nav 활성화
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-group a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  // 스크롤 시 현재 섹션(h2) 하이라이트 (앵커 링크가 있는 경우)
  const heads = [...document.querySelectorAll('h2[id], h3[id]')];
  const links = new Map();
  document.querySelectorAll('.nav-group a.sub').forEach(a => {
    const id = a.getAttribute('href').split('#')[1];
    if (id) links.set(id, a);
  });
  if (heads.length && links.size) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const l = links.get(e.target.id);
          if (l) l.classList.add('active');
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    heads.forEach(h => obs.observe(h));
  }
});
