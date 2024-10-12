export default function CardPerfil(){
  return(`
    <div class="profile-card">
      <div class="avatar-container">
        <i class="bi bi-person-circle avatar"></i>
      </div>
      <div class="info">
        <h2 class="name">Admin</h2>
        <p class="role">SGS software</p>
        <p class="description">A maneira mais fácil e moderna de gerenciar o seu negócio</p>
        <a href="https://wa.me/931240190" target="_blank">Suporte técnico</a>
        <button class="userButton" id="userButton">usuários</button>
      </div>
      <div class="actions">
        <button class="message-btn" id="logOutButton">Sair</button>
        <button class="follow-btn" id="closeCardButton">Fechar</button>
      </div>
    </div>  
    `);
}
