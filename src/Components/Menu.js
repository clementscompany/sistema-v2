export default function Menu(path) {
  let location = path;
  return `
    <nav class="menu">
      <ul>
        <h1 style="color: var(--color)">SGS</h1>
        <a href="#/dashboard" class="${location === 1 ? "active" : ""}">
          <li><i class="bi bi-house"></i>Home</li>
        </a>
        <a href="#/entregas" class="${location === 2 ? "active" : ""}">
          <li><i class="bi bi-truck"></i>Entregas</li>
        </a>
        <a href="#/entradas" class="${location === 3 ? "active" : ""}">
          <li><i class="bi bi-box-arrow-in-down"></i></i>Entradas</li>
        </a>
        <a href="#/stock" class="${location === 4 ? "active" : ""}">
          <li><i class="bi bi-shop-window"></i>Stock</li>
        </a>
        <a href="#/relatorios" class="${location === 5 ? "active" : ""}">
          <li><i class="bi bi-graph-up-arrow"></i>Relatórios</li>
        </a>
        <a href="#" class="logout" id="logOutButton">
          <li><i class="bi bi-box-arrow-right"></i>Terminar sessão</li>
        </a>
      </ul>
    </nav>
  `;
}

