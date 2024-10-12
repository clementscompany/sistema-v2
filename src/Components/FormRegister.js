export default function FormRegister() {
  return `
    <div class="login-card">
      <div class="card-header">
        <h2>Cadastrar um novo usuário</h2>
      </div>
      <div class="card-body">
        <form id="formRegister">
          <span class="textError"></span>
          <div class="input-group">
            <span class="icon bi-person"></span>
            <input type="password" placeholder="username" class="input-field" name="username">
          </div>
          <button type="submit" class="login-btn">Cadastrar</button>
        </form>
      </div>
    </div>
    `;
}