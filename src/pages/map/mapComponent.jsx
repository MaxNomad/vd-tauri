import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { Grid } from '@mui/material/index';

const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 170px)'
};

const center = {
    lat: 50.77,
    lng: 25.38
};

function GoogleMapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDh0cSMynBxAbEbGf9lc36o0AQqcDD1uog'
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <Grid sx={{ m: -3 }}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} map={map} onLoad={onLoad} onUnmount={onUnmount}>
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </Grid>
    ) : (
        <></>
    );
}

export default React.memo(GoogleMapComponent);
