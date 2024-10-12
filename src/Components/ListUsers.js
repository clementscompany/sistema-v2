export default function ListUsers(users){
  const { error, success } = users;
  return(`
    <div class="listUsers">
      <div class="top"><button id="closeButton"><i class="bi bi-x-lg"></i></button></div>
      <div class="bottom">
        <button class="reloadButton" id="reloadData">recaregar</button>
        <button class="reloadButton" id="registerButton">novo</button>
        <form action="#" class="searchUsers" id="searchUsers">
          <div class="inputBox">
            <input type="search" placeholder="Pesquisar...">
          </div>
          <button><i class="bi bi-search"></i></button>
        </form>
        <div class="bottomPerson" id="bottomPerson">
          <ul>
            ${error ? `
              <li class="person">
                <span>${error}</span>
              </li>
              `:
              success.map((users)=>(
                `
              <li class="person">
                <i class="bi bi-person"></i>
                <span>${users?.username}</span>
                <div class="button">
                  <button class="deleteButton" value="${users?.id}">Eliminar</button>
                </div>
              </li>
            `
              )).join('')
            }
          </ul>
        </div>
      </div>
    </div>
    `);
}