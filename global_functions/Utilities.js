export class Utilities{
    geoOptions = {
        enableHighAccuracy: false,
        timeOut: 1000,
        maximumAge: 1000,
        distanceFilter:1   
    };

    getUserLocation(callback){
        navigator.geolocation.watchPosition(
            callback,
            this.geoFailure,
            this.geoOptions
        );
    }

    geoFailure = (err) => {
        //this.setState({error: err.message});
    }
}
