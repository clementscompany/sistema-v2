import Entregas from "../class/Entregas.Class.js";
import {mainContainer} from "../../renderer.js";
export default function EntregasPage(){
  new Entregas(mainContainer)
}