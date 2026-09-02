async function loadUserLocations() {
  const locations = await getLocations('active');

  const assigned = await getUserLocationsApi(currentUser.id);

  const assignedIds = assigned.data.map((location) => location.id);

  let html = '';

  locations.forEach((location) => {
    html += `
            <div class="form-check mb-2">

                <input
                    class="form-check-input user-location"
                    type="checkbox"
                    value="${location.id}"
                    id="location-${location.id}"
                    ${assignedIds.includes(location.id) ? 'checked' : ''}>

                <label
                    class="form-check-label"
                    for="location-${location.id}">

                    ${location.name}

                </label>

            </div>
        `;
  });

  document.getElementById('userLocationsContainer').innerHTML = html;
}

async function saveUserLocations() {
  const locationIds = [];

  document.querySelectorAll('.user-location:checked').forEach((item) => {
    locationIds.push(Number(item.value));
  });

  await updateUserLocationsApi(currentUser.id, locationIds);

  alert('Locations updated successfully.');
}
