import ComponentHome from "../Components/ComponentHome.js";
import Menu from "../Components/Menu.js";
import Header from "../Components/Header.js";
import ApiClass from "./Api.class.js";
import TableEntregas from "../Components/TableEntregas.js";
import TopTable from "../Components/TopEntradas.js";
import Modal from "../Components/Modal.js";
import LoadingClass from "../hooks/Loading.js"
import CardEntregas from "../Components/CardEntregas.js";
import ChoicePopUp from "../Components/ChoicePopUp.js";
import FormEntregas from "../Components/FormSaidas.js";
import { FormValidate } from "../hooks/Validations.js";
import Settings from "./Settings.Class.js";

class Entregas {
  constructor(mainContainer) {
    this.main = mainContainer;
    this.modal = document.createElement("section");
    this.Init(this.main);
  }

  Init(mainContainer) {
    mainContainer.innerHTML = ComponentHome();
    mainContainer.querySelector("#headerContent").innerHTML = Header("Entregas");
    mainContainer.querySelector("#menuContent").innerHTML = Menu(2);
    this.BaseHome(mainContainer);
    new Settings(mainContainer);
  }

  async BaseHome(mainContainer) {
    this.data = await ApiClass.GetDataEntregas(mainContainer);
    if (this.data) {
      mainContainer.querySelector("#bottomComponent").innerHTML = TableEntregas(this.data?.entregas?.success);
      mainContainer.querySelector("#topComponent").innerHTML = TopTable();
      this.Functions(mainContainer);
    }
  }

  Functions(mainContainer) {
    this.seeButtons = mainContainer.querySelectorAll(".seeButton");
    this.seeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.ListarById(mainContainer, button.value);
      })
    })

    this.closeModal = mainContainer.querySelectorAll(".closeModal");
    this.closeModal.forEach((button) => {
      button.addEventListener("click", () => {
        LoadingClass.RemoveModal(mainContainer);
      })
    })

    this.deleteButton = mainContainer.querySelectorAll(".deleteButton");
    this.deleteButton.forEach((button) => {
      button.addEventListener("click", () => {
        this.DeleteData(mainContainer, button.value);
      })
    })

    this.AddButton = mainContainer.querySelector("#addButton");
    this.AddButton.addEventListener("click", ()=>{
      this.Cadastrar(mainContainer);
    })

    this.pesquisar = mainContainer.querySelector("#pesquisarBox");
    this.input = this.pesquisar.querySelector("input");

    this.closeModal = mainContainer.querySelectorAll(".closeModal");
    this.closeModal.forEach(button=>{
      button.addEventListener("click", ()=>{
        LoadingClass.RemoveModal(mainContainer);
      })
    });

    this.reload = mainContainer.querySelectorAll(".reloadButton");
    this.reload.forEach(button=>{
      button.addEventListener("click", ()=>{
        this.BaseHome(mainContainer);
      })
    })

    this.editButton = mainContainer.querySelectorAll(".editButton");
    this.editButton.forEach((button)=>{
      button.addEventListener("click", ()=>{
        this.Atualizar(mainContainer, button.value);
      })
    })
   
    this.pesquisar.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.input.value.trim() !== "") {
        this.Pesquisar(mainContainer, this.input.value);
      }
    })
  }

  //Atualizar
  async Atualizar(mainContainer, id){
    this.data = await ApiClass.GetDataEntregasBy(mainContainer, id);
    if (this.data) {
      this.produtos = await ApiClass.GetProdutos(mainContainer);
      this.modal.classList.add('modalContainer');
      this.modal.innerHTML = Modal(FormEntregas(this.data?.sucess, this.produtos?.produtos?.sucess));
      mainContainer.appendChild(this.modal);
      this.Functions(mainContainer);

      this.form = mainContainer.querySelector("#formSaidas");
      this.input = this.form.querySelectorAll(".input");
      this.text = this.form.querySelector(".textError");
      ///
      this.input.forEach(input=>{
        input.addEventListener("input", ()=>{
          LoadingClass.FormMessage(this.text, "Insira os Dados...", "sucess");
          this.text.classList.remove('error');
        })
      })

      this.form.addEventListener("submit", (e)=>{
        e.preventDefault();
        if (!FormValidate(this.input)) {
          LoadingClass.FormMessage(this.text, "Preencha todos os campos!", "error");
          return;
        }
  
        ApiClass.UpdateEntregas(mainContainer, this.form, id);
  
      })

    }
  }

  async Cadastrar(mainContainer){
    this.product = await ApiClass.GetProdutos(mainContainer);
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = Modal(FormEntregas("", this.product?.produtos?.sucess || false));
    mainContainer.appendChild(this.modal);
    this.form = mainContainer.querySelector("#formSaidas");
    this.Functions(mainContainer);

    this.input = this.form.querySelectorAll(".input");
    this.text = this.form.querySelector(".textError");
    ///
    this.input.forEach(input=>{
      input.addEventListener("input", ()=>{
        LoadingClass.FormMessage(this.text, "Insira os Dados...", "sucess");
        this.text.classList.remove('error');
      })
    })
    
    this.form.addEventListener("submit", (e)=>{
      e.preventDefault();
      if (!FormValidate(this.input)) {
        LoadingClass.FormMessage(this.text, "Preencha todos os campos!", "error");
        return;
      }

      ApiClass.PostEntregas(mainContainer, this.form);

    })
  }

  async Pesquisar(mainContainer, data) {
    this.data = await ApiClass.SearchEntregas(mainContainer, data);
    if (this.data) {
      mainContainer.querySelector("#bottomComponent").innerHTML = TableEntregas(this.data?.success);
      this.Functions(mainContainer);
    }
  }

  DeleteData(mainContainer, id) {
    LoadingClass.RemoveModal(mainContainer)
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = ChoicePopUp("Tem certeza que deseja eliminar Estes dados?", "error");
    mainContainer.appendChild(this.modal);
    this.choice = mainContainer.querySelectorAll("#choiceButtons > button");
    this.choice.forEach((button, index) => {
      button.addEventListener("click", () => {
        switch (index) {
          case 0:
            ApiClass.DeleteDataEntregas(mainContainer, id);
            break;

          default:
            LoadingClass.RemoveModal(mainContainer);
            break;
        }
      })
    })
  }

  async ListarById(mainContainer, id) {
    this.data = await ApiClass.GetDataEntregasBy(mainContainer, id);
    if (this.data) {
      this.modal.classList.add("modalContainer");
      this.modal.innerHTML = Modal(CardEntregas(this.data?.sucess));
      mainContainer.appendChild(this.modal);
      this.Functions(mainContainer);
    }
  }
}
export default Entregas;


