function initializeStore() {

    if (!localStorage.getItem(STORAGE_KEYS.departments)) {

        localStorage.setItem(
            STORAGE_KEYS.departments,
            JSON.stringify([
                "IT",
                "HR",
                "Finance",
                "Operations",
                "Admin"
            ])
        );

    }

    if (!localStorage.getItem(STORAGE_KEYS.employees)) {
        localStorage.setItem(
            STORAGE_KEYS.employees,
            JSON.stringify(employees)
        );
    }

    if (!localStorage.getItem(STORAGE_KEYS.assets)) {
        localStorage.setItem(
            STORAGE_KEYS.assets,
            JSON.stringify(assets)
        );
    }

    if (!localStorage.getItem(STORAGE_KEYS.assignments)) {
        localStorage.setItem(
            STORAGE_KEYS.assignments,
            JSON.stringify(assignments)
        );
    }

    if (!localStorage.getItem(STORAGE_KEYS.activities)) {
        localStorage.setItem(
            STORAGE_KEYS.activities,
            JSON.stringify(dashboardData.activities)
        );
    }
    const activities =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.activities
            )
        ) || [];

    if (
        activities.length > 0 &&
        typeof activities[0] === "string"
    ) {

        const migrated =
            activities.map(item => ({

                message: item,

                timestamp:
                    "Legacy Activity"

            }));

        saveActivities(migrated);

    }
    if (!localStorage.getItem(STORAGE_KEYS.assetHistory)) {

    localStorage.setItem(
        STORAGE_KEYS.assetHistory,
        JSON.stringify([])
    );

}
}

function getEmployees() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.employees)
    ) || [];
}

function getAssets() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.assets)
    ) || [];
}

function getAssignments() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.assignments)
    ) || [];
}

function getActivities() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.activities)
    ) || [];
}

function getAssetHistory() {

    return JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.assetHistory
        )
    ) || [];

}

function saveAssets(assetList) {
    localStorage.setItem(
        STORAGE_KEYS.assets,
        JSON.stringify(assetList)
    );
}

function saveEmployees(employeeList) {
    localStorage.setItem(
        STORAGE_KEYS.employees,
        JSON.stringify(employeeList)
    );
}

function saveAssignments(assignmentList) {
    localStorage.setItem(
        STORAGE_KEYS.assignments,
        JSON.stringify(assignmentList)
    );
}

function saveActivities(activityList) {
    localStorage.setItem(
        STORAGE_KEYS.activities,
        JSON.stringify(activityList)
    );
}

function saveAssetHistory(history) {

    localStorage.setItem(
        STORAGE_KEYS.assetHistory,
        JSON.stringify(history)
    );

}

const STORAGE_KEYS = {
    employees: "jay_employees",
    assets: "jay_assets",
    assignments: "jay_assignments",
    activities: "jay_activities",
    departments: "jay_departments",
    assetHistory: "jay_asset_history"
};

function getDepartments() {

    return JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.departments
        )
    ) || [];

}

function saveDepartments(departments) {

    localStorage.setItem(
        STORAGE_KEYS.departments,
        JSON.stringify(departments)
    );

}

function addAssetHistory(
    assetId,
    action,
    details
) {

    const history =
        getAssetHistory();

    history.unshift({

        assetId,

        action,

        details,

        timestamp:
            new Date().toLocaleString(
                'en-IN'
            )

    });

    saveAssetHistory(
        history
    );

}