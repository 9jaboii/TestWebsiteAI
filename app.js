// Minimal JS to enhance UX: render cards, search, sort
(function(){
  const list = document.getElementById('file-data');
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const sortSel = document.getElementById('sort');

  /** Parse file data from the hidden list (noscript-safe source of truth) */
  const files = Array.from(list.querySelectorAll('li')).map(li => ({
    name: li.dataset.name,
    href: li.dataset.href,
    year: Number(li.dataset.year)
  }));

  function render(items){
    grid.innerHTML = '';
    if (!items.length){
      grid.innerHTML = `<p class="muted">No matches.</p>`;
      return;
    }
    for (const f of items){
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <div class="title">${f.name.replace('NASDAQ_', '')}</div>
        <div class="badge" aria-label="Year">
          <span>📄</span><span>${f.year}</span>
        </div>
        <div class="btn-row">
          <a class="button primary" href="${f.href}" target="_blank" rel="noopener">Open</a>
          <a class="button ghost" href="${f.href}" download>Download</a>
        </div>
      `;
      grid.appendChild(el);
    }
  }

  function apply(){
    const q = (search.value || '').toLowerCase().trim();
    let out = files.filter(f => f.name.toLowerCase().includes(q));
    switch (sortSel.value){
      case 'year-asc': out.sort((a,b) => a.year - b.year); break;
      case 'name-asc': out.sort((a,b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': out.sort((a,b) => b.name.localeCompare(a.name)); break;
      default: out.sort((a,b) => b.year - a.year);
    }
    render(out);
  }

  // wire up
  search.addEventListener('input', apply);
  sortSel.addEventListener('change', apply);


  // initial paint
  apply();
})();
