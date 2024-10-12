import MiniSpinner from "./MiniSpinner.js";

export default function FormEntradas(data, produtos) {
  const formTitle = data ? 'Atualizar os dados da Enrada' : 'Registar nova Entrada';
  const buttonText = data ? 'Atualizar' : 'Enviar';
  const marcaValue = data ? data?.marca : '';
  const matriculaValue = data ? data?.matricula : '';
  const motoristaValue = data ? data?.motorista : '';
  const entregouValue = data ? data?.entregou : '';
  const recebeuValue = data ? data?.recebeu : '';
  const quantidadeValue = data ? data?.quantidade : '';
  const descricaoValue = data ? data?.descricao : '';
  const precoValue = data ? data?.preco : '';

  // Função para renderizar as opções de produtos
  const renderProdutosOptions = () => {
   if (data == "") {
    return produtos.map(produto => `
      <option value="${produto?.id}">${produto?.nome}</option>
    `).join('');
   } else{
     return`
      <option value="${data?.produto_id}">${data?.produto}</option>
     `
   }

  };

  return (`
    <form action="" class="formSaidas" id="formSaidas">
      <div class="textError">
        <h5>${formTitle}</h5>
      </div>
      <div class="formContent">
        <div class="inputBox">
          <label for="marca">Marca</label>
          <input type="text" class="input" placeholder="Digite a marca" id="marca" name="marca" value="${marcaValue}">
        </div>

        <div class="inputBox">
          <label for="matricula">Matrícula</label>
          <input type="text" class="input" placeholder="Digite a matrícula" id="matricula" name="matricula" value="${matriculaValue}">
        </div>

        <div class="inputBox">
          <label for="motorista">Motorista</label>
          <input type="text" class="input" placeholder="Digite o nome do motorista" id="motorista" name="motorista" value="${motoristaValue}">
        </div>

        <div class="inputBox">
        ${ produtos
          ? `
          <label for="produto">Produto</label>
          <select name="produto_id" class="input" id="produto">
                 ${renderProdutosOptions()}   
               </select>`
            : MiniSpinner() }
        </div>

        <div class="inputBox">
          <label for="entregou">Entregou</label>
          <input type="text" class="input" placeholder="Quem entregou?" id="entregou" name="entregou" value="${entregouValue}">
        </div>

        <div class="inputBox">
          <label for="recebeu">Recebeu</label>
          <input type="text" class="input" placeholder="Quem recebeu?" id="recebeu" name="recebeu" value="${recebeuValue}">
        </div>

        <div class="inputBox">
          <label for="quantidade">Quantidade</label>
          <input type="text" class="input" placeholder="Digite a quantidade" id="quantidade" name="quantidade" value="${quantidadeValue}">
        </div>

         <div class="inputBox">
          <label for="quantidade">Preço</label>
          <input type="number" class="input" placeholder="000" id="quantidade" name="preco" value="${precoValue}">
        </div>

        <div class="inputBox">
          <label for="descricao">Descrição</label>
          <input type="text" class="input" placeholder="Digite a descrição..." id="descricao" name="descricao" value="${descricaoValue}">
        </div>

        <div class="buttons">
          <button type="submit" id="submitButton" ${!produtos ? 'disabled class="disabled"' : ''}>
            ${buttonText}
          </button>
          <button type="reset">Cancelar</button>
        </div>
      </div>
    </form>
  `);
}
