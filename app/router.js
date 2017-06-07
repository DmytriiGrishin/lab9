import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('graph');
  this.route('login');
  this.route('ind', {path: '/'}, function() {
    this.route('login');
  });
});

export default Router;
