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