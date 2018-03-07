const html = Polymer.html;
// Define the class for a new element called custom-element
class tableElement extends Polymer.Element {
    static get is() { return 'users-table'; }
    constructor() {
        super();
    }

    static get properties(){
        return {
            users : {
              type: Array
            },
            headers : {
              type: Array
            }
        }
    }

    static get template(){
      return html`
                  <style>
                    table{
                      max-width: 100vw;
                    }
                    th {
                      text-align:left !important;
                      padding: 5px;
                    }
                    thead{
                      background-color: #343a40;
                      color: #ffffff;
                      font-size: 17px;
                      text-transform: uppercase;
                    }
                    tr:nth-of-type(even){
                      background-color: #b9b6b6;
                      color: #ffffff;
                    }
                  </style>
                  <table class="table">
                    <thead>
                      <tr>
                        <template is="dom-repeat" items="{{headers}}">
                          <th>{{item}}</th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                  <template is="dom-repeat" items="{{users}}">
                    <tr>
                      <template is="dom-repeat" items="{{item}}">
                        <td>{{item}}</td>
                      </template>
                    </tr>
                  </template></tbody></table>`
    }

    ready(){
      super.ready();
      let user = new User();
      user.All.then( (users) => {
        this.users = users.values;
        this.headers = users.keys;
      })

      setTimeout( ()=>{
        let user = new User();
        user.create(usr).then( (newUser)=>{
          (this.users).push(newUser);
        });
      },3000);
    }
}

// Register the new element with the browser
customElements.define(tableElement.is, tableElement);
