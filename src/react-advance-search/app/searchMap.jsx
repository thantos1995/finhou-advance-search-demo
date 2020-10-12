import React, { useState, useEffect } from 'react';
import {
  GoogleMap, Marker, Polygon, useLoadScript,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { Spinner, Modal } from 'react-bootstrap';
import SearchEstateList from './SearchEstateList.jsx';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 20.998745,
  lng: 105.856213,
};

const options = {
  fillColor: 'lightblue',
  fillOpacity: 0.15,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

export default function searchMap(props) {
  const {
    apiKey, regionBoundary, regionPath, coordList,
  } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey, // ,
    // ...otherOptions
  });

  const [mapCenter, setMapCenter] = useState(center);
  const [estateListModalState, controlModal] = useState({ estateList: [], isShow: false });
  // const [markerInfoList, setMarkerInfoList] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     coordList.map((value) => {
  //       const coord = { lng: parseFloat(value.coord.lng), lat: parseFloat(value.coord.lat) };
  //       const key = `${value.coord.lng}-${value.coord.lat}`;
  //       let onClick;
  //       if (value.property.length > 1) {
  //         onClick = () => {
  //           controlModal({
  //             estateList: value.property.map(
  //               (id) => ({ id }),
  //             ),
  //             isShow: true,
  //           });
  //         };
  //       } else {
  //         onClick = () => { console.log(window.location); };
  //       }
  //       return (
  //         {
  //           position: coord,
  //           key,
  //           animation: value.isHightlight ? 1 : -1,
  //           onClick,
  //         }
  //       );
  //     });
  //   })();
  // }, [coordList]);

  function mapCoorArrayToMarker(coordsList) {
    return coordsList.map((value) => {
      const coord = { lng: parseFloat(value.coord.lng), lat: parseFloat(value.coord.lat) };
      const key = `${value.coord.lng}-${value.coord.lat}`;
      let onClick;
      if (value.property.length > 1) {
        onClick = () => {
          console.log('show popup');
          controlModal({
            estateList: value.property.map(
              (id) => ({ id }),
            ),
            isShow: true,
          });
        };
      } else {
        onClick = () => { console.log(window.location); };
      }
      return (
        <a href="google.com">
          <Marker
            position={coord}
            key={key}
            animation={value.isHightlight ? 1 : -1}
            onClick={onClick}
          />
        </a>
      );
    });
  }

  function closeModal() {
    controlModal({ estateList: [], isShow: false });
  }

  useEffect(() => {
    if (regionPath && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: regionPath }, (results, status) => {
        if (status === 'OK') {
          setMapCenter(results[0].geometry.location);
        } else {
          console.alert(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  }, [regionPath, isLoaded]);

  function renderMap() {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    return (
      <>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={9}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {mapCoorArrayToMarker(coordList)}
          {regionBoundary ? (
            <Polygon
              paths={regionBoundary}
              options={options}
            />
          ) : null}
        </GoogleMap>
        <Modal size="lg" show={estateListModalState.isShow} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Danh sách Bất động sản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchEstateList estateList={estateListModalState.estateList} pageSize={10} />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <Spinner />;
}

searchMap.propTypes = {
  apiKey: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  regionBoundary: PropTypes.array,
  regionPath: PropTypes.string,
};
