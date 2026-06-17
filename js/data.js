employee.name =
    `${employee.firstName} ${employee.lastName}`;

const dashboardData = {
    employees: 248,
    assets: 612,
    assigned: 489,
    available: 123,

    departments: {
        IT: 85,
        HR: 25,
        Finance: 40,
        Admin: 32,
        Operations: 66
    },

    assetCategories: {
        Laptop: 250,
        Desktop: 120,
        Mobile: 150,
        Monitor: 92
    },

    activities: [
        "Dell Laptop assigned to Vignesh",
        "New employee Priya onboarded",
        "Monitor returned by Karthik",
        "Samsung Phone assigned to Arun",
        "Asset inventory updated"
    ]
};

const employees = [

{
id:"EMP001",
name:"Vignesh Jayaraman",
department:"IT",
designation:"System Administrator",
status:"Active"
},

{
id:"EMP002",
name:"Dinesh Kumar",
department:"Finance",
designation:"Analyst",
status:"Active"
},

{
id:"EMP003",
name:"Priya S",
department:"HR",
designation:"HR Executive",
status:"Active"
},

{
id:"EMP004",
name:"Arun V",
department:"Operations",
designation:"Coordinator",
status:"Active"
},

{
id:"EMP005",
name:"Karthik R",
department:"Admin",
designation:"Administrator",
status:"Active"
}

];

const assets = [

{
    id:"AST001",
    name:"Dell Latitude 5440",
    category:"Laptop",
    status:"Assigned"
},

{
    id:"AST002",
    name:"HP EliteBook 840",
    category:"Laptop",
    status:"Available"
},

{
    id:"AST003",
    name:"Samsung Galaxy A54",
    category:"Mobile",
    status:"Assigned"
},

{
    id:"AST004",
    name:"Dell Monitor 24",
    category:"Monitor",
    status:"Available"
},

{
    id:"AST005",
    name:"Lenovo ThinkPad E14",
    category:"Laptop",
    status:"Assigned"
}

];

const assignments = [

{
    asset:"Dell Latitude 5440",
    employee:"Vignesh Jayaraman",
    assignedDate:"2026-06-01",
    status:"Active"
},

{
    asset:"Samsung Galaxy A54",
    employee:"Priya S",
    assignedDate:"2026-05-25",
    status:"Active"
},

{
    asset:"Lenovo ThinkPad E14",
    employee:"Arun V",
    assignedDate:"2026-05-18",
    status:"Active"
}

];