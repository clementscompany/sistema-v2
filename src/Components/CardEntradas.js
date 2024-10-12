export default function CardEntradas(dados){
  return(
    `
    <div class="contentDataModal cdd">
      <small>Registro #${dados?.id} </small>
      <ul>
        <li><b>Data da Entrega: </b>${dados?.data}</li>
        <li><b>Marca: </b>${dados?.marca}</li>
        <li><b>Matrícula: </b>${dados?.matricula}</li>
        <li><b>Quantidade: </b>${dados?.quantidade}</li>
        <li><b>Motorista: </b>${dados?.motorista}</li>
        <li><b>Entregou: </b>${dados?.entregou}</li>
        <li><b>Recebeu: </b>${dados?.recebeu}</li>
        <li><b>Produto: </b>${dados?.produto}</li>
        <li><b>Descrição do Produto: </b>${dados?.descProd}</li>
        <li><b>Preço do produto: </b>${dados?.precoProd} Kz</li>
        <li><b>Stock Atual do Produto: </b>${dados?.stockAtualProd}</li>
      </ul>
      <div class="buttonsCard">
        <button class="editButton" value="${dados?.id}">
          <i class="bi bi-pen"></i>
        </button>
        <button class="deleteButton" value="${dados?.id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    `
  );
}