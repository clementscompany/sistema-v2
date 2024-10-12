
export default function TableStock(produtos) {
  return (`
    <ul class="listProdutos">
      ${produtos?.length > 0 ?
      produtos.map(produto => (
        `
            <li>
              <span>
                <i class="bi bi-box-seam-fill"></i><b>${produto?.nome}</b> <i>Quantidade: 2</1>
              </span>
              <button class="tableButton seeButton" value="${produto?.id}">
                <i class="bi bi-eye"></i>
              </button>
              <button class="tableButton deleteButton" value="${produto?.id}">
                <i class="bi bi-trash"></i>
              </button>
              <button class="tableButton editButton" value="${produto?.id}">
                <i class="bi bi-pen"></i>
              </button>
            </li>
            `
      )).join('')
      :
      `
      <li>
        <span>
          <i class="bi bi-box-seam-fill"></i><b>Sem registro</b> <i>0</1>
        </span>
      </li>
      `
    }
    `);
}