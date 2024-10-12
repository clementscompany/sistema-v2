import EntradasPage from "./pages/Entradas.js";
import EntregasPage from "./pages/EntregasPage.js";
import HomePage from "./pages/Home.js";
import PageRelatorio from "./pages/Relatorios.js";
import StockPage from "./pages/StockPage.js";
export function Route(){
  const path = window.location.hash.substring(1);
  switch (path) {
    case "/dashboard":
      HomePage();
    break;
  
    case "/entregas":
      EntregasPage();
    break;

    case "/entradas":
      EntradasPage();
    break;

    case "/stock":
      StockPage();
    break;
    
    case "/relatorios":
      PageRelatorio();
    break;
  }
}
export const Navigate = (path)=>{
  window.location.hash = path;
}