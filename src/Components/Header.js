export default function Header(title) {
  return `
    <header class="header">
      <div class="title"><h3>${title}</h3></div>
      <div class="aside">
        <button id="themeButton"><i class="bi bi-toggles"></i></button>
        <button id="openPerfil"><i class="bi bi-person"></i></button>
      </div>
    </header>
  `;
}



