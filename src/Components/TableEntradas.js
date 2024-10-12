export default function TableEntradas(data) {
  const dados = data || [];

  return `
    <div class="tableEntregas">
      <div class="h3"><h4>Entrada de mercadoria</h4></div>
      <table class="tableLayout">
        <thead>
          <tr>
            <th>Id</th>
            <th>Data</th>
            <th>Marca</th>
            <th>Motorista</th>
            <th>Entregou</th>
            <th>Recebeu</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          ${
            dados.length > 0
              ? dados.map((entrega) => `
                <tr>
                  <td>${entrega.id}</td>
                  <td>${entrega.data}</td>
                  <td>${entrega.marca}</td>
                  <td>${entrega.motorista}</td>
                  <td>${entrega.entregou}</td>
                  <td>${entrega.recebeu}</td>
                  <td>${entrega.quantidade}</td>
                  <td>${parseFloat(entrega.preco).toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFrationDigits:2})}</td>
                  <td class="tdButtons">
                    <button class="tableButton seeButton" value="${entrega.id}">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="tableButton deleteButton" value="${entrega.id}">
                      <i class="bi bi-trash"></i>
                    </button>
                    <button class="tableButton editButton" value="${entrega.id}">
                      <i class="bi bi-pen"></i>
                    </button>
                  </td>
                </tr>
              `).join('')
              : `
                <tr>
                  <td colspan="12">Sem registros!</td>
                </tr>
              `
          }
        </tbody>
      </table>
    </div>
  `;
}
