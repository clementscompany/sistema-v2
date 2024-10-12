export default function Modal(children) {
  return `
      <div class="modalcontent">
        <div class="topMpdal">
          <div class="left">
            <small>
              ${new Date().getUTCDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}
            </small>
          </div>
          <div class="right">
            <button class="closeModal" id="closeModal">x</button>
          </div>
        </div>
        <div class="children">
          ${children}
        </div>
      </div>
  `;
}

