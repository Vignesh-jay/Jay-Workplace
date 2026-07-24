let importResultModal;

function showImportResult(summary) {
  if (!importResultModal) {
    importResultModal = new bootstrap.Modal(document.getElementById('importResultModal'));
  }

  document.getElementById('importResultContent').innerHTML = `

        <div class="mb-3">

            <i class="fas fa-circle-check text-success"
               style="font-size:64px;"></i>

        </div>

        <h4 class="text-success">

            Import Completed

        </h4>

        <hr>

        <div class="row text-center">

            <div class="col">

                <h3>${summary.imported}</h3>

                <small>Imported</small>

            </div>

            <div class="col">

                <h3>${summary.skipped}</h3>

                <small>Skipped</small>

            </div>

            <div class="col">

                <h3>${summary.failed}</h3>

                <small>Failed</small>

            </div>

        </div>

    `;

  importResultModal.show();
}
