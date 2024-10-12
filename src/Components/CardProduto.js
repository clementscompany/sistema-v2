export default function CardProdutos(data){
  let dados = data;
  return(
    `
    <div class="contentDataModal">
      <small>Registro #${dados?.id} </small>
      <ul>
        <li><b>Nome do produto: </b>${dados?.nome}</li>
        <li><b>Descrição do produto: </b>${dados?.descricao}</li>
        <li><b>Preço: </b>
          ${dados?.preco.toLocaleString("pt-BR",{minimumFractionDigits:2, maximumFactionDigits:2})} kz
        </li>
        <li><b>Quantidade disponível: </b>${dados?.quantidade}</li>
        <li><b>Data do registro: </b>${dados?.data_adicao}</li>
      </ul>
      <div class="buttons">
        <button class="button deleteButton"  id="deleteButton" value="${dados?.id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    `
  );
}
