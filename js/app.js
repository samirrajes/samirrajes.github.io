const contentEl = document.querySelector('.content');
const links     = document.querySelectorAll('.sidebar a');

// collapse folders: toggle 'collapsed' class on folder click
const folderButtons = document.querySelectorAll('.folder-header, .folder');
folderButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const li = btn.parentElement;
    li.classList.toggle('collapsed');
  });
});

async function loadPage(file, hash) {
  try {
    // fetch & inject
    const resp = await fetch(`content/${file}`);
    const html = await resp.text();
    contentEl.innerHTML = html;

    // execute any inline <script> tags
    contentEl.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      s.textContent = old.textContent;
      document.body.appendChild(s).parentNode.removeChild(s);
    });

    // highlight nav link
    setActiveLink(hash);

    // switch to detail pane
    document.body.classList.replace('home', 'detail');

    // Create first (top) close button
    const closeTop = document.createElement('a');
    closeTop.href = '#';
    closeTop.textContent = '(Close)';
    closeTop.className = 'close-btn';
    // insert after intro row (.project-intro or .about-row)
    const intro = contentEl.querySelector('.project-intro, .about-row');
    intro.insertAdjacentElement('afterend', closeTop);
    closeTop.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.replace('detail', 'home');
      setActiveLink('');
    });

    // Create second (bottom-right) close button
    const closeBottom = document.createElement('a');
    closeBottom.href = '#';
    closeBottom.textContent = '(Close)';
    closeBottom.className = 'close-btn close-bottom';
    // append to body for fixed positioning
    document.body.appendChild(closeBottom);
    closeBottom.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.replace('detail', 'home');
      setActiveLink('');
    });

  } catch (e) {
    contentEl.innerHTML = `<p>Error loading ${file}</p>`;
  }
}

// nav link click interception
links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    loadPage(a.dataset.file, a.getAttribute('href'));
  });
});

function setActiveLink(hash) {
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === hash);
  });
}

// On initial load, ensure we’re in home mode
document.body.classList.add('home');
