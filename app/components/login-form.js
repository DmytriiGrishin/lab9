import Ember from 'ember';
//TODO: add login and websocket with messages
export default Ember.Component.extend({
    username: "",
    password: "",
  actions: {
    userLogin: function () {
        this.get("store").createRecord('user', {
          username: this.get("username"),
          password: this.get("password")
        })
    }
    }

});
