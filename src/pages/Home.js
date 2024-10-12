import { mainContainer } from "../../renderer.js";
import Home from "../class/Home.class.js";
import Session from "../class/Session.js";
export default function HomePage(){
  const session_token = sessionStorage.getItem("session_token");
  if (!session_token) {
    new Session(mainContainer);
    return;
  }
  new Home(mainContainer);
}