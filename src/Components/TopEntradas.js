export default function TopTable(){
  return(
    `
    <div class="topTable">
      <div class="searchBox">
        <form action="#" id="pesquisarBox">
          <input type="search" placeholder="Pesquisar...">
          <button> <i class="bi bi-search"></i></button>
        </form>
      </div>
      <div class="buttons">
        <div class="button reloadButton" id="reloadButton"><i class="bi bi-arrow-clockwise"></i></div>
        <div class="button" id="addButton"><i class="bi bi-plus-lg"></i></div>
      </div>
    </div>
    `
  );
}