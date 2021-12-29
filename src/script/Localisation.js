    export function getLocation(_callback) {
        var request = new XMLHttpRequest();

        request.open('GET', 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248b6a8d55e0873484e9fdfce09ec950e99&start=1.4803005003724554,43.66198157579554&end=1.5093173060193614,43.692808267519624');

        request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                _callback(JSON.parse(this.response))

            }
        };
        request.send();
    }