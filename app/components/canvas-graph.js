import Ember from 'ember';
//TODO: fix rendering
export default Ember.Component.extend({
  r: "1",
  didInsertElement: function() {this.triggerAction({
    action: 'drawCanvas',
    target: this
  })},

  actions: {
   drawCanvas: function(){
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
    context.arc(199,201,(r/2)*pixel_transform,0.5*Math.PI,Math.PI);
    context.moveTo((199 - (r/2) * pixel_transform),201);
    context.lineTo(199,201);
    context.lineTo(199,(201 + (r/2)*pixel_transform));
    /*Triangle fill*/
    context.moveTo((199 - r / 2 * pixel_transform), 199);
    context.lineTo(199, 199);
    context.lineTo(199, (199 - r * pixel_transform));
    context.lineTo((199 - r / 2 * pixel_transform), 199);
    /*Rectangle fill */
    context.rect(201, 201, r * pixel_transform, r/2 * pixel_transform);
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
  canvasFill(this.get("r"));
    }
  },
  store: Ember.inject.service(),
  click: function (event) {
    alert(this.get("r"));
    let x = (event.clientX - 8-200)/50;
    let y = (event.clientY -8 -200)/50;
    this.get("store").createRecord("point", {
      x: x,
      y: y,
      r: this.get("r")
    }).save();

    this.triggerAction({
      action: 'drawCanvas',
      target: this
    });
  },
});
