export default function PopUP(message, status) {
  return (
    `
    <div class="opoUpError">
        <div class="message">
          <span class="${status}">${message}</span>
        </div>
      <button class="button" id="closePopUp">ok</button>
    </div>
    `
  );
}