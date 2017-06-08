import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  isLogged: Ember.computed('jwt', function (){
    return !(this.get("jwt")===""|| this.get("jwt")===null);
  }),
  jwt: "",
  username: "",
  password: ""
});
