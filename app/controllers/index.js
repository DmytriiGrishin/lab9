import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toGraph(){
      this.transitionToRoute('graph');
    },
    toReg(){
      this.transitionToRoute('reg');
    }
  }
});
