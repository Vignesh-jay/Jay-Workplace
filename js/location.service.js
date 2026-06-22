const LOCATIONS_KEY = "jayworkplace_locations";

function getLocations() {

    return JSON.parse(
        localStorage.getItem(
            LOCATIONS_KEY
        )
    ) || [];
}

function saveLocations(locations) {
    localStorage.setItem(
        LOCATIONS_KEY,
        JSON.stringify(locations)
    );
}

function addLocation(location) {
    const locations = getLocations();

    locations.push(location);

    saveLocations(locations);
}

function updateLocation(updatedLocation) {
    const locations = getLocations();

    const index = locations.findIndex(
        l => l.id === updatedLocation.id
    );

    if (index !== -1) {
        locations[index] = updatedLocation;
    }

    saveLocations(locations);
}

function deleteLocation(id) {
    const locations = getLocations().filter(
        l => l.id !== id
    );

    saveLocations(locations);
}

getLocations()