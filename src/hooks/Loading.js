import Loader from "../Components/Loader.js";
import MiniSpinner from "../Components/MiniSpinner.js";
import PopUP from "../Components/PopUp.js";
class LoadingClass{
  constructor(){
    this.modal = document.createElement("section");
  }

  Loading(mainContainer) {
    this.modal.innerHTML = Loader();
    this.modal.classList.add("modalContainer");
    mainContainer.appendChild(this.modal);
  }

  RemoveModal(mainContainer) {
    this.remove = mainContainer.querySelectorAll(".modalContainer");
    if (this.remove) {
      this.remove.forEach(container => {
        mainContainer.removeChild(container);
        container.classList.remove("modalContainer");
      });
    }
  }

  CloseFunction(mainContainer) {
    mainContainer.querySelector("#closeModal").addEventListener("click", () => {
      this.RemoveModal(mainContainer);
    })
  }

  SetErrorMessagePopUp(mainContainer, message, status){
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = PopUP(message, status);
    mainContainer.appendChild(this.modal);
    mainContainer.querySelector("#closePopUp").addEventListener("click", () => {
      this.RemoveModal(mainContainer);
    })
  }

  SetErrorPopUp(mainContainer, message) {
    this.modal.classList.add("modalContainer");
    this.modal.innerHTML = PopUP(message, "error");
    mainContainer.appendChild(this.modal);
    mainContainer.querySelector("#closePopUp").addEventListener("click", () => {
      window.location.reload();
    })
  }

  FormLoading(element){
    element.innerHTML = MiniSpinner();
  }

  FormMessage(content, message, status){
    content.innerHTML = message;
    content.classList.add(status);
  }
}
export default new LoadingClass();
