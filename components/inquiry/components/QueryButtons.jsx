import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Play, Download, RefreshCw, FileText } from "lucide-react";

const QueryButtons = ({ 
  onExecuteQuery, 
  onExportExcel, 
  onExportPDF, 
  onReset, 
  isLoading 
}) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
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
            color="default"
            variant="bordered"
            startContent={<RefreshCw size={16} />}
            onClick={onReset}
            isDisabled={isLoading}
            className="min-w-[120px]"
          >
            Reset Filters
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default QueryButtons;