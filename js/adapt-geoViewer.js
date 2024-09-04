import components from 'core/js/components';
import GeoViewerView from './GeoViewerView';
import GeoViewerModel from './GeoViewerModel';

export default components.register('geoViewer', {
  model: GeoViewerModel,
  view: GeoViewerView
});
