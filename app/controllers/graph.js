import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    this._super();
   Ember.run.schedule("afterRender", this, function () {
     this.get("store").findAll("point").forEach(function (point) {
       point.set("r", this.get("rInp"));
     })
     this.get('drawPoints')(this);
   });
  },
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
  xInp:"-3",
  yInp: "",
  rInp: 1,
  rerrorMesag:"R must be 1 or greater. Set 1 by default",
  points: Ember.computed(function () {
    return this.get('store').findAll('point', {backgroundReload: true});
  }),
  drawPoints: function (ths) {
       ths.get('drawCanvas')(ths);
       let context = document.getElementById("graph").getContext("2d");
       let points = ths.get("points");
       points.forEach(function (point) {
           let x = (point.get("x") )* 50 + 200;
           let y = (-(point.get("y")) * 50 + 200);
           let isInside = point.get("isIn");
           context.beginPath();
           if (isInside===true) {
             context.fillStyle = "Green";
           } else {
             context.fillStyle = "Red";
           }
           context.arc(x, y, 3, 0 * Math.PI, 2 * Math.PI);
           context.fill();
         }
       );
     }.observes("points"),
     drawCanvas: function (ths) {
       function drawCoordinates(context, r) {
         const pixel_transform = 50;
         context.beginPath();
         /*Draw coordianates*/
         context.moveTo(200, 200);
         context.lineTo(200, 0);
         context.lineTo(205, 5);
         context.moveTo(200, 0);
         context.lineTo(195, 5);
         context.moveTo(0, 200);
         context.lineTo(200, 200);
         context.lineTo(200, 400);
         context.moveTo(200, 200);
         context.lineTo(400, 200);
         context.lineTo(395, 205);
         context.moveTo(400, 200);
         context.lineTo(395, 195);
         context.moveTo(0, 200);
         if (r > 0) {
           let pix = r * pixel_transform;
           /*Draw measures*/
           let i;
           for (i = 200 + pix; i >= (200 - pix); i -= pix / 2) {
             context.moveTo(195, i);
             context.lineTo(205, i);
             context.moveTo(i, 195);
             context.lineTo(i, 205);
           }
         }
         context.strokeStyle = "black";
         context.stroke();
         /*Draw coordinates text*/
         context.font = "16px Georgia";
         context.textBaseline = "top";
         context.textAlign = "left";
         context.fillStyle = "black";
         context.fillText("Y", 210, 0);
         context.textAlign = "right";
         context.textBaseline = "bottom";
         context.fillText("X", 400, 190);
       }


       function drawFigure(context, r) {

         const pixel_transform = 50;
         /*Arc fill*/
         context.beginPath();
         context.arc(199, 201, (r / 2) * pixel_transform, 0.5 * Math.PI, Math.PI);
         context.moveTo((199 - (r / 2) * pixel_transform), 201);
         context.lineTo(199, 201);
         context.lineTo(199, (201 + (r / 2) * pixel_transform));
         /*Triangle fill*/
         context.moveTo((199 - r / 2 * pixel_transform), 199);
         context.lineTo(199, 199);
         context.lineTo(199, (199 - r * pixel_transform));
         context.lineTo((199 - r / 2 * pixel_transform), 199);
         /*Rectangle fill */
         context.rect(201, 201, r * pixel_transform, r / 2 * pixel_transform);
         context.closePath();
         context.fillStyle = "#5c99ED";
         context.fill();
         /*Figure Draw End*/
       }

       function canvasFill(r) {
         let canvas = document.getElementById("graph");

         let context = canvas.getContext("2d");
         context.clearRect(0, 0, canvas.width, canvas.height);
         if (r > 0) {
           drawFigure(context, r);
         }
         drawCoordinates(context, r);
       }

       canvasFill(ths.get("rInp"));
     },
   actions : {
    logOut: function () {
      let ths = this;
       function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    }
    let jwt = getCookie("jwt");
       Ember.$.ajax({
         type: "DELETE",
         beforeSend: function(xhr){xhr.setRequestHeader('jwt', jwt)},
         success: function () {
            document.cookie = "jwt=;";
             ths.transitionToRoute("/");
         },

         error: function () {
           ths.set('rerrorMesag', "Can't logout");
         },
         url: "/login",
       });
    },
     deletePoint: function () {
       let ths = this;
       function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    }
    let jwt = getCookie("jwt");
       Ember.$.ajax({
         type: "DELETE",
         beforeSend: function(xhr){xhr.setRequestHeader('jwt', jwt)},
         success: function () {
           ths.get('store').unloadAll("point");
            ths.get('drawPoints')(ths);
         },
         error: function () {
           ths.set('rerrorMesag', "Can't delete");
         },
         url: "/points",
       });

     },
     xchangeListener(xInp) {
       this.set('xInp', xInp);
     },
     rchangeListener(rInp) {
       if (!(rInp > 0)) {
         this.set("rerrorMesag", "R must be 1 or greater. Set 1 by default");
         this.set("rInp", 1);
       } else {
         this.set("rerrorMesag", null);
         this.set('rInp', rInp);
       }
       let ths = this;
       function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    }
    let jwt = getCookie("jwt");
       Ember.$.ajax({
         type: "PATCH",
         beforeSend: function(xhr){xhr.setRequestHeader('jwt', jwt)},
         success: function () {
              ths.set('rerrorMesag', ths.get("rerrorMesag"));
              var points = ths.get("store").findAll("point");
              points.forEach(function (point) {
                point.set("r", ths.get("rInp"));
                  point.save();
              });
              ths.get("drawPoints")(ths);
         },
         error: function () {
           ths.set('rerrorMesag', "Can't update");
         },
         url: "/points?r=" + ths.get("rInp"),
       });
     },
     ychangeListener(yInp) {
       this.set('yInp', yInp);
     },
     sendPoint(){
       if ((this.get("rInp") > 0)) {
         let self = this;
         this.set("rerrorMesag", null);
         if (!(this.get("yInp").isNaN) && this.get("yInp") > -3 && this.get("yInp") < 3) {
           this.set('yerrorMesag', null);
           this.get("store").createRecord('point', {
             x: this.get('xInp'),
             y: this.get('yInp'),
             r: this.get('rInp'),
             id: "point" + this.get('xInp')*10000+this.get('yInp')*100000000+this.get('rInp'),
           }).save().then(function () {
         self.get('drawPoints')(self);
       });
         } else {
           this.set('yerrorMesag', "Y must be in (-3..3) range")
         }
       } else {
         this.set("rerrorMesag", "R must be 1 or greater");
       }
     },
     click: function (evt) {
       let x = ((evt.pageX - Ember.$('#graph').offset().left)-200)/50;
       let y = -((evt.pageY - Ember.$('#graph').offset().top)-200)/50 ;
       let self = this;
       this.get("store").createRecord("point", {
         x: x,
         y: y,
         r: this.get("rInp"),
         id: "point" + x*10000+y*100000000+this.get('rInp'),
       }).save().then(function () {
         self.get('drawPoints')(self);
       });
     },
   }
});
