import { FormValidate } from "../hooks/Validations.js";
import LoadingClass from "../hooks/Loading.js";
import ApiClass from "./Api.class.js";
class LoginClass {
  Login(form) {
    this.inputs = form.querySelectorAll(".input-field");
    this.text = form.querySelector(".textError");
    this.inputs.forEach(input => {
      input.addEventListener("input", () => {
        this.text.innerHTML = "";
        this.text.classList.remove("error");
      })
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!FormValidate(this.inputs)) {
        LoadingClass.FormMessage(this.text, "Preencha todos os campos", "error");
        return;
      }
      LoadingClass.FormLoading(this.text);
      ApiClass.SigIn(form);
    })
  }

  SetPassword(form){
    this.inputs = form.querySelectorAll(".input-field");
    this.text = form.querySelector(".textError");
    this.inputs.forEach(input => {
      input.addEventListener("input", () => {
        this.text.innerHTML = "";
        this.text.classList.remove("error");
      })
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!FormValidate(this.inputs)) {
        LoadingClass.FormMessage(this.text, "Preencha todos os campos", "error");
        return;
      }


      LoadingClass.FormLoading(this.text);
      ApiClass.SigIn(form);
    })
  }
}
export default new LoginClass();