export default function ProdutosCard(data){
  let dados = data;
  return(
    `
    <div class="contentDataModal">
      <small>Registro #${dados?.id} </small>
      <ul>
        <li><b>Nome do Produto: </b>${dados?.nome}</li>
        <li><b>Descrição do Produto: </b>${dados?.descricao}</li>
        <li><b>Preço: </b>
          ${dados?.preco.toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFactionDigits:2})}
        </li>
        <li><b>Quantidade: </b>${dados?.quantidade}</li>
        <li><b>Data de adição: </b>${dados?.data_adicao}</li>
      </ul>
    </div>
    `
  );
}