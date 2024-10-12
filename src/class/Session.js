import LoginCard from "../Components/LoginCard.js";
import LoginClass from "./Login.Class.js";
import SetPass from "../pages/SetPass.js";
class Session{
  constructor(mainContainer){
    this.main = mainContainer;
    this.card = document.createElement("section");
    this.SessionControll(this.main);
  }

  SessionControll(mainContainer){
    this.card.classList.add("modalContainer");
    this.card.style.background = "var(--baseColor)";
    this.card.innerHTML = LoginCard();
    mainContainer.appendChild(this.card);
    this.form = mainContainer.querySelector("#formLogin");
    LoginClass.Login(this.form);
    mainContainer.querySelector("#registerLink").addEventListener("click", ()=>{
      new SetPass(mainContainer)
    })
  }
}
export default Session;