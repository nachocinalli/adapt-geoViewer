/* eslint-disable no-undef */
import ComponentView from 'core/js/views/componentView';
import 'libraries/leaflet.js';

class GeoViewerView extends ComponentView {
  preRender() {
    this.onMapSetView = this.onMapSetView.bind(this);
  }

  postRender() {
    this.setupMap();
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
  }

  setupMap() {
    const { lat, lng, zoom, zoomPosition, _geoJSON, _items, _defaults } = this.model.attributes;

    this.initializeMap(lat, lng, zoom, _defaults);
    this.addTileLayer();
    this.addZoomControl(zoomPosition);
    if (_items.length > 0) {
      this.addMarkers(_items);
    }

    if (Object.keys(_geoJSON).length > 0) {
      this.addGeoJSONLayer(_geoJSON);
    }
    this.setupAttributionLink();
  }

  initializeMap(lat, lng, zoom, _defaults) {
    const customDefaults = {
      scrollWheelZoom: false,
      zoomControl: false,
      preferCanvas: true
    };
    const defaults = Object.assign({}, customDefaults, _defaults);
    const mapRef = 'map-' + this.model.get('_id');
    this.map = L.map(mapRef, defaults).setView([lat, lng], zoom);
    /*
    this.map.on('click', function (e) {
      alert('Lat, Lon : ' + e.latlng.lat + ', ' + e.latlng.lng);
    });
    */
  }

  addTileLayer() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  addZoomControl(position) {
    L.control.zoom({ position }).addTo(this.map);
  }

  addMarkers(items) {
    items.forEach(({ lat, lng, name, description }) => {
      const marker = L.marker([lat, lng]).addTo(this.map);
      marker.bindPopup(`<strong>${name}</strong><br>${description}`);
    });
  }

  addGeoJSONLayer(geoJSON) {
    L.geoJSON(geoJSON, {
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.description || ''}`);
        }
      }
    }).addTo(this.map);
  }

  setupAttributionLink() {
    this.$el.find('a').attr('target', '_blank');
  }

  onMapSetView(lat, lng, zoom) {
    this.map.setView([lat, lng], zoom);
  }
}

GeoViewerView.template = 'geoViewer.jsx';

export default GeoViewerView;
