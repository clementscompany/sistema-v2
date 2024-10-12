import ComponentHome from "../Components/ComponentHome.js";
import Estatistic from "../Components/Estatistic.js";
import Header from "../Components/Header.js";
import Menu from "../Components/Menu.js";
import Modal from "../Components/Modal.js";
import ProdutosCard from "../Components/ProdutosCard.js";
import TableProdutos from "../Components/TableProdutos.js";
import ApiClass from "./Api.class.js";
import LoadingClass from "../hooks/Loading.js";
import Settings from "./Settings.Class.js";

class Home {
  constructor(mainContainer) {
    this.main = mainContainer;
    this.Init(this.main);
    this.modal = document.createElement("section");
  }

  Init(mainContainer) {
    this.modal = document.createElement("section");
    this.modal.classList.add("modalContainer");
    mainContainer.appendChild(this.modal)
    mainContainer.innerHTML = ComponentHome();
    mainContainer.querySelector("#menuContent").innerHTML = Menu(1);
    mainContainer.querySelector("#headerContent").innerHTML = Header("Dashboard");
    this.DataHome(mainContainer);
    new Settings(mainContainer);
  }

  async DataHome(mainContainer){
    this.data = await ApiClass.GetAllDataMome(mainContainer);
    if (this.data) {
      mainContainer.querySelector("#topComponent").innerHTML = Estatistic(this.data.estsatistic);
      mainContainer.querySelector("#bottomComponent").innerHTML = TableProdutos(this.data?.produtos?.sucess)
    }
    this.Functions(mainContainer);
  }

  Functions(mainContainer){
    this.reload = mainContainer.querySelectorAll(".reloadButton");
    this.reload.forEach(button => {
      button.addEventListener("click", ()=>{
        this.DataHome(mainContainer);
      })
    });

    this.seeButtons = mainContainer.querySelectorAll(".seeButton");
    this.seeButtons.forEach(button => {
      button.addEventListener("click", ()=>{
        this.ListProduct(mainContainer, button.value);
      })
    });

    this.seeButtons = mainContainer.querySelectorAll(".closeModal");
    this.seeButtons.forEach(button => {
      button.addEventListener("click", ()=>{
        LoadingClass.RemoveModal(mainContainer);
      })
    });
  }

  async ListProduct(mainContainer, id){
    this.data = await ApiClass.GetAllDataMomeBy(mainContainer, id);
    if (this.data) {
      this.modal.classList.add("modalContainer");
      this.modal.innerHTML = Modal(ProdutosCard(this.data?.produtos?.sucess))
      mainContainer.appendChild(this.modal);
      this.Functions(mainContainer);
    }
  }

} export default Home;
