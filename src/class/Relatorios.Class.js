import ComponentHome from "../Components/ComponentHome.js";
import Estatistic from "../Components/Estatistic.js";
import Header from "../Components/Header.js";
import Menu from "../Components/Menu.js";
import ApiClass from "./Api.class.js";
import Settings from "./Settings.Class.js";
class Relatorios{
  constructor(mainContainer){
    this.main = mainContainer;
    this.modal = document.createElement("section");
    this.Init(this.main);
  }

  Init(mainContainer){
    mainContainer.innerHTML = ComponentHome();
    mainContainer.querySelector("#menuContent").innerHTML = Menu(5);
    mainContainer.querySelector("#headerContent").innerHTML = Header("Relatório");
    this.DataRelatorio(mainContainer);
    new Settings(mainContainer);
  }

  async DataRelatorio(mainContainer){
    this.data = await ApiClass.GetAllDataMome(mainContainer);
    if (this.data) {
      mainContainer.querySelector("#topComponent").innerHTML = Estatistic(this.data?.estsatistic)
    }
  }

}
export default Relatorios;