import Relatorios from "../class/Relatorios.Class.js";
import { mainContainer } from "../../renderer.js";
export default function PageRelatorio(){
  new Relatorios(mainContainer);
}
