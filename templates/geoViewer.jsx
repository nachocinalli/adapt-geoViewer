import React, { useState } from 'react';
import { templates } from 'core/js/reactHelpers';

export default function GeoViewer({ _id, _mapRefs, onMapSetView, ...props }) {
  const [selectedRef, setSelectedRef] = useState(null);
  const hasRefs = _mapRefs && _mapRefs.length > 0;
  const handleClick = (ref) => {
    if (selectedRef === ref.name) {
      setSelectedRef(null);
      return;
    }
    setSelectedRef(ref.name);
    onMapSetView(ref.lat, ref.lng, ref.zoom);
  };
  return (
    <div className='component__inner geoviewer__inner'>
      <templates.header {...props} />
      <div className={`component__widget geoviewer__widget ${hasRefs ? 'has-refs' : null}`}>
        <div id={`map-${_id}`} className='geoviewer-map'></div>
        {hasRefs && (
          <ul className='geoviewer__refs'>
            {_mapRefs.map((ref, index) => (
              <li key={index}>
                <button className='geoviewer__ref-btn btn-text' onClick={() => handleClick(ref)} aria-expanded={selectedRef === ref.name}>
                  {ref.name}
                </button>
                {selectedRef === ref.name && (
                  <div>
                    <p>{ref.description}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
