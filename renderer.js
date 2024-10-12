import { Navigate, Route } from "./src/Routes.js";
export const mainContainer = document.querySelector("#mainCintainer");
window.addEventListener("DOMContentLoaded", ()=>{
Route();
Navigate("/dashboard");
})
window.addEventListener("hashchange", Route);