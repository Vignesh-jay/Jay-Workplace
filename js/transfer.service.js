const EMPLOYEE_TRANSFERS_KEY =
    "jayworkplace_employee_transfers";

const ASSET_TRANSFERS_KEY =
    "jayworkplace_asset_transfers";

/* Employee Transfers */

function getEmployeeTransfers() {

    return JSON.parse(
        localStorage.getItem(
            EMPLOYEE_TRANSFERS_KEY
        )
    ) || [];

}

function saveEmployeeTransfers(transfers) {

    localStorage.setItem(
        EMPLOYEE_TRANSFERS_KEY,
        JSON.stringify(transfers)
    );

}

function addEmployeeTransfer(
    transfer
) {

    const transfers =
        getEmployeeTransfers();

    transfers.push(transfer);

    saveEmployeeTransfers(
        transfers
    );

}

/* Asset Transfers */

function getAssetTransfers() {

    return JSON.parse(
        localStorage.getItem(
            ASSET_TRANSFERS_KEY
        )
    ) || [];

}

function saveAssetTransfers(
    transfers
) {

    localStorage.setItem(
        ASSET_TRANSFERS_KEY,
        JSON.stringify(transfers)
    );

}

function addAssetTransfer(
    transfer
) {

    const transfers =
        getAssetTransfers();

    transfers.push(transfer);

    saveAssetTransfers(
        transfers
    );

}