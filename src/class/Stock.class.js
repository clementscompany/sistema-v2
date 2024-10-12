import ComponentHome from "../Components/ComponentHome.js";
import Menu from "../Components/Menu.js";
import ApiClass from "./Api.class.js";
import Header from "../Components/Header.js";
import TableStock from "../Components/TableStock.js";
import TopTable from "../Components/TopEntradas.js";
import Modal from "../Components/Modal.js";
import FormProdutos from "../Components/FormProdutos.js";
import { FormValidate } from "../hooks/Validations.js";
import LoadingClass from "../hooks/Loading.js";
import ChoicePopUp from "../Components/ChoicePopUp.js";
import CardProdutos from "../Components/CardProduto.js";
import Settings from "./Settings.Class.js";

class Stock{
  constructor(mainContainer){
    this.main = mainContainer;
    this.modal = document.createElement("section");
    this.element = document.createElement("div");
    this.Init(this.main);
  }

  Init(mainContainer){
    mainContainer.innerHTML = ComponentHome();
    mainContainer.querySelector("#headerContent").innerHTML = Header("Stock");
    mainContainer.querySelector("#menuContent").innerHTML = Menu(4);
    this.DataStock(mainContainer);
    new Settings(mainContainer);
  }
  
  async DataStock(mainContainer){
    this.data = await ApiClass.GetAllDataMome(mainContainer);
    if (this.data) {
      this.element.innerHTML = TopTable();
      mainContainer.querySelector("#topComponent").appendChild(this.element);
      mainContainer.querySelector("#bottomComponent").innerHTML = TableStock(this.data?.produtos?.sucess)
      this.Functions(mainContainer);
    }
  }

  Functions(mainContainer){
    this.addButtons = mainContainer.querySelectorAll("#addButton");
    this.addButtons.forEach(add => {
      add.addEventListener("click", ()=>{
        this.Cadastrar(mainContainer);
      })
    });

    this.SearchBox = mainContainer.querySelector("#pesquisarBox");
    this.valueSearch = this.SearchBox.querySelector("input");
    this.SearchBox.addEventListener("submit", (e)=>{
      e.preventDefault();
      if (this.valueSearch.value.trim() !== "") {
        this.Pesquisar(mainContainer, this.valueSearch.value);
      }
    })

    this.closeModal = mainContainer.querySelectorAll("#closeModal");
    this.closeModal.forEach(add => {
      add.addEventListener("click", ()=>{
        LoadingClass.RemoveModal(mainContainer);
      })
    });

    this.reloadButton = mainContainer.querySelectorAll(".reloadButton");
    this.reloadButton.forEach((button)=>{
      button.addEventListener("click", ()=>{
        this.DataStock(mainContainer);
      })
    })

    this.deleteButton = mainContainer.querySelectorAll(".deleteButton");
    this.deleteButton.forEach(button => {
      button.addEventListener("click", ()=>{
        this.Eliminar(mainContainer, button.value);
      })
    });

    this.seeButton = mainContainer.querySelectorAll(".seeButton");
    this.seeButton.forEach((button)=>{
      button.addEventListener("click", ()=>{
        this.Visualizar(mainContainer, button.value);
      })
    })

    this.updateButton = mainContainer.querySelectorAll(".editButton");
    this.updateButton.forEach((button)=>{
      button.addEventListener("click", ()=>{
        this.Atualizar(mainContainer, button.value);
      })
    })
  }


  //pesquisar
  async Pesquisar(mainContainer, data){
    this.result = await ApiClass.SearchProdutos(mainContainer,data);
    if (this.result) {
      mainContainer.querySelector("#bottomComponent").innerHTML = TableStock(this.result?.produtos?.sucess);
      this.Functions(mainContainer);
    }
  }

  async Atualizar(mainContainer, id) {
    this.data = await ApiClass.GetProdutosBy(mainContainer, id);
    if (this.data) {
      console.log(this.data);
      
      this.modal.classList.add("modalContainer");
      this.modal.innerHTML = Modal(FormProdutos(this.data?.produtos?.sucess));
      mainContainer.appendChild(this.modal);
      this.form = mainContainer.querySelector("#formSaidas");
      this.Functions(mainContainer);

      this.input = this.form.querySelectorAll(".input");
      this.text = this.form.querySelector(".textError");
      ///
      this.input.forEach(input => {
        input.addEventListener("input", () => {
          LoadingClass.FormMessage(this.text, "Insira os Dados...", "sucess");
          this.text.classList.remove('error');
        })
      })

     

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!FormValidate(this.input)) {
          LoadingClass.FormMessage(this.text, "Preencha todos os campos!", "error");
          return;
        }
        ApiClass.UpdateProdutos(mainContainer, this.form, id);
      })
    }
  }

  async Visualizar(mainContainer, id){
    this.data = await ApiClass.GetProdutosBy(mainContainer, id);
    if (this.data) {
      this.modal.classList.add("modalContainer");
      this.modal.innerHTML = Modal(CardProdutos(this.data?.produtos?.sucess));
      mainContainer.appendChild(this.modal);
      this.Functions(mainContainer);
    }
  }


  

  Eliminar(mainContainer,id){
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = ChoicePopUp("Tem certeza que deseja elimiar estes dados?", "error");
    mainContainer.appendChild(this.modal);
    this.choiceButtons = mainContainer.querySelectorAll("#choiceButtons > button");
    this.choiceButtons.forEach((button, index)=>{
      button.addEventListener("click", ()=>{
        switch(index){
          case 0: 
            ApiClass.DeleteProdutos(mainContainer, id);
          break;
          
          case 1:
            LoadingClass.RemoveModal(mainContainer);
          break;  
        }
      })
    })
  }
  async Cadastrar(mainContainer){
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = Modal(FormProdutos(null));
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
      ApiClass.PostProdutos(mainContainer, this.form);
    })
  }
}
export default Stock;