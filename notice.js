function loadGoogleFonts() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

export function createTypewriterMessage() {
    loadGoogleFonts(); // load fonts
    const typewriterDiv = document.createElement('div');
    typewriterDiv.className = 'typewriter';
    typewriterDiv.style.fontFamily = '"Courier Prime", monospace';
    typewriterDiv.style.color = 'black';
    typewriterDiv.style.fontSize = '14px';
    typewriterDiv.style.textAlign = 'center';
    typewriterDiv.style.width = '100%';
    typewriterDiv.style.position = 'absolute';
    typewriterDiv.style.top = '150px';
    typewriterDiv.style.left = '0';
    typewriterDiv.style.padding = '20px 0';

    const textH1 = document.createElement('h1');
    textH1.textContent = '</portfolio under construction...>';

    typewriterDiv.appendChild(textH1);
    document.body.appendChild(typewriterDiv);
}