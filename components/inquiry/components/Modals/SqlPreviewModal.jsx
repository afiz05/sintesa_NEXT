"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { X, Copy, Check } from "lucide-react";

const SqlPreviewModal = ({ isOpen, onClose, query, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (query) {
      try {
        await navigator.clipboard.writeText(query);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        setCopied(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="text-lg font-semibold">{title || "SQL Preview"}</div>
        </ModalHeader>

        <ModalBody>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh]">
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
              {query}
            </pre>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-between">
          <Button
            color="primary"
            variant="flat"
            onPress={handleCopy}
            startContent={copied ? <Check size={16} /> : <Copy size={16} />}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>

          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            startContent={<X size={16} />}
          >
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SqlPreviewModal;
