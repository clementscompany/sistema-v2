export default function TableProdutos(data) {
  const dados = data || [];

  return `

   <div class="topTable">
      <div class="left"><h4>Produtos</h4></div>
      <div class="buttons">
        <div class="button reloadButton" id="reloadButton"><i class="bi bi-arrow-clockwise"></i></div>
      </div>
  </div>
      <table class="tableLayout">
        <thead>
          <tr>
            <th>Id</th>
            <th>nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          ${
            dados.length > 0
              ? dados.map((produto) => `
                <tr>
                  <td>${produto?.id}</td>
                  <td>${produto?.nome}</td>
                  <td>${produto?.descricao}</td>
                  <td>${produto?.preco.toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFactionDigits:2})} Kz</td>
                  <td class="tdButtons">
                    <button class="tableButton seeButton" value="${produto.id}">
                      <i class="bi bi-eye"></i>
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
  `;
}
