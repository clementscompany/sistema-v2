export default function EntradasCard(data){
  let dados = data[0];
  return(
    `
    <div class="contentDataModal">
      <small>Registro #${dados.id} </small>
      <ul>
        <li><b>Data: </b>${dados.data}</li>
        <li><b>Marca: </b>${dados.marca}</li>
        <li><b>Motorista: </b>${dados.motorista}</li>
        <li><b>Matricula: </b>${dados.matricula}</li>
        <li><b>Entregou: </b>${dados.entregou}</li>
        <li><b>Recebeu: </b>${dados.recebeu}</li>
      </ul>
      <div class="buttons">
        <button class="button deleteButton"  id="deleteButton" value="${dados.id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    `
  );
}
