import Ember from 'ember';

export default Ember.Controller.extend({
  username: "",
    password: "",
  secpassword: "",
   errorMesag: "",
  okState: false,
  actions: {
      nameChanged (value){
          this.set('username', value);
      },
    passChanged (value){
      this.set('password', value);
    },
    secpassChanged (value){
      this.set('secpassword', value);
      if(this.get('password')!==this.get('secpassword')){
        this.set('errorMesag', "Password doesn't matchs");
        this.set('okState', false);
      } else{
        this.set('errorMesag', "");
        this.set('okState', true);
      }
    },
    userLogin: function () {
      let username = this.get('username');
      let password  = this.get('password');
      let ths = this;
      if(this.get('okState')&&username!=="") {
        Ember.$.ajax({
          type: 'POST',
          url: '/register?username=' + username + '&pass=' + password,
          success: function (data, status, response) {
            ths.set("errorMesag", "");
            document.cookie = "jwt=" + JSON.parse(response.responseText).jwt;
            ths.get("toGraph")();
          },
          error: function () {
            ths.set("errorMesag", "User exists!");
          }
        })
      }
    },
    toGraph: function () {
      this.transitionToRoute("/graph");
    },
    toLog: function () {
      this.transitionToRoute("/");
    }
    }
});
