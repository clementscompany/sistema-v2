import ApiClass from "../class/Api.class.js";
import Session from "../class/Session.js";
import Modal from "../Components/Modal.js";
import SetPasswordCard from "../Components/SetForm.js";
import UserList from "../Components/UserList.js";
import { Navigate } from "../Routes.js";
import LoadingClass from "../hooks/Loading.js";
import { ValidatePassword } from "../hooks/Validations.js";

class SetPass{
  constructor(mainContainer){
    this.main = mainContainer;
    this.modal = document.createElement("section");
    this.Init(mainContainer);
  }

  async Init(mainContainer){
    this.data = await ApiClass.ListAllUsers(mainContainer);
    if (this.data) {
      mainContainer.innerHTML = Modal(UserList(this.data?.success));
      this.Functions(mainContainer);
    }
  }

  Functions(mainContainer){
    this.closeButton = mainContainer.querySelector("#closeModal");
    this.closeButton.addEventListener("click", ()=>{
      Navigate("/dashboard");
      new Session(mainContainer);
    });

    this.setButton = mainContainer.querySelectorAll(".user-item");
    this.setButton.forEach((element) => {
        element.onclick = () =>{
          const id = element.id;
          this.SetpPasword(id, mainContainer);
        }
    });
  }

  SetpPasword(id, mainContainer){
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = Modal(SetPasswordCard());
    mainContainer.appendChild(this.modal);

    this.closeButton = mainContainer.querySelectorAll("#closeModal");
    this.closeButton.forEach((button, index)=>{
      button.addEventListener("click", ()=>{
        if (index === 1) {
          LoadingClass.RemoveModal(mainContainer);
        }
      })
    })
    this.form = mainContainer.querySelector("#formSetPassword");
    this.inputs = this.form.querySelectorAll(".input-field");
    this.text = this.form.querySelector(".textError");
    this.inputs.forEach((input)=>{
      input.addEventListener("input", ()=>{
        this.text.innerHTML = "";
        this.text.classList.remove("error");
      })
    })
    this.form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const data = { password:this.inputs[0].value, confirmPassword:this.inputs[1].value };
      if (!ValidatePassword(data)) {
        LoadingClass.FormMessage(this.text, "As senhas não correspondem", "error");
        return;
      }
      
      LoadingClass.FormLoading(this.text);
      ApiClass.PutPassword(id, this.form);
    })
  }
}
export default SetPass;
