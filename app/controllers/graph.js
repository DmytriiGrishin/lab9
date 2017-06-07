import Ember from 'ember';

export default Ember.Controller.extend({
   xVars: ["-3",
    "-2",
    "-1",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5"
  ],
  xInp:"",
  yInp:"",
  rInp:"",
  points: Ember.computed(function () {
    return this.get('store').findAll('point');
  }),
   actions :{
    xchangeListener(xInp) {
      this.set('xInp', xInp);
    },
     rchangeListener(rInp) {
       this.set('rInp', rInp);
     },
     ychangeListener(xInp) {
       this.set('yInp', xInp);
     },
     sendPoint(){
        this.get("store").createRecord('point', {
          x: this.get('xInp'),
          y: this.get('yInp'),
          r: this.get('rInp'),
        }).save();
     }
  }
});
