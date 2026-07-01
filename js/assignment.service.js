function addAssignment(assignment) {

    const assignments = getAssignments();

    assignments.push(assignment);

    saveAssignments(assignments);

    addActivity(
        `${assignment.assetName} assigned to ${assignment.employeeName}`
    );

    return assignment;
}

function saveAssignment() {

    const employeeId =
        document.getElementById("employeeSelect").value;

    const assetId =
        document.getElementById("assetSelect").value;

    const employees = getEmployees();
    const assets = getAssets();

    const employee =
        employees.find(emp => emp.id === employeeId);

    const asset =
        assets.find(ast => ast.id === assetId);

    const assignment = {

        id: crypto.randomUUID(),   // <-- Add this

        assetId: asset.id,
        assetName: asset.name,

        employeeId: employee.id,
        employeeName: `${employee.firstName} ${employee.lastName}`,

        assignedDate: formatDateTime(),
        returnedDate: "",

        status: "Assigned"
    };

    asset.status = "Assigned";

    saveAssets(assets);

    addAssetHistory(
        asset.id,
        "Assigned",
        `Assigned to ${employee.firstName} ${employee.lastName}`
    );

    addEmployeeHistory(
        employee.id,
        "Asset Assigned",
        asset.name
    );
    
    addAssignment(assignment);

    loadAssignments();

    bootstrap.Modal.getInstance(
        document.getElementById("assignAssetModal")
    ).hide();
}