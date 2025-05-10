const contentEl = document.querySelector('.content');
const links     = document.querySelectorAll('.sidebar a');

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

    // show detail pane
    document.body.classList.replace('home','detail');

    // insert desktop/mobile close button under first row
    const close = document.createElement('a');
    close.href = '#';
    close.textContent = '(Close)';
    close.className = 'close-btn';
    // insert after the intro row (.project-intro or .about-row)
    const intro = contentEl.querySelector('.project-intro, .about-row');
    intro.insertAdjacentElement('afterend', close);

    // close handler
    close.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.replace('detail','home');
      setActiveLink('');  // clear highlight
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
