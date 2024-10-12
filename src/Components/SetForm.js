export default function SetPasswordCard() {
  return `
    <div class="login-card">
      <div class="card-header">
        <h2>Defina a sua senha</h2>
      </div>
      <div class="card-body">
        <form id="formSetPassword">
          <span class="textError"></span>
          <div class="input-group">
            <span class="icon bi-lock-fill"></span>
            <input type="password" placeholder="Password" class="input-field" name="password">
          </div>

          <div class="input-group">
            <span class="icon bi-lock-fill"></span>
            <input type="password" placeholder="Confirme a sua senha.." class="input-field" name="confirmPassword">
          </div>
          <button type="submit" class="login-btn">Cadastrar senha</button>
        </form>
      </div>  
    </div>
    `;
}