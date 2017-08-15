import Ember from 'ember'; // eslint-disable-line
import toGeojson from '../utils/to-geojson';
import bbox from 'npm:@turf/bbox'; // eslint-disable-line

export default Ember.Route.extend({
  mapState: Ember.inject.service(),

  model() {
    return this.modelFor('application');
  },

  afterModel(districts) {
    const mapState = this.get('mapState');
    const geojsonDistricts = toGeojson(districts);
    mapState.set('bounds', bbox(geojsonDistricts));
  },

  actions: {
    didTransition() {
      const mapState = this.get('mapState');
      mapState.set('currentlySelected', null);
    },
  },
});
