import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  headers: function () {
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
    var headers = {};
    headers['Content-Type'] = 'application/json';
    headers['jwt'] = jwt;
    headers['accept']='application/json';
    return headers;
  }.property().volatile()
});
