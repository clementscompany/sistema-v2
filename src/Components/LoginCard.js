export default function LoginCard() {
  return `
    <div class="login-card">
      <div class="card-header">
        <h2>Login</h2>
      </div>
      <div class="card-body">
        <form id="formLogin">
          <span class="textError"></span>
          <div class="input-group">
            <span class="icon bi-person-fill"></span>
            <input type="text" placeholder="Username" class="input-field" name="username">
          </div>
          <div class="input-group">
            <span class="icon bi-lock-fill"></span>
            <input type="password" placeholder="Password" class="input-field" name="password">
          </div>
          <button type="submit" class="login-btn">Login</button>
          <span id="registerLink">Usuário novo?</span>
        </form>
      </div>
    </div>
    `;
}