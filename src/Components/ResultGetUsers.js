export default function ResultGetUsers(data){
  const {error, success} = data;
  return (
    `
    <ul>
      ${ 
        error ? 
          `
          <li class="person">
                <span>${error}</span>
          </li>
        `:
        success.map((users) => (
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
    <ul>
    `
  )
}