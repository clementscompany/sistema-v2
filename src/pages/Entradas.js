import EntradaClass from "../class/Entradas.class.js";
import { mainContainer } from "../../renderer.js";

export default function  EntradasPage() {
  new EntradaClass(mainContainer);
}