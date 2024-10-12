export default function ComponentHome(){
  return(
    `
    <div class="layout">
      <div class="menuContent" id="menuContent"></div>
        <div class="content" id="content">
          <div id="headerContent"></div>
          <div class="component" id="component">
            <div id="topComponent"></div>
            <div id="bottomComponent"></div>
          </div>
        </div>
    </div>
    `
  );
}