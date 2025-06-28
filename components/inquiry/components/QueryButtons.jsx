import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Play, Download, RefreshCw, FileText, Save } from "lucide-react";

const QueryButtons = ({
  onExecuteQuery,
  onExportExcel,
  onExportCSV,
  onExportPDF,
  onReset,
  onSaveQuery,
  onShowSQL,
  isLoading,
}) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex flex-wrap gap-3 justify-center md:justify-center">
          <Button
            color="primary"
            startContent={<Play size={16} />}
            onClick={onExecuteQuery}
            isLoading={isLoading}
            className="min-w-[120px]"
          >
            Execute Query
          </Button>

          <Button
            color="default"
            variant="bordered"
            startContent={<RefreshCw size={16} />}
            onClick={onReset}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Reset Filters
          </Button>

          <Button
            color="success"
            variant="flat"
            startContent={<Download size={16} />}
            onClick={onExportExcel}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Export Excel
          </Button>

          <Button
            color="secondary"
            variant="flat"
            startContent={<Download size={16} />}
            onClick={onExportCSV}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Export CSV
          </Button>

          <Button
            color="danger"
            variant="flat"
            startContent={<FileText size={16} />}
            onClick={onExportPDF}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Export PDF
          </Button>

          <Button
            color="warning"
            variant="flat"
            startContent={<Save size={16} />}
            onClick={onSaveQuery}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Simpan Query
          </Button>

          <Button
            color="info"
            variant="flat"
            startContent={<FileText size={16} />} // You can use a different icon if desired
            onClick={onShowSQL}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Show SQL
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default QueryButtons;
