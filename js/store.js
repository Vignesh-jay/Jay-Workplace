function initializeStore() {

    Object.values(STORAGE_KEYS).forEach(key => {

        if (!localStorage.getItem(key)) {

            localStorage.setItem(
                key,
                JSON.stringify([])
            );

        }

    });

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
    assetHistory: "jay_asset_history",
    employeeHistory: "jay_employee_history"
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

        timestamp:  formatDateTime()

    });

    saveAssetHistory(
        history
    );

}

function getEmployeeHistory() {

    return JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.employeeHistory
        )
    ) || [];

}

function saveEmployeeHistory(history) {

    localStorage.setItem(
        STORAGE_KEYS.employeeHistory,
        JSON.stringify(history)
    );

}

function addEmployeeHistory(
    employeeId,
    action,
    details
) {

    const history =
        getEmployeeHistory();

    history.unshift({

        employeeId,

        action,

        details,

        timestamp: formatDateTime()

    });

    saveEmployeeHistory(history);

}

function getEmployeeHistory() {
    return JSON.parse(
        localStorage.getItem(
            "jay_employee_history"
        )
    ) || [];
}

function saveEmployeeHistory(history) {

    localStorage.setItem(
        "jay_employee_history",
        JSON.stringify(history)
    );

}

function getAssignmentHistory() {

    return JSON.parse(
        localStorage.getItem(
            "jay_assignment_history"
        )
    ) || [];

}

function saveAssignmentHistory(history) {

    localStorage.setItem(
        "jay_assignment_history",
        JSON.stringify(history)
    );

}