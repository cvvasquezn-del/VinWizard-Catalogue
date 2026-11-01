document.documentElement.classList.add('js');
(() => {
  const $ = selector => document.querySelector(selector);
  const pages = Array.from(document.querySelectorAll('#book > .page'));
  const book = $('#book');
  const frame = $('#book-frame');
  const area = $('#book-area');
  const reader = $('#reader');
  const nav = globalThis.VWBook;
  const count = pages.length;
  const wide = matchMedia('(min-width: 1000px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = nav.fromHash(location.hash, count);
  let reading = false;
  let toastTimer;
  const focusOrigins = new WeakMap();
  let gesture;
  let scrollFrame;

  function visible() { return nav.visible(current, count, wide.matches); }
  function clonePage(page) {
    const copy = page.cloneNode(true);
    copy.removeAttribute('id');
    copy.removeAttribute('hidden');
    copy.classList.remove('is-visible');
    return copy;
  }
  function setHash() {
    try { history.replaceState(null, '', `#page=${current + 1}`); } catch { /* file previews may restrict history */ }
  }
  function updateControls(indices) {
    const first = indices[0] + 1;
    const last = indices.at(-1) + 1;
    $('#page-counter').textContent = `${first === last ? first : `${first}–${last}`} / ${count}`;
    $('#page-counter').setAttribute('aria-label', `Page ${first === last ? first : `${first} to ${last}`} of ${count}. Open contents`);
    $('#previous-button').disabled = indices[0] === 0;
    $('#next-button').disabled = indices.at(-1) === count - 1;
    $('#progress-fill').style.width = `${last / count * 100}%`;
    $('#live-status').textContent = `Page ${first}${first === last ? '' : ` to ${last}`} of ${count}: ${pages[indices[0]].getAttribute('aria-label').split(': ').slice(1).join(': ')}`;
    document.querySelectorAll('.chapter-link').forEach(button => {
      if (indices.includes(Number(button.dataset.page))) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }
  function fit() {
    if (reading) {
      const scale = Math.min(1, (reader.clientWidth - 2) / 794);
      reader.querySelectorAll('.reading-sheet').forEach(sheet => {
        sheet.style.width = `${794 * scale}px`;
        sheet.style.height = `${1123 * scale}px`;
        sheet.firstElementChild.style.transform = `scale(${scale})`;
      });
      return;
    }
    const styles = getComputedStyle(area);
    const width = area.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    const height = area.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
    const rawWidth = 794 * visible().length;
    const scale = Math.min(width / rawWidth, height / 1123, 1);
    frame.style.width = `${rawWidth * scale}px`;
    frame.style.height = `${1123 * scale}px`;
    book.style.width = `${rawWidth}px`;
    book.style.transform = `scale(${Math.max(.1, scale)})`;
  }
  function render(direction = 0) {
    const indices = visible();
    pages.forEach((page, index) => {
      const active = indices.includes(index);
      page.classList.toggle('is-visible', active);
      page.hidden = !active;
    });
    book.classList.toggle('spread', indices.length === 2);
    frame.classList.remove('turn-forward', 'turn-back');
    if (direction && !reduced.matches && !reading) {
      void frame.offsetWidth;
      frame.classList.add(direction > 0 ? 'turn-forward' : 'turn-back');
    }
    updateControls(reading ? [current] : indices);
    setHash();
    fit();
  }
  function goTo(index, direction = 0) {
    current = nav.start(index, count, false);
    render(direction);
    if (reading) reader.children[current]?.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
  }
  function turn(direction) {
    if (reading) goTo(Math.max(0, Math.min(count - 1, current + direction)), direction);
    else goTo(nav.move(current, direction, count, wide.matches), direction);
  }
  function openDialog(dialog) {
    focusOrigins.set(dialog, document.activeElement);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function closeDialog(dialog) { dialog.close(); }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
      }
    });
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
      const origin = focusOrigins.get(dialog);
      if (origin?.isConnected) origin.focus({ preventScroll: true });
    });
  });
  function toast(message) {
    const element = $('#toast');
    clearTimeout(toastTimer);
    element.textContent = message;
    element.hidden = false;
    toastTimer = setTimeout(() => { element.hidden = true; }, 3000);
  }
  function toggleReading() {
    if (scrollFrame) { cancelAnimationFrame(scrollFrame); scrollFrame = null; }
    reading = !reading;
    document.body.classList.toggle('reading', reading);
    area.hidden = reading;
    reader.hidden = !reading;
    $('#reading-button').setAttribute('aria-pressed', String(reading));
    $('#reading-button').setAttribute('aria-label', reading ? 'Return to book view' : 'Read all pages continuously');
    $('#reading-button span').textContent = reading ? 'Book' : 'Read';
    $('#reading-button').title = reading ? 'Return to book view' : 'Read all pages continuously';
    if (reading && !reader.children.length) {
      pages.forEach((page, index) => {
        const sheet = document.createElement('div');
        sheet.className = 'reading-sheet';
        sheet.dataset.index = index;
        sheet.style.scrollMarginTop = '100px';
        sheet.append(clonePage(page));
        reader.append(sheet);
      });
    }
    render();
    if (reading) reader.children[current].scrollIntoView({ block: 'start' });
    else window.scrollTo({ top: 0 });
  }
  function zoom() {
    const container = $('#zoom-content');
    container.replaceChildren(...(reading ? [current] : visible()).map(index => clonePage(pages[index])));
    $('#zoom-title').textContent = reading ? `Page ${current + 1} detail` : 'Page detail';
    openDialog($('#zoom-dialog'));
    $('#zoom-dialog').scrollTop = 0;
    $('#zoom-dialog').scrollLeft = 0;
  }
  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close]');
    if (close) { closeDialog(close.closest('dialog')); return; }
    const pageLink = event.target.closest('[data-page]');
    if (pageLink) {
      event.preventDefault();
      const dialog = pageLink.closest('dialog');
      if (dialog) closeDialog(dialog);
      goTo(Number(pageLink.dataset.page));
      return;
    }
    const detail = event.target.closest('[data-image]');
    if (detail) {
      const image = $('#detail-image');
      image.src = detail.dataset.image;
      image.alt = detail.querySelector('img').alt;
      $('#detail-caption').textContent = detail.dataset.caption;
      $('#image-title').textContent = 'Image detail';
      openDialog($('#image-dialog'));
    }
  });
  $('#previous-button').addEventListener('click', () => turn(-1));
  frame.addEventListener('animationend', () => frame.classList.remove('turn-forward', 'turn-back'));
  $('#next-button').addEventListener('click', () => turn(1));
  $('#contents-button').addEventListener('click', () => openDialog($('#contents-dialog')));
  $('#page-counter').addEventListener('click', () => openDialog($('#contents-dialog')));
  $('#reading-button').addEventListener('click', toggleReading);
  $('#zoom-button').addEventListener('click', zoom);
  $('#print-button').addEventListener('click', () => window.print());
  $('#share-button').addEventListener('click', async () => {
    if (location.protocol !== 'file:') {
      try {
        await navigator.clipboard.writeText(location.href);
        toast(`Link to page ${current + 1} copied`);
        return;
      } catch { /* Provide a selectable link if clipboard access is unavailable. */ }
    }
    $('#share-url').value = location.href;
    openDialog($('#share-dialog'));
    $('#share-url').select();
  });
  const fullscreenButton = $('#fullscreen-button');
  if (!document.fullscreenEnabled) fullscreenButton.hidden = true;
  fullscreenButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { toast('Fullscreen is unavailable in this browser.'); }
  });
  document.addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]') || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); turn(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); turn(-1); }
    if (event.key === 'Home') { event.preventDefault(); goTo(0); }
    if (event.key === 'End') { event.preventDefault(); goTo(count - 1); }
  });
  area.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || event.target.closest('a,button')) return;
    gesture = { x: event.clientX, y: event.clientY };
  });
  area.addEventListener('pointerup', event => {
    if (!gesture) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(dx < 0 ? 1 : -1);
  });
  area.addEventListener('pointercancel', () => { gesture = null; });
  window.addEventListener('resize', () => render());
  wide.addEventListener('change', () => render());
  window.addEventListener('hashchange', () => goTo(nav.fromHash(location.hash, count)));
  window.addEventListener('scroll', () => {
    if (!reading || scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      if (!reading) return;
      let nearest = 0;
      let distance = Infinity;
      Array.from(reader.children).forEach((sheet, index) => {
        const d = Math.abs(sheet.getBoundingClientRect().top - 100);
        if (d < distance) { distance = d; nearest = index; }
      });
      current = nearest;
      updateControls([current]);
      setHash();
    });
  }, { passive: true });
  $('#contents-button').setAttribute('aria-label', 'Open catalogue contents');
  $('#reading-button').setAttribute('aria-label', 'Read all pages continuously');
  $('#share-button').setAttribute('aria-label', 'Share this catalogue page');
  render();
  document.fonts.ready.then(fit);
})();
