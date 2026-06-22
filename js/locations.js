function loadLocations() {

    const content = document.getElementById("content");

    const locations = getLocations();

    content.innerHTML = `
        <div class="page-header">
            <h2>Locations</h2>

            <button
                class="btn btn-primary"
                onclick="showLocationModal()">
                Add Location
            </button>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>State</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${locations.map(location => `
                            <tr>
                                <td>${location.code}</td>
                                <td>${location.name}</td>
                                <td>${location.state}</td>
                                <td>${location.status}</td>
                                <td>
                                    <button
                                        class="btn btn-sm btn-outline-primary"
                                        onclick="showLocationModal('${location.id}')">

                                        Edit

                                    </button>

                                    <button
                                        class="btn btn-sm btn-outline-danger"
                                        onclick="removeLocation('${location.id}')">

                                        Delete

                                    </button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function removeLocation(id) {

    if (!confirm("Delete this location?")) {
        return;
    }

    deleteLocation(id);

    loadLocations();
}

function showLocationModal(locationId = null) {

    const locations = getLocations();

    const location =
        locationId
            ? locations.find(
                l => l.id === locationId
            )
            : null;

    const modalHtml = `

    <div class="modal fade"
         id="locationModal"
         tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">

                        ${
                            location
                                ? "Edit Location"
                                : "Add Location"
                        }

                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>

                <div class="modal-body">

                    <div class="mb-3">

                        <label class="form-label">
                            Location Code
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="locationCode"
                            value="${
                                location?.code || ""
                            }">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Location Name
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="locationName"
                            value="${
                                location?.name || ""
                            }">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            State
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="locationState"
                            value="${
                                location?.state || ""
                            }">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Status
                        </label>

                        <select
                            class="form-select"
                            id="locationStatus">

                            <option
                                value="Active"
                                ${
                                    location?.status === "Active"
                                    ? "selected"
                                    : ""
                                }>
                                Active
                            </option>

                            <option
                                value="Inactive"
                                ${
                                    location?.status === "Inactive"
                                    ? "selected"
                                    : ""
                                }>
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                        Cancel

                    </button>

                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick="${
                            location
                                ? `saveLocation('${location.id}')`
                                : 'saveLocation()'
                        }">

                        Save

                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

    const existingModal =
        document.getElementById(
            "locationModal"
        );

    if (existingModal) {
        existingModal.remove();
    }

    document.body.insertAdjacentHTML(
        "beforeend",
        modalHtml
    );

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "locationModal"
            )
        );

    modal.show();
}

function saveLocation(locationId = null) {

    const code =
        document
            .getElementById(
                "locationCode"
            )
            .value
            .trim();

    const name =
        document
            .getElementById(
                "locationName"
            )
            .value
            .trim();

    const state =
        document
            .getElementById(
                "locationState"
            )
            .value
            .trim();

    const status =
        document
            .getElementById(
                "locationStatus"
            )
            .value;

    if (!code || !name || !state) {

        alert(
            "Please complete all fields."
        );

        return;
    }

    if (locationId) {

        updateLocation({
            id: locationId,
            code,
            name,
            state,
            status
        });

    } else {

        addLocation({
            id:
                "LOC" +
                Date.now(),
            code,
            name,
            state,
            status
        });

    }

    const modalElement =
        document.getElementById(
            "locationModal"
        );

    const modal =
        bootstrap.Modal.getInstance(
            modalElement
        );

    modal.hide();

    modalElement.remove();

    loadLocations();
}