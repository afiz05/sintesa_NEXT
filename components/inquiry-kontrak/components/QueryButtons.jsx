import React from "react";
import { Button, ButtonGroup, Card, CardBody } from "@heroui/react";
import {
  Play,
  Download,
  RefreshCw,
  FileText,
  Save,
  MessageCircleHeart,
} from "lucide-react";

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
    <Card className="mb-4 shadow-none bg-transparent">
      <CardBody>
        <div className="flex flex-wrap gap-6 justify-center md:justify-center">
          <Button
            color="primary"
            startContent={<Play size={16} />}
            onClick={onExecuteQuery}
            isLoading={isLoading}
            className="w-[160px] h-[50px]"
          >
            Tayang Data
          </Button>
          <Button
            color="danger"
            variant="ghost"
            startContent={<RefreshCw size={16} />}
            onClick={onReset}
            isDisabled={isLoading}
            className="w-[160px] h-[50px]"
          >
            Reset Filter
          </Button>
          <ButtonGroup>
            <Button
              color="success"
              variant="flat"
              startContent={<Download size={16} />}
              onClick={onExportExcel}
              isDisabled={isLoading}
              className="w-[120px] h-[50px]"
            >
              Excel
            </Button>

            <Button
              color="secondary"
              variant="flat"
              startContent={<Download size={16} />}
              onClick={onExportCSV}
              isDisabled={isLoading}
              className="w-[120px] h-[50px]"
            >
              CSV
            </Button>
          </ButtonGroup>
          <Button
            color="success"
            variant="flat"
            startContent={<MessageCircleHeart size={16} />}
            onClick={onExportPDF}
            isDisabled={isLoading}
            className="w-[160px] h-[50px]"
          >
            Kirim WA
          </Button>

          <Button
            color="warning"
            variant="flat"
            startContent={<Save size={16} />}
            onClick={onSaveQuery}
            isDisabled={isLoading}
            className="w-[160px] h-[50px]"
          >
            Simpan Query
          </Button>

          <Button
            color="default"
            variant="flat"
            startContent={<FileText size={16} />} // You can use a different icon if desired
            onClick={onShowSQL}
            isDisabled={isLoading}
            className="w-[160px] h-[50px]"
          >
            Tayang SQL
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default QueryButtons;
