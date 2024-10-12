export default function Estatistic(data) {
  let produtos = data[0]
  return `
    <div class="contablistico">
      <h4>Saldo: ${produtos?.montanteEntregas?.toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFracionDigits:2}) || 0} Kz
      </h4>
    </div>
    <div class="cstatistic">
      <div class="cards">
        <div class="topCard">
          <h4>Entrada de produtos</h4>
          <h1>${produtos?.totalEntradas || 0}</h1>
        </div>
      </div>
      <div class="cards">
        <div class="topCard">
          <h4>Entregas Realizadas</h4>
          <h1>${produtos?.totalEntregas || 0}</h1>
        </div>
      </div>
      <div class="cards">
        <div class="topCard">
          <h4>Estoque Atual</h4>
          <h1>${produtos?.totalStoque || 0}</h1>
        </div>
      </div>

      <div class="cards">
        <div class="topCard">
          <h4>Estoque Maximo</h4>
          <h1>${produtos?.stockMax || 0}</h1>
        </div>
      </div>

       <div class="cards">
        <div class="topCard">
          <h4>Estoque Minimo</h4>
          <h1>${produtos?.stockMin || 0}</h1>
        </div>
      </div>

      <div class="cards">
        <div class="topCard">
          <h4>Total de produtos Caadastrados</h4>
          <h1>${produtos?.totalProdutos || 0}</h1>
        </div>
      </div>
    </div>
  `;
}

