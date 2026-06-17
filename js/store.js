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

const STORAGE_KEYS = {
    employees: "jay_employees",
    assets: "jay_assets",
    assignments: "jay_assignments",
    activities: "jay_activities",
    departments: "jay_departments"
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