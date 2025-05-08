const contentEl = document.querySelector('.content');
const links     = document.querySelectorAll('.sidebar a');

// load a snippet into the content area
async function loadPage(file, hash) {
  try {
    const resp = await fetch(`content/${file}`);
    const html = await resp.text();
    contentEl.innerHTML = html;
    setActiveLink(hash);
    document.body.classList.replace('home','detail');
  } catch (e) {
    contentEl.innerHTML = `<p>Error loading ${file}</p>`;
  }

  // on mobile, inject Close button at bottom only
  if (window.innerWidth < 768) {
    const btn = document.createElement('a');
    btn.href = 'index.html';
    btn.textContent = '✕ Close';
    btn.className = 'close-btn';
    contentEl.append(btn);
  }
}

// mark the clicked link active
function setActiveLink(hash) {
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === hash);
  });
}

// intercept clicks so only the text triggers
links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const hash = a.getAttribute('href');
    loadPage(a.dataset.file, hash);
  });
});

// **no default hash on load** — you land on the list always

// Make folders collapsible
document.querySelectorAll('.sidebar .folder-header, .sidebar .folder').forEach(btn => {
  btn.addEventListener('click', () => {
    const li = btn.closest('li');
    li.classList.toggle('collapsed');
  });
});

