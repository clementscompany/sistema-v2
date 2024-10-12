export default function TableRecents(data) {

  return `
    <div class="topTable">
      <div class="left"><h4>Entradas recentes</h4></div>
      <div class="buttons">
        <div class="button" id="">cadastrar novo produto <i class="bi bi-plus-lg"></i></div>
        <div class="button" id="reloadButton"><i class="bi bi-arrow-clockwise"></i></div>
      </div>
    </div>
    <table class="tableLayout">
      <thead>
        <tr>
          <th>id</th>
          <th>Data</th>
          <th>Marca</th>
          <th>Motorista</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
      ${
        data.success?.length > 0 ? 
        data.success?.map(entradas=>(
          `
          <tr>
          <td>${entradas.id}</td>
          <td>${entradas.data}</td>
          <td>${entradas.matricula}</td>
          <td>${entradas.motorista}</td>
          <td>
            <button class="tabeleButton verButton" value="${entradas.id}">
              <i class="bi bi-eye"></i>
            </button>
          </td>
          </tr>
          `
        )).join('')
        :
        `
        <tr>
          <td colspan="5">Sem Registros!</td>
        </tr>
        `
      }
      </tbody>
    </table>
  `;
}

