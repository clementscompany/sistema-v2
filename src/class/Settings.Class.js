import CardPerfil from "../Components/CardPerfil.js";
import ChoicePopUp from "../Components/ChoicePopUp.js";
import FormRegister from "../Components/FormRegister.js";
import ListUsers from "../Components/ListUsers.js";
import MiniSpinner from "../Components/MiniSpinner.js";
import Modal from "../Components/Modal.js";
import ResultGetUsers from "../Components/ResultGetUsers.js";
import LoadingClass from "../hooks/Loading.js";
import ApiClass from "./Api.class.js";

class Settings {
  constructor(mainContainer) {
    this.main = mainContainer;
    this.card = document.createElement("div");
    this.modal = document.createElement("section");
    this.Profil(mainContainer);
    this.SetTheme(mainContainer);
    this.ChangeTheme();
    this.LogOutFunction(this.main);
  }

  Profil(mainContainer) {
    this.open = mainContainer.querySelector("#openPerfil");
    this.open.addEventListener("click", () => {
      this.card.innerHTML = CardPerfil();
      mainContainer.appendChild(this.card);
      this.closeCardOnClickOutside = (e) => {
        if (e.target.id === "component") {
          mainContainer.removeChild(this.card);
          window.removeEventListener("click", this.closeCardOnClickOutside);
        }
      };
      this.usersButton = mainContainer.querySelector("#userButton");
      this.usersButton.addEventListener("click", ()=>{
        mainContainer.removeChild(this.card);
        this.PageUSers(mainContainer);
      })
      window.addEventListener("click", this.closeCardOnClickOutside);
      this.closeCardButton = this.card.querySelector("#closeCardButton");
      this.closeCardButton.addEventListener("click", () => {
        mainContainer.removeChild(this.card);
        window.removeEventListener("click", this.closeCardOnClickOutside);
      });
      this.LogOutFunction(mainContainer);
    });
  }

  LogOutFunction(mainContainer) {
    //log out Functions 
    this.logoutButton = mainContainer.querySelectorAll("#logOutButton");
    this.logoutButton.forEach(button => {
      button.addEventListener("click", () => {
        this.card.classList.add("modalContainer");
        this.card.innerHTML = ChoicePopUp("Tem certeza que deseja terminar a sessão?", "error");
        mainContainer.appendChild(this.card);

        this.choiceButtons = mainContainer.querySelectorAll("#choiceButtons > button");
        this.choiceButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            switch (index) {
              case 0:
                this.card.innerHTML = MiniSpinner();
                sessionStorage.removeItem("session_token");
                setTimeout(() => {
                  // window.location.reload();
                  window.close();
                  sessionStorage.removeItem("session_token");
                }, 300);
                break;
              default:
                mainContainer.removeChild(this.card);
                break;
            }
          });
        });
      });
    });
  }


  async PageUSers(mainContainer){
    this.data = await ApiClass.ListAllUsers(mainContainer);
    if (this.data) {
      this.modal.classList.add("modalContainer");
      this.modal.innerHTML = ListUsers(this.data);
      mainContainer.appendChild(this.modal);
      this.Functions(mainContainer);
      this.Search(mainContainer);
      this.event = window.addEventListener("click", (e)=>{
        if (e.target.className === "modalContainer") {
          LoadingClass.RemoveModal(mainContainer);
          return removeEventListener("click", this.event)
        }
      })
    }
  }
  
  Search(mainContainer){
    this.search = mainContainer.querySelector("#searchUsers");
    this.data = this.search.querySelector(".inputBox > input");
    const content = mainContainer.querySelector("#bottomPerson");
    this.search.addEventListener("submit", async (e)=>{
      e.preventDefault()
      if (this.data.value.trim() !== "") {
        this.result = await ApiClass.SearchUsers(content, this.data.value);
        if (this.result) {
          content.innerHTML = ResultGetUsers(this.result);
          this.Functions(mainContainer);
        }
      }
    })
  }

  Functions(mainContainer){
    this.list = mainContainer.querySelectorAll(".person");
      this.list.forEach((list, index)=>{
        list.addEventListener("click", ()=>{
         this.list.forEach((li)=> li.classList.remove('active'));
         list.classList.add('active');   
        })
      });

      this.closeButton = mainContainer.querySelector("#closeButton");
      this.closeButton.addEventListener("click", ()=>{
        LoadingClass.RemoveModal(mainContainer);
      });


      this.registerButton = mainContainer.querySelector("#registerButton");
      this.registerButton.addEventListener("click", ()=>{
        this.CreateUser(mainContainer);
      })

      this.reloadButton = mainContainer.querySelector("#reloadData");  
      this.reloadButton.addEventListener("click", ()=>{
        LoadingClass.RemoveModal(mainContainer);
        this.PageUSers(mainContainer);
      })

      this.deleteButton = mainContainer.querySelectorAll(".deleteButton");
      this.deleteButton.forEach((button)=>{
        button.addEventListener("click", ()=>{
          this.modal.innerHTML = ChoicePopUp("Tem certeza que pretende eliminar este usuário?", "error");
          this.choiceButtons = this.modal.querySelectorAll("#choiceButtons > button");
          this.choiceButtons.forEach((choice, index)=>{
            choice.addEventListener("click", ()=>{
              switch (index) {
                case 0:
                  ApiClass.DeleteUser(mainContainer, button.value);
                break;
              
                default:
                  LoadingClass.RemoveModal(mainContainer);
                break;
              }
            })
          })
        })
      })
  }


  CreateUser(mainContainer){
    LoadingClass.RemoveModal(mainContainer);
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = ChoicePopUp("Deseja cadastrar um novo usuário?",  "sucess");
    mainContainer.appendChild(this.modal);
 
    this.choice = mainContainer.querySelectorAll("#choiceButtons >  button");
    this.choice.forEach((button, index)=>{
      button.addEventListener("click", ()=>{
        switch (index) {
          case 0:
            this.modal.innerHTML = Modal(FormRegister());
            this.form = mainContainer.querySelector("#formRegister");
            this.prepareData(this.form);
            mainContainer.querySelector("#closeModal").addEventListener("click", ()=>{
              LoadingClass.RemoveModal(mainContainer);
            });
          break;
        
          default:
            LoadingClass.RemoveModal(mainContainer);
          break;
        }
      })
    })

    this.prepareData = (form)=> { 
      this.text = form.querySelector(".textError");
      this.input = form.querySelector(".input-field");
      this.input.addEventListener("input", ()=>{
        this.text.classList.remove("error");
        this.text.innerHTML = "";
      })
      form.addEventListener("submit", (e)=>{
        e.preventDefault();     
        if (this.input.value.trim() === "") {
          LoadingClass.FormMessage(this.text, "Preencha o campo", "error");
          return;
        }

        LoadingClass.FormLoading(this.text);
        ApiClass.RegisterUser(form);
      })
    }

  }

  //theme settings 
  SetTheme(mainContainer) {
    this.themeButton = mainContainer.querySelector("#themeButton");
    this.themeButton.addEventListener("click", () => {
      this.oldTheme = localStorage.getItem("theme-system") || "dark";
      this.newTheme = this.oldTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme-system", this.newTheme);
      this.ChangeTheme();
    });
  }

  ChangeTheme() {
    this.theme = localStorage.getItem("theme-system") || "dark";
    document.documentElement.setAttribute("theme-system", this.theme);
  }
}

export default Settings;
