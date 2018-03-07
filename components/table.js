const html = Polymer.html;
// Define the class for a new element called custom-element
class tableElement extends Polymer.Element {
    static get is() { return 'items-table'; }
    constructor() {
        super();
    }

    static get properties(){
        return {
            items : {
              type: Array
            },
            headers : {
              type: Array
            }
        }
    }

    static get template(){
      return html`
                  <link rel="stylesheet" href="css/table_component.css" />
                  <link rel="stylesheet" href="https://getbootstrap.com/docs/3.3/dist/css/bootstrap.min.css" />
                  <table class="table">
                    <thead>
                      <tr>
                        <template is="dom-repeat" items="{{headers}}">
                          <th>{{item}}</th>
                        </template>
                          <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                  <template is="dom-repeat" items="{{items}}">
                    <tr>
                      <template is="dom-repeat" items="{{item}}">
                        <td>{{item}}</td>
                      </template>
                        <td><span class="glyphicon glyphicon-remove" onclick="javascript:deleteItem(event)"></span></td>
                    </tr>
                  </template></tbody></table>`
    }
}

// Register the new element with the browser
customElements.define(tableElement.is, tableElement);
