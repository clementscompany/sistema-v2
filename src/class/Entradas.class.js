import CardEntradas from "../Components/CardEntradas.js";
import ComponentHome from "../Components/ComponentHome.js";
import Header from "../Components/Header.js";
import Menu from "../Components/Menu.js";
import Modal from "../Components/Modal.js";
import TableEntradas from "../Components/TableEntradas.js";
import TopEntradas from "../Components/TopEntradas.js";
import ApiClass from "./Api.class.js";
import LoadingClass from "../hooks/Loading.js";
import ChoicePopUp from "../Components/ChoicePopUp.js";
import FormEntradas from "../Components/FormEntradas.js";
import { FormValidate } from "../hooks/Validations.js";
import Settings from "./Settings.Class.js";
class EntradaClass {
  constructor(mainContainer) {
    this.main = mainContainer;
    this.modal = document.createElement("section");
    this.Init(mainContainer)
  }

  Init(mainContainer) {
    mainContainer.innerHTML = ComponentHome();
    mainContainer.querySelector("#menuContent").innerHTML = Menu(3);
    mainContainer.querySelector("#headerContent").innerHTML = Header("Entradas");
    this.BaseData(mainContainer);
    new Settings(mainContainer);
  }

  async BaseData(mainContainer) {
    this.data = await ApiClass.GetEntradas(mainContainer);
    if (this.data) {
      mainContainer.querySelector("#bottomComponent").innerHTML = TableEntradas(this.data?.entradas?.success);
      mainContainer.querySelector("#topComponent").innerHTML = TopEntradas();
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
        this.BaseData(mainContainer);
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
      this.data = await ApiClass.GetEntradasById(mainContainer, id);
      if (this.data) {
        this.produtos = await ApiClass.GetProdutos(mainContainer);
        this.modal.classList.add('modalContainer');
        this.modal.innerHTML = Modal(FormEntradas(this.data?.success, this.produtos?.produtos?.sucess));
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
    
          ApiClass.UpdateEntradas(mainContainer, this.form, id);
    
        })
  
      }
    }

  //Pesquisar
  async Pesquisar(mainContainer, data) {
    this.data = await ApiClass.SearchEntradas(mainContainer, data);
    if (this.data) {
      mainContainer.querySelector("#bottomComponent").innerHTML = TableEntradas(this.data?.success);
      this.Functions(mainContainer);
    }
  }

  //Cadsstrar
  async Cadastrar(mainContainer){
    this.product = await ApiClass.GetProdutos(mainContainer);
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = Modal(FormEntradas("", this.product?.produtos?.sucess || false));
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
      ApiClass.PostEntradas(mainContainer, this.form);
    })
  }

  ///Delete
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
            ApiClass.DeleteDataEntradas(mainContainer, id);
            break;

          default:
            LoadingClass.RemoveModal(mainContainer);
            break;
        }
      })
    })
  }

  async ListarById(mainContainer, id) {
    this.data = await ApiClass.GetEntradasById(mainContainer, id);
    if (this.data) {
      
      this.modal.classList.add("modalContainer");
      this.modal.innerHTML = Modal(CardEntradas(this.data?.success));
      mainContainer.appendChild(this.modal);
      this.Functions(mainContainer);
    }
  }

}; export default EntradaClass;
