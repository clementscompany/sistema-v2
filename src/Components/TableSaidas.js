export default function TableSaidas(data) {
  let dados;
  if (data) {
    dados = data;
  }
  return `
    <div class="tableEntregas">
      <div class="h3"><h4>Mapa de controlo de entrega de mercadorias</h4></div>
      <table class="tableLayout">
        <thead>
          <tr>
            <th>id</th>
            <th>Data</th>
            <th>Marca</th>
            <th>Matrícula</th>
            <th>Motorista</th>
            <th>Entregou</th>
            <th>Recebeu</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          ${
            dados?.length > 0 ?
            dados.map((saida)=>(
              `
              <tr>
              <td>${saida.id}</td>
              <td>${saida.data}</td>
              <td>${saida.marca}</td>
              <td>${saida.matricula}</td>
              <td>${saida.motorista}</td>
              <td>${saida.entregou}</td>
              <td>${saida.recebeu}</td>
              <td class="tdButtons">
                <button class="tabeleButton seeButtons" value="${saida.id}">
                  <i class="bi bi-eye"></i>
                </button>
                <button class="tabeleButton deleteButton" value="${saida.id}">
                  <i class="bi bi-trash"></i>
                </button>
                <button class="tabeleButton editButton" value="${saida.id}">
                  <i class="bi bi-pen"></i>
                </button>
              </td>
              </tr>
              `
            )).join('')
            :
            `
            <tr>
              <td colspan="7">Sem registros!</td>
            </tr>
            `
          }
        </tbody>
      </table>
    </div>
  `;
}

