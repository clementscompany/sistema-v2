function Bombeamento() {
  return `
    <div class="tableEntregas">
      <div class="h3"><h4>Mapa de bombeamento de água por dia</h4></div>
      <table class="tabeleLayout">
        <thead>
          <tr>
            <th>id</th>
            <th>Data</th>
            <th>Marca</th>
            <th>Matrícula</th>
            <th>Motorista</th>
            <th>Entregou</th>
            <th>Recebeu</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22</td>
            <td>12:02:2023</td>
            <td>Hinno</td>
            <td>LD-17-43-BG</td>
            <td>Moises Clemente</td>
            <td>Jão Dala</td>
            <td>João Paciência</td>
            <td>
              <button class="tabeleButton">
                <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

