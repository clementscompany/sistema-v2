export default function UserList(data) {
  let result = data;
  return (`
    <ul class="user-list">
    ${result && result.length  > 0 ? 
        result.map(data=>
       ` <li class="user-item" id="${data?.id}">
          <span class="icon bi bi-person-circle"></span>
          <span class="username">${data?.username}</span>
        </li>`
        ).join('')
      : `
       <li class="user-item">
        <span class="icon bi bi-person-circle"></span>
        <span class="username">Sem registros...</span>
      </li>
      `}
    </ul>
    `)
}