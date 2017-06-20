import Ember from 'ember';
//TODO: add websocket with messages
export default Ember.Component.extend({
    username: "",
    password: "",
    isError: false,
  actions: {
      nameChanged (value){
          this.set('username', value);
      },
    passChanged (value){
      this.set('password', value);
    },
    userLogin: function () {
      let username = this.get('username');
      let password  = this.get('password');
      let ths = this;
      Ember.$.ajax({
        type: 'GET',
        url: '/login?username=' + username + '&pass=' + password,
        success: function(data, status, response){
          ths.set("isError", false);
          document.cookie = "jwt=" + JSON.parse(response.responseText).jwt;
          ths.get("onLogin")();
        },
        error: function(){
          ths.set("isError", true);
        }
      })
      ;
    },
    toReg: function () {
      this.get('toReg')();
    }
    }

});
