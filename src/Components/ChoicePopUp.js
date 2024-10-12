export default function ChoicePopUp(message, status){
  return(
    `
    <div class="popUpMessage">
      <div class="top ${status}">
        <span>${message}</span>
      </div>
      <div class="bottom" id="choiceButtons">
        <button>sim</button>
        <button>não</button>
      </div>
    </div>

    `
  );
}