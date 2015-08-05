let React        = require('react');
let mui          = require('material-ui');
let AppBar       = mui.AppBar;
let List         = mui.List;
let ListItem     = mui.ListItem;
let RaisedButton = mui.RaisedButton;
let Dialog       = mui.Dialog;

let ThemeManager         = new mui.Styles.ThemeManager();
let injectTapEventPlugin = require("react-tap-event-plugin");

let coreValueKeys = [
  "UserFirst",
  "ThinkBig",
  "Challenge",
  "Commitment",
  "Professionalism",
  "Collaboration",
  "DeliverWOW",
  "Simplicity",
  "Evolution",
  "Frugality"
];

var App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function() {
    return {messageContent: "No message", messageTitle: "No title"};
  },
  render() {
    let values = [];
    for (var i = 0; i < 10; i++) {
      values.push(<ListItem primaryText={coreValueKeys[i]} onClick={this.onCoreValue.bind(null, i)} />);
    }
    return (
          <div>
            <AppBar title="ACCESS MVC" showMenuIconButton={false}/>
            <List>
              <ListItem primaryText="Mission" onClick={this.onMission} />
              <ListItem primaryText="Vision" onClick={this.onVision} />
              <ListItem primaryText="Core Values" >
                {values}
              </ListItem>
            </List>
            <Dialog
              title={this.state.messageTitle}
              actions={[{ text: 'OK' }]}
              ref="messageDialog"
              actionFocus="submit">
                {this.state.messageContent}
            </Dialog>
          </div>
    );
  },
  onMission() {
    mvc.fetchMission((mission) => {
      this.setState({
        messageTitle: "Mission",
        messageContent: mission
      });
      this.refs.messageDialog.show();
    }, () => {
      this.setState({
        messageTitle: "Error",
        messageContent: "Failed to fetch mission"
      });
      this.refs.messageDialog.show();
    });
  },
  onVision() {
    mvc.fetchVision((vision) => {
      this.setState({
        messageTitle: "Vision",
        messageContent: vision
      });
      this.refs.messageDialog.show();
    }, () => {
      this.setState({
        messageTitle: "Error",
        messageContent: "Failed to fetch vision"
      });
      this.refs.messageDialog.show();
    });
  },
  onCoreValue(index) {
    mvc.fetchCoreValues((coreValues) => {
      this.setState({
        messageTitle: coreValueKeys[index],
        messageContent: coreValues[index]
      });
      this.refs.messageDialog.show();
    }, () => {
      this.setState({
        messageTitle: "Error",
        messageContent: "Failed to fetch core values"
      });
      this.refs.messageDialog.show();
    });
  },
  closeDialog() {
   this.refs.messageDialog.hide();
  }
});


var app = {
  initialize: function() {
    this.bindEvents();

    injectTapEventPlugin();
    React.render(<App />, container);
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

app.initialize();
