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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
      hideCloseButton
      classNames={{
        header:
          "bg-gradient-to-r from-gray-200 to-zinc-200 dark:from-zinc-800 dark:to-zinc-800 rounded-xl",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center m-6">
          <div className="text-lg font-semibold">{title || "SQL Preview"}</div>
        </ModalHeader>

        <ModalBody>
          <div className="bg-gray-100 p-8 rounded-xl overflow-x-auto max-h-[60vh]">
            <pre className="whitespace-pre-wrap break-words text-sm font-mono text-gray-800 text-center">
              {query && query.replace(/\s+/g, " ").trim()}
            </pre>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-between">
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            startContent={<X size={16} />}
          >
            Tutup
          </Button>
          <Button
            color="default"
            variant="ghost"
            onPress={handleCopy}
            startContent={copied ? <Check size={16} /> : <Copy size={16} />}
          >
            {copied ? "Tersalin!" : "Salin ke Clipboard"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SqlPreviewModal;
