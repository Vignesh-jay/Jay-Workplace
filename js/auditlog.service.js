const AUDIT_LOGS_KEY =
    "jayworkplace_auditlogs";

function getAuditLogs() {

    return JSON.parse(
        localStorage.getItem(
            AUDIT_LOGS_KEY
        ) || "[]"
    );

}

function saveAuditLogs(
    logs
) {

    localStorage.setItem(
        AUDIT_LOGS_KEY,
        JSON.stringify(logs)
    );

}

function addAuditLog(
    action
) {

    const logs =
        getAuditLogs();

    logs.unshift({

        id: Date.now(),

        action,

        timestamp:
            formatDateTime()

    });

    saveAuditLogs(logs);

}