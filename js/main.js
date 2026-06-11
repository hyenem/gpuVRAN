// 상단 읽기 진행률 바
document.addEventListener('DOMContentLoaded', () => {
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.appendChild(bar);
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = max > 0 ? (h.scrollTop / max * 100) + '%' : '0';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

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

// 코드 블록 복사 버튼
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = '복사';
    btn.setAttribute('aria-label', '코드 복사');
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      try {
        await navigator.clipboard.writeText((code || pre).innerText);
        btn.textContent = '복사됨 ✓';
        btn.classList.add('done');
      } catch {
        btn.textContent = '실패';
      }
      setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('done'); }, 1600);
    });
    pre.appendChild(btn);
  });
});

// 키보드 단축키: '/' 검색 포커스, ←/→ 이전·다음 장 이동
document.addEventListener('DOMContentLoaded', () => {
  const isTyping = () => /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
  document.addEventListener('keydown', e => {
    if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === '/') {
      const input = document.getElementById('site-search');
      if (input) { e.preventDefault(); input.focus(); }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const pager = document.querySelector('.pager');
      if (!pager) return;
      const link = e.key === 'ArrowRight'
        ? pager.querySelector('a.next')
        : pager.querySelector('a:not(.next)');
      if (link && link.getAttribute('href')) location.href = link.getAttribute('href');
    }
  });
});

// ===== 사이트 전체 검색 =====
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('site-search');
  const box = document.getElementById('search-results');
  if (!input || !box) return;

  let index = [];
  fetch('search-index.json').then(r => r.json()).then(d => { index = d; }).catch(() => {});

  const close = () => { box.classList.remove('open'); box.innerHTML = ''; };
  const render = items => {
    box.innerHTML = items.length
      ? items.map(it =>
          `<a class="sr-item" href="${it.url}"><span class="sr-title">${it.title}</span><span class="sr-sec">${it.section}</span></a>`
        ).join('')
      : '<div class="sr-empty">검색 결과 없음</div>';
    box.classList.add('open');
  };

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) { close(); return; }
    const toks = q.split(/\s+/);
    const results = [];
    for (const it of index) {
      const hay = (it.title + ' ' + it.section + ' ' + it.text).toLowerCase();
      if (!toks.every(t => hay.includes(t))) continue;
      let score = 1;
      if (it.title.toLowerCase().includes(q)) score += 3;
      if (it.section.toLowerCase().includes(q)) score += 1;
      results.push({ it, score });
    }
    results.sort((a, b) => b.score - a.score);
    render(results.slice(0, 8).map(r => r.it));
  });

  input.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); input.blur(); } });
  document.addEventListener('click', e => {
    if (!box.contains(e.target) && e.target !== input) close();
  });
});
