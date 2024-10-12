export default function FormProdutos(produtos){

  const formTitle = produtos ? "Atualizar os dados" : "Cadastrar Produto";
  const nomeValue = produtos?.nome || "";
  const precoValue = produtos?.preco || "";
  const quantidadeValue = produtos?.quantidade || "";
  const descricaoValue = produtos?.descricao || "";
  const buttonText = produtos ? "Atualizar" : "Cadastrar";
 
  return(`
      <form action="" class="formSaidas" id="formSaidas">
      <div class="textError">
        <h5>${formTitle}</h5>
      </div>
      <div class="formContent">
        <div class="inputBox">
          <label for="nome">Nome</label>
          <input type="text" class="input" placeholder="Digite o nome do produto..." id="nome" name="nome" 
          value="${nomeValue}">
        </div>


        <div class="inputBox">
          <label for="descricao">Descrição</label>
          <input type="text" class="input" placeholder="Descricao do produto..." id="descricao" name="descricao" 
          value="${descricaoValue}">
        </div>

        <div class="inputBox">
          <label for="quantidade">Quantidade</label>
          <input type="number" class="input" placeholder="Digite a quantidade" id="quantidade" name="quantidade" value="${quantidadeValue}">
        </div>

        <div class="inputBox">
          <label for="preco">Preço</label>
          <input type="number" class="input" placeholder="000" id="preco" name="preco" 
          value="${precoValue}">
        </div>

        <div class="buttons">
          <button type="submit" id="submitButton">
            ${buttonText}
          </button>
          <button type="reset">Cancelar</button>
        </div>
      </div>
    </form>
    `);
}
