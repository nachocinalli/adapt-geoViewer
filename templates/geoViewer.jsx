import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default function GeoViewer(props) {
  return (
    <div className='component__inner geoviewer__inner'>
      <templates.header {...props} />
      <div className='component__widget geoViewer__widget'>
        <div id={`map-${props._id}`} className='geoviewer-map'></div>
      </div>
    </div>
  );
}
