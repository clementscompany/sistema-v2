import Stock from "../class/Stock.class.js";
import { mainContainer } from "../../renderer.js";
export default function StockPage(){
  new Stock(mainContainer);
}