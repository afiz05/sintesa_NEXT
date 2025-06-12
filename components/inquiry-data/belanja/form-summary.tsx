"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Listbox,
  ListboxItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Autocomplete,
  AutocompleteItem,
  Chip,
  ScrollShadow,
} from "@heroui/react";
import {
  Search,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Building,
  FileText,
  X,
  Copy,
} from "lucide-react";
import { useBelanja } from "./context";
import {
  ReferenceApiService,
  DepartmentData,
  SatkerData,
  EselonData,
} from "../../../utils/referenceApi";
import { useToast } from "../../context/ToastContext";
import { KementerianForm, EselonIForm, SatkerForm } from "./forms";

// Constants moved outside component to prevent recreating on each render
const CUT_OFF_OPTIONS = [
  { key: "januari", label: "Januari" },
  { key: "februari", label: "Februari" },
  { key: "maret", label: "Maret" },
  { key: "april", label: "April" },
  { key: "mei", label: "Mei" },
  { key: "juni", label: "Juni" },
  { key: "juli", label: "Juli" },
  { key: "agustus", label: "Agustus" },
  { key: "september", label: "September" },
  { key: "oktober", label: "Oktober" },
  { key: "november", label: "November" },
  { key: "desember", label: "Desember" },
];

const TAMPILAN_OPTIONS = [
  { key: "kode", label: "Kode" },
  { key: "kode_uraian", label: "Kode Uraian" },
  { key: "uraian", label: "Uraian" },
  { key: "jangan_tampilkan", label: "Jangan Tampilkan" },
];

const MAX_SATKER_DISPLAY = 100;
const MAX_SEARCH_RESULTS = 100;

// Type definitions
export interface FormOption {
  key: string;
  label: string;
}

// Custom Dropdown-Listbox Hybrid Component
interface DropdownListboxProps {
  items: FormOption[];
  selectedKeys: string[];
  onSelectionChange: (keys: Set<string>) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
  variant?: "bordered" | "flat" | "faded";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  selectionMode?: "single" | "multiple";
}

// Enhanced Searchable Dropdown-Listbox for complex selections
export interface SearchableDropdownListboxProps {
  items: FormOption[];
  allItems?: FormOption[]; // All available items for "Select All" functionality
  selectedKeys: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
  variant?: "bordered" | "flat" | "faded";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  isLoading?: boolean;
  selectionMode?: "single" | "multiple";
  showSelectAll?: boolean;
  maxHeight?: string;
  customItemRenderer?: (item: FormOption) => React.ReactNode;
}

const SearchableDropdownListbox: React.FC<SearchableDropdownListboxProps> = ({
  items,
  allItems, // All available items for "Select All"
  selectedKeys,
  onSelectionChange,
  searchValue,
  onSearchChange,
  placeholder = "Search and select...",
  ariaLabel,
  className = "w-full",
  variant = "bordered",
  size = "sm",
  isDisabled = false,
  isLoading = false,
  selectionMode = "multiple",
  showSelectAll = true,
  maxHeight = "60",
  customItemRenderer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedCount = selectedKeys.size;

  const formatDisplayText = () => {
    if (selectedCount === 0) {
      return placeholder;
    }

    // For single selection or small number of selections, show the actual keys/codes
    if (selectedCount <= 3) {
      const selectedItems = Array.from(selectedKeys)
        .map((key) => {
          const item = items.find((item) => item.key === key);
          return item ? item.key : key;
        })
        .join(", ");
      return selectedItems;
    }

    // For larger selections, show first few keys with count
    const firstThreeKeys = Array.from(selectedKeys)
      .slice(0, 3)
      .map((key) => {
        const item = items.find((item) => item.key === key);
        return item ? item.key : key;
      })
      .join(", ");

    return `${firstThreeKeys}, +${selectedCount - 3} more`;
  };

  const displayText = formatDisplayText();
  const handleSelectionChange = (keys: any) => {
    const keySet = new Set(Array.from(keys) as string[]);
    if (keySet.has("select_all")) {
      // Handle select all - use allItems if provided, otherwise use items
      const itemsToSelectFrom = allItems || items;
      const allKeys = new Set(
        itemsToSelectFrom
          .filter((item) => item.key !== "select_all")
          .map((item) => item.key)
      );
      onSelectionChange(allKeys);
    } else {
      onSelectionChange(keySet);
    }
  };
  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          // Focus the search input when popover opens
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        } else {
          // Reset search when popover closes
          onSearchChange("");
        }
      }}
      placement="bottom-start"
      shouldFlip={true}
      offset={4}
      crossOffset={0}
      containerPadding={20}
      shouldCloseOnBlur={true}
    >
      <PopoverTrigger>
        <Button
          variant={variant}
          size={size}
          isDisabled={isDisabled || isLoading}
          className={`${className} justify-between`}
          endContent={
            isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )
          }
        >
          {displayText}{" "}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[500px] max-w-[90vw] z-50 overflow-visible rounded-lg">
        <div className="w-full overflow-visible">
          {/* Search Header */}
          <div className="p-3 border-b border-divider bg-content1 rounded-t-lg">
            {" "}
            <Input
              ref={searchInputRef}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && items.length > 0) {
                  // Find the first matching item
                  const firstMatch = items[0];
                  if (firstMatch && firstMatch.key !== "select_all") {
                    // Add the first match to selection
                    const newSelection = new Set(selectedKeys);
                    newSelection.add(firstMatch.key);
                    onSelectionChange(newSelection);
                  }
                }
              }}
              variant="bordered"
              size="sm"
              startContent={<Search className="w-4 h-4 text-default-400" />}
              className="w-full"
            />{" "}
          </div>{" "}
          {/* Scrollable Content */}
          <ScrollShadow className="max-h-80 rounded-b-lg">
            {" "}
            {/* Select All Option */}
            {showSelectAll && items.length > 1 && (
              <div
                className="relative flex cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-2 py-1.5 rounded-small justify-between items-center text-foreground-700 bg-transparent hover:bg-default-50 data-[selectable=true]:focus:bg-default-50 border-b-1 border-divider"
                onClick={() => {
                  const itemsToSelectFrom = allItems || items;
                  const allKeys = new Set(
                    itemsToSelectFrom.map((item) => item.key)
                  );
                  onSelectionChange(allKeys);
                }}
              >
                <div className="flex items-center gap-2">
                  <span>📋</span>
                  <span className="font-medium text-primary">
                    Select All ({allItems ? allItems.length : items.length})
                  </span>
                </div>
              </div>
            )}{" "}
            {/* Items List */}
            <Listbox
              aria-label={ariaLabel}
              selectionMode={selectionMode}
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
              items={items}
              variant="flat"
              shouldUseVirtualFocus={true}
              isVirtualized={true}
              virtualization={{
                maxListboxHeight: 256,
                itemHeight: 32,
              }}
              className="overflow-visible"
              classNames={{
                list: "max-h-64",
                base: "overflow-visible",
              }}
            >
              {(item) => (
                <ListboxItem key={item.key} className="py-1">
                  {customItemRenderer ? (
                    customItemRenderer(item)
                  ) : (
                    <div className="flex items-center w-full">
                      <span className="text-small font-medium truncate">
                        {item.label}
                      </span>
                    </div>
                  )}
                </ListboxItem>
              )}
            </Listbox>
          </ScrollShadow>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DropdownListbox: React.FC<DropdownListboxProps> = ({
  items,
  selectedKeys,
  onSelectionChange,
  placeholder = "Select an option",
  ariaLabel,
  className = "max-w-xs",
  variant = "bordered",
  size = "sm",
  isDisabled = false,
  selectionMode = "single",
}) => {
  const selectedItem = items.find((item) => selectedKeys.includes(item.key));

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant={variant}
          size={size}
          isDisabled={isDisabled}
          className={`${className} justify-between`}
          endContent={
            <svg
              className="w-4 h-4 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          }
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        selectionMode={selectionMode}
        selectedKeys={new Set(selectedKeys)}
        onSelectionChange={(keys) => onSelectionChange(keys as Set<string>)}
      >
        {items.map((item) => (
          <DropdownItem key={item.key}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

interface KementerianOption extends FormOption {}

interface EselonOption extends FormOption {
  kementerian: string;
}

interface SatkerOption extends FormOption {
  kementerian: string;
  eselon?: string;
}

// Custom hooks for better state management
const useFormState = () => {
  // Query Parameters State
  const [cutOff, setCutOff] = useState<string>("");
  const [kementerian, setKementerian] = useState<Set<string>>(new Set());
  const [eselonI, setEselonI] = useState<Set<string>>(new Set());
  const [satker, setSatker] = useState<Set<string>>(new Set());

  // Additional form fields
  const [cutOffKondisi, setCutOffKondisi] = useState<string>("");
  const [cutOffKata, setCutOffKata] = useState<string>("");
  const [cutOffTampilan, setCutOffTampilan] = useState<string>("");
  const [kementerianKondisi, setKementerianKondisi] = useState<string>("");
  const [kementerianKata, setKementerianKata] = useState<string>("");
  const [kementerianTampilan, setKementerianTampilan] =
    useState<string>("kode");
  const [eselonKondisi, setEselonKondisi] = useState<string>("");
  const [eselonKata, setEselonKata] = useState<string>("");
  const [eselonTampilan, setEselonTampilan] = useState<string>("kode");
  const [satkerKondisi, setSatkerKondisi] = useState<string>("");
  const [satkerKata, setSatkerKata] = useState<string>("");
  const [satkerTampilan, setSatkerTampilan] = useState<string>("kode");
  // Search state
  const [kementerianSearchQuery, setKementerianSearchQuery] =
    useState<string>("");
  const [eselonSearchQuery, setEselonSearchQuery] = useState<string>("");
  const [satkerSearchQuery, setSatkerSearchQuery] = useState<string>("");
  const [originalSearchCount, setOriginalSearchCount] = useState<number>(0);

  const resetAllState = useCallback(() => {
    setCutOff("");
    setKementerian(new Set());
    setEselonI(new Set());
    setSatker(new Set());
    setCutOffKondisi("");
    setCutOffKata("");
    setCutOffTampilan("");
    setKementerianKondisi("");
    setKementerianKata("");
    setKementerianTampilan("kode");
    setEselonKondisi("");
    setEselonKata("");
    setEselonTampilan("kode");
    setSatkerKondisi("");
    setSatkerKata("");
    setSatkerTampilan("kode");
    setKementerianSearchQuery("");
    setEselonSearchQuery("");
    setSatkerSearchQuery("");
    setOriginalSearchCount(0);
  }, []);

  return {
    // Query parameters
    cutOff,
    setCutOff,
    kementerian,
    setKementerian,
    eselonI,
    setEselonI,
    satker,
    setSatker,
    // Additional fields
    cutOffKondisi,
    setCutOffKondisi,
    cutOffKata,
    setCutOffKata,
    cutOffTampilan,
    setCutOffTampilan,
    kementerianKondisi,
    setKementerianKondisi,
    kementerianKata,
    setKementerianKata,
    kementerianTampilan,
    setKementerianTampilan,
    eselonKondisi,
    setEselonKondisi,
    eselonKata,
    setEselonKata,
    eselonTampilan,
    setEselonTampilan,
    satkerKondisi,
    setSatkerKondisi,
    satkerKata,
    setSatkerKata,
    satkerTampilan,
    setSatkerTampilan,
    // Search
    kementerianSearchQuery,
    setKementerianSearchQuery,
    eselonSearchQuery,
    setEselonSearchQuery,
    satkerSearchQuery,
    setSatkerSearchQuery,
    originalSearchCount,
    setOriginalSearchCount,
    // Actions
    resetAllState,
  };
};

// Custom hook for data loading
const useDataLoading = (
  formState: ReturnType<typeof useFormState>,
  showToast: any
) => {
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [eselonData, setEselonData] = useState<EselonData[]>([]);
  const [satkerData, setSatkerData] = useState<SatkerData[]>([]);

  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isLoadingSatker, setIsLoadingSatker] = useState(false);
  const [isLoadingEselon, setIsLoadingEselon] = useState(false);

  // Load departments data on component mount
  useEffect(() => {
    const loadDepartments = async () => {
      setIsLoadingDepartments(true);
      try {
        const departments = await ReferenceApiService.getDepartments();
        setDepartmentData(departments);
      } catch (error) {
        console.error("Failed to load departments:", error);
        showToast("Failed to load departments data", "error");
      } finally {
        setIsLoadingDepartments(false);
      }
    };

    loadDepartments();
  }, [showToast]);

  // Load eselon data when kementerian selection changes
  useEffect(() => {
    const loadEselon = async () => {
      if (formState.kementerian.size === 0) {
        setEselonData([]);
        return;
      }

      setIsLoadingEselon(true);
      try {
        const selectedDepartments = Array.from(formState.kementerian);
        const eselonList = await ReferenceApiService.getEselonByDepartments(
          selectedDepartments
        );
        setEselonData(eselonList);
      } catch (error) {
        console.error("Failed to load eselon:", error);
        showToast("Failed to load eselon data", "error");
      } finally {
        setIsLoadingEselon(false);
      }
    };

    loadEselon();
  }, [formState.kementerian, showToast]); // Load satker data independently or filtered by kementerian/eselon
  useEffect(() => {
    const loadSatker = async () => {
      setIsLoadingSatker(true);
      try {
        let satkerList: SatkerData[] = [];

        if (formState.kementerian.size > 0) {
          // If kementerian selected, filter by kementerian
          const selectedDepartments = Array.from(formState.kementerian);
          const selectedEselon =
            formState.eselonI.size > 0
              ? Array.from(formState.eselonI)
              : undefined;

          console.log(
            "Loading satker for selected kementerian:",
            selectedDepartments
          );
          satkerList = await ReferenceApiService.getSatkerByDepartments(
            selectedDepartments,
            selectedEselon
          );
        } else {
          // If no kementerian selected, load all satker
          const selectedEselon =
            formState.eselonI.size > 0
              ? Array.from(formState.eselonI)
              : undefined;

          console.log("Loading all satker data");
          satkerList = await ReferenceApiService.getAllSatker(selectedEselon);
        }

        console.log("Loaded satker count:", satkerList.length);
        setSatkerData(satkerList);
      } catch (error) {
        console.error("Failed to load satker:", error);
        showToast("Failed to load satker data", "error");
        setSatkerData([]); // Set empty array on error to prevent infinite loading
      } finally {
        setIsLoadingSatker(false);
      }
    };

    loadSatker();
  }, [formState.kementerian, formState.eselonI, showToast]);

  return {
    departmentData,
    eselonData,
    satkerData,
    isLoadingDepartments,
    isLoadingEselon,
    isLoadingSatker,
  };
};

// Custom hook for computed values
const useComputedValues = (
  formState: ReturnType<typeof useFormState>,
  departmentData: DepartmentData[],
  eselonData: EselonData[],
  satkerData: SatkerData[]
) => {
  // Memoized options to prevent recreation on each render
  const kementerianOptions = useMemo(() => {
    return departmentData
      .map((dept) => ({
        key: dept.kddept,
        label: `${dept.kddept} - ${dept.nmdept}`,
      }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, [departmentData]);
  const eselonOptions = useMemo(() => {
    return eselonData.map((eselon) => ({
      key: eselon.kdunit,
      label: `${eselon.kdunit} - ${eselon.nmunit}`,
      kementerian: eselon.kddept,
    }));
  }, [eselonData]);
  const satkerOptions = useMemo(() => {
    const optionsMap = new Map();

    satkerData.forEach((satker) => {
      const key = satker.kdsatker;
      const option = {
        key: key,
        label: `${satker.kdsatker} - ${satker.nmsatker}`,
        kementerian: satker.kddept,
        eselon: satker.kdunit,
      };

      // Only add if we haven't seen this key before, or if this one has more complete data
      if (
        !optionsMap.has(key) ||
        (option.eselon && !optionsMap.get(key).eselon)
      ) {
        optionsMap.set(key, option);
      }
    });

    return Array.from(optionsMap.values()).sort((a, b) =>
      a.key.localeCompare(b.key)
    );
  }, [satkerData]);
  // Check if all kementerian are selected
  const isAllKementerianSelected = useMemo(() => {
    return (
      formState.kementerian.size === kementerianOptions.length &&
      kementerianOptions.length > 0
    );
  }, [formState.kementerian.size, kementerianOptions.length]);

  // Check if multiple kementerian are selected
  const isMultipleKementerianSelected = useMemo(() => {
    return formState.kementerian.size > 1;
  }, [formState.kementerian.size]);

  // Filter eselon options based on selected kementerian
  const filteredEselonOptions = useMemo(() => {
    if (formState.kementerian.size === 0) {
      return [];
    }

    const selectedKementerianKeys = Array.from(formState.kementerian);
    const filtered = eselonOptions.filter((eselon) =>
      selectedKementerianKeys.includes(eselon.kementerian)
    );

    // If multiple kementerian are selected, show only unique codes
    if (isMultipleKementerianSelected) {
      const uniqueEselons = new Map();
      filtered.forEach((eselon) => {
        if (!uniqueEselons.has(eselon.key)) {
          uniqueEselons.set(eselon.key, {
            ...eselon,
            label: eselon.key,
          });
        }
      });
      return Array.from(uniqueEselons.values()).sort((a, b) =>
        a.key.localeCompare(b.key)
      );
    }

    return filtered;
  }, [eselonOptions, formState.kementerian, isMultipleKementerianSelected]); // Filter satker options based on selected kementerian and eselon (optional filters)
  const filteredSatkerOptions = useMemo(() => {
    let filtered = satkerOptions;

    // Filter by kementerian if any are selected
    if (formState.kementerian.size > 0) {
      const selectedKementerianKeys = Array.from(formState.kementerian);
      filtered = filtered.filter((satker) =>
        selectedKementerianKeys.includes(satker.kementerian)
      );
    }

    // Additional filtering by eselon if any eselon is selected
    if (formState.eselonI.size > 0) {
      const selectedEselonKeys = Array.from(formState.eselonI);
      filtered = filtered.filter(
        (satker) => satker.eselon && selectedEselonKeys.includes(satker.eselon)
      );
    }

    // If multiple kementerian are selected, show only unique codes
    if (isMultipleKementerianSelected) {
      const uniqueSatkers = new Map();
      filtered.forEach((satker) => {
        if (!uniqueSatkers.has(satker.key)) {
          uniqueSatkers.set(satker.key, {
            ...satker,
            // Keep the original label format (code - name)
          });
        }
      });
      return Array.from(uniqueSatkers.values()).sort((a, b) =>
        a.key.localeCompare(b.key)
      );
    }

    return filtered.sort((a, b) => a.label.localeCompare(b.label));
  }, [
    satkerOptions,
    formState.kementerian,
    formState.eselonI,
    isMultipleKementerianSelected,
  ]);
  return {
    kementerianOptions,
    eselonOptions,
    satkerOptions,
    isAllKementerianSelected,
    isMultipleKementerianSelected,
    filteredEselonOptions,
    filteredSatkerOptions,
  };
};

export const FormSummary = () => {
  const { switches } = useBelanja();
  const { showToast } = useToast(); // Helper function to format selected items display
  const formatSelectedItems = (
    selectedSet: Set<string>,
    options: FormOption[],
    maxDisplay: number = 3
  ) => {
    if (selectedSet.size === 0) {
      return "Not selected";
    }

    // Check if all items are selected
    if (selectedSet.size === options.length && options.length > 0) {
      return `Semua (${selectedSet.size} items)`;
    }

    const selectedKeys = Array.from(selectedSet);

    // For small selections, show all keys
    if (selectedKeys.length <= maxDisplay) {
      return selectedKeys.join(", ");
    }

    // For larger selections, show first few keys with count
    const displayKeys = selectedKeys.slice(0, maxDisplay).join(", ");
    return `${displayKeys} (+${selectedKeys.length - maxDisplay} more)`;
  };

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingSatker, setIsProcessingSatker] = useState(false);

  // Track previous switch states to avoid unnecessary resets
  const prevSwitchesRef = useRef(switches);

  // Form state using custom hook
  const formState = useFormState(); // Reset all form fields when all switches are reset
  useEffect(() => {
    const allSwitchesOff = Object.values(switches).every(
      (value) => value === false
    );
    if (allSwitchesOff) {
      formState.resetAllState();
    }
  }, [switches, formState.resetAllState]);
  // Reset specific form fields when related switches are turned off
  useEffect(() => {
    // Only reset if switch was turned off (was true, now false)
    if (!switches.cutOff && prevSwitchesRef.current.cutOff) {
      formState.setCutOff("");
      formState.setCutOffKondisi("");
      formState.setCutOffKata("");
      formState.setCutOffTampilan("");
    }
    prevSwitchesRef.current = {
      ...prevSwitchesRef.current,
      cutOff: switches.cutOff,
    };
  }, [
    switches.cutOff,
    formState.setCutOff,
    formState.setCutOffKondisi,
    formState.setCutOffKata,
    formState.setCutOffTampilan,
  ]);
  useEffect(() => {
    // Only reset if switch was turned off (was true, now false)
    if (!switches.kementerian && prevSwitchesRef.current.kementerian) {
      formState.setKementerian(new Set());
      formState.setKementerianKondisi("");
      formState.setKementerianKata("");
      formState.setKementerianTampilan("kode");
      formState.setKementerianSearchQuery("");
    }
    prevSwitchesRef.current = {
      ...prevSwitchesRef.current,
      kementerian: switches.kementerian,
    };
  }, [
    switches.kementerian,
    formState.setKementerian,
    formState.setKementerianKondisi,
    formState.setKementerianKata,
    formState.setKementerianTampilan,
    formState.setKementerianSearchQuery,
  ]);
  useEffect(() => {
    // Only reset if switch was turned off (was true, now false)
    if (!switches.eselonI && prevSwitchesRef.current.eselonI) {
      formState.setEselonI(new Set());
      formState.setEselonKondisi("");
      formState.setEselonKata("");
      formState.setEselonTampilan("kode");
      formState.setEselonSearchQuery("");
    }
    prevSwitchesRef.current = {
      ...prevSwitchesRef.current,
      eselonI: switches.eselonI,
    };
  }, [
    switches.eselonI,
    formState.setEselonI,
    formState.setEselonKondisi,
    formState.setEselonKata,
    formState.setEselonTampilan,
    formState.setEselonSearchQuery,
  ]);
  useEffect(() => {
    // Only reset if switch was turned off (was true, now false)
    if (!switches.satker && prevSwitchesRef.current.satker) {
      formState.setSatker(new Set());
      formState.setSatkerKondisi("");
      formState.setSatkerKata("");
      formState.setSatkerTampilan("kode");
      formState.setSatkerSearchQuery("");
    }
    prevSwitchesRef.current = {
      ...prevSwitchesRef.current,
      satker: switches.satker,
    };
  }, [
    switches.satker,
    formState.setSatker,
    formState.setSatkerKondisi,
    formState.setSatkerKata,
    formState.setSatkerTampilan,
    formState.setSatkerSearchQuery,
  ]);

  // Data loading using custom hook
  const dataLoading = useDataLoading(formState, showToast);

  // Computed values using custom hook
  const computed = useComputedValues(
    formState,
    dataLoading.departmentData,
    dataLoading.eselonData,
    dataLoading.satkerData
  );

  // Performance optimization: limit displayed satker options
  const displayedSatkerOptions = useMemo(() => {
    if (
      !computed.filteredSatkerOptions ||
      computed.filteredSatkerOptions.length === 0
    ) {
      return [];
    }

    return computed.filteredSatkerOptions.length <= MAX_SATKER_DISPLAY
      ? computed.filteredSatkerOptions
      : computed.filteredSatkerOptions.slice(0, MAX_SATKER_DISPLAY);
  }, [computed.filteredSatkerOptions]);
  const isSatkerLimited =
    computed.filteredSatkerOptions.length > MAX_SATKER_DISPLAY;
  // Filter satker options by search query
  const searchFilteredSatkerOptions = useMemo(() => {
    try {
      const query = formState.satkerSearchQuery.toLowerCase().trim();

      if (!query) {
        return computed.filteredSatkerOptions;
      }

      const searchResults = computed.filteredSatkerOptions
        .filter((option) => {
          if (!option?.label || !option?.key) return false;

          const labelLower = option.label.toLowerCase();
          const keyLower = option.key.toLowerCase();
          const queryLower = query.toLowerCase();

          // Priority matching: exact code match first
          if (keyLower === queryLower) {
            return true;
          }

          // Then code starts with search query
          if (keyLower.startsWith(queryLower)) {
            return true;
          }

          // Then label starts with search query
          if (labelLower.startsWith(queryLower)) {
            return true;
          }

          // Finally, check if the search query appears at the beginning of the label after the code separator
          // Format is "code - name", so search in the name part
          const parts = labelLower.split(" - ");
          if (parts.length > 1 && parts[1].startsWith(queryLower)) {
            return true;
          }

          // Last resort: contains search (but only if query is longer than 2 characters to avoid too many matches)
          if (queryLower.length > 2) {
            return (
              labelLower.includes(queryLower) || keyLower.includes(queryLower)
            );
          }

          return false;
        })
        .sort((a, b) => {
          // Sort results by relevance
          const queryLower = query.toLowerCase();
          const aKeyLower = a.key.toLowerCase();
          const bKeyLower = b.key.toLowerCase();
          const aLabelLower = a.label.toLowerCase();
          const bLabelLower = b.label.toLowerCase();

          // Exact code matches first
          if (aKeyLower === queryLower && bKeyLower !== queryLower) return -1;
          if (bKeyLower === queryLower && aKeyLower !== queryLower) return 1;

          // Code starts with query
          const aKeyStarts = aKeyLower.startsWith(queryLower);
          const bKeyStarts = bKeyLower.startsWith(queryLower);
          if (aKeyStarts && !bKeyStarts) return -1;
          if (bKeyStarts && !aKeyStarts) return 1;

          // Label starts with query
          const aLabelStarts = aLabelLower.startsWith(queryLower);
          const bLabelStarts = bLabelLower.startsWith(queryLower);
          if (aLabelStarts && !bLabelStarts) return -1;
          if (bLabelStarts && !aLabelStarts) return 1;

          // Otherwise sort alphabetically by key
          return a.key.localeCompare(b.key);
        });

      return searchResults.length > MAX_SEARCH_RESULTS
        ? searchResults.slice(0, MAX_SEARCH_RESULTS)
        : searchResults;
    } catch (error) {
      console.error("Error filtering satker options:", error);
      return computed.filteredSatkerOptions;
    }
  }, [computed.filteredSatkerOptions, formState.satkerSearchQuery]);

  // Limited display satker options for smooth rendering
  const limitedDisplaySatkerOptions = useMemo(() => {
    const query = formState.satkerSearchQuery.toLowerCase().trim();

    if (!query) {
      // If no search, limit to first 100 for performance
      return computed.filteredSatkerOptions.slice(0, 100);
    }
    // If searching, show search results (already limited by MAX_SEARCH_RESULTS)
    return searchFilteredSatkerOptions;
  }, [
    computed.filteredSatkerOptions,
    formState.satkerSearchQuery,
    searchFilteredSatkerOptions,
  ]);

  // Filter kementerian options by search query
  const searchFilteredKementerianOptions = useMemo(() => {
    try {
      const query = formState.kementerianSearchQuery.toLowerCase().trim();

      if (!query) {
        return computed.kementerianOptions;
      }

      const searchResults = computed.kementerianOptions.filter((option) => {
        if (!option?.label || !option?.key) return false;
        return (
          option.label.toLowerCase().includes(query) ||
          option.key.toLowerCase().includes(query)
        );
      });

      return searchResults.length > MAX_SEARCH_RESULTS
        ? searchResults.slice(0, MAX_SEARCH_RESULTS)
        : searchResults;
    } catch (error) {
      console.error("Error filtering kementerian options:", error);
      return computed.kementerianOptions;
    }
  }, [computed.kementerianOptions, formState.kementerianSearchQuery]);

  // Filter eselon options by search query
  const searchFilteredEselonOptions = useMemo(() => {
    try {
      const query = formState.eselonSearchQuery.toLowerCase().trim();

      if (!query) {
        return computed.filteredEselonOptions;
      }

      const searchResults = computed.filteredEselonOptions.filter((option) => {
        if (!option?.label || !option?.key) return false;
        return (
          option.label.toLowerCase().includes(query) ||
          option.key.toLowerCase().includes(query)
        );
      });

      return searchResults.length > MAX_SEARCH_RESULTS
        ? searchResults.slice(0, MAX_SEARCH_RESULTS)
        : searchResults;
    } catch (error) {
      console.error("Error filtering eselon options:", error);
      return computed.filteredEselonOptions;
    }
  }, [computed.filteredEselonOptions, formState.eselonSearchQuery]);
  // Update original search count when search results change
  useEffect(() => {
    if (formState.satkerSearchQuery.trim()) {
      const query = formState.satkerSearchQuery.toLowerCase().trim();
      const searchResults = computed.filteredSatkerOptions.filter((option) => {
        if (!option?.label || !option?.key) return false;

        const labelLower = option.label.toLowerCase();
        const keyLower = option.key.toLowerCase();
        const queryLower = query.toLowerCase();

        // Priority matching: exact code match first
        if (keyLower === queryLower) {
          return true;
        }

        // Then code starts with search query
        if (keyLower.startsWith(queryLower)) {
          return true;
        }

        // Then label starts with search query
        if (labelLower.startsWith(queryLower)) {
          return true;
        }

        // Finally, check if the search query appears at the beginning of the label after the code separator
        // Format is "code - name", so search in the name part
        const parts = labelLower.split(" - ");
        if (parts.length > 1 && parts[1].startsWith(queryLower)) {
          return true;
        }

        // Last resort: contains search (but only if query is longer than 2 characters to avoid too many matches)
        if (queryLower.length > 2) {
          return (
            labelLower.includes(queryLower) || keyLower.includes(queryLower)
          );
        }

        return false;
      });
      formState.setOriginalSearchCount(searchResults.length);
    } else {
      formState.setOriginalSearchCount(0);
    }
  }, [
    formState.satkerSearchQuery,
    computed.filteredSatkerOptions,
    formState.setOriginalSearchCount,
  ]); // Clear eselon when kementerian changes, but preserve satker selection
  useEffect(() => {
    if (formState.kementerian.size === 0) {
      formState.setEselonI(new Set());
      formState.setEselonSearchQuery("");
      // Don't clear satker selection when no kementerian selected - allow independent selection
    } else {
      // Remove eselon that don't belong to selected kementerian
      const selectedKementerianKeys = Array.from(formState.kementerian);
      const validEselonKeys = computed.eselonOptions
        .filter((eselon) =>
          selectedKementerianKeys.includes(eselon.kementerian)
        )
        .map((eselon) => eselon.key);

      const currentEselonKeys = Array.from(formState.eselonI);
      const validCurrentEselon = currentEselonKeys.filter((key) =>
        validEselonKeys.includes(key)
      );

      if (validCurrentEselon.length !== currentEselonKeys.length) {
        formState.setEselonI(new Set(validCurrentEselon));
      }

      // Only clear satker search when filtering changes
      if (formState.satkerSearchQuery) {
        formState.setSatkerSearchQuery("");
      }
    }
  }, [
    formState.kementerian,
    computed.eselonOptions,
    formState.setEselonI,
    formState.setEselonSearchQuery,
    formState.setSatkerSearchQuery,
    formState.satkerSearchQuery,
  ]);

  // Clear satker selection when eselon changes
  useEffect(() => {
    if (formState.eselonI.size === 0) {
      return;
    }

    // Remove satker that don't belong to selected eselon
    const selectedEselonKeys = Array.from(formState.eselonI);
    const validSatkerKeys = computed.satkerOptions
      .filter(
        (satker) => satker.eselon && selectedEselonKeys.includes(satker.eselon)
      )
      .map((satker) => satker.key);

    const currentSatkerKeys = Array.from(formState.satker);
    const validCurrentSatker = currentSatkerKeys.filter((key) =>
      validSatkerKeys.includes(key)
    );

    if (validCurrentSatker.length !== currentSatkerKeys.length) {
      formState.setSatker(new Set(validCurrentSatker));
    }
  }, [formState.eselonI, computed.satkerOptions, formState.setSatker]); // Memoized handlers for better performance
  const handleKementerianSelection = useCallback(
    (keys: Set<string>) => {
      try {
        const newKementerianKeys = Array.from(keys);
        const currentKementerianKeys = Array.from(formState.kementerian);

        // Check if satker is currently selected and if kementerian selection has changed
        if (formState.satker.size > 0 && newKementerianKeys.length > 0) {
          // Get the kementerian codes of currently selected satker
          const selectedSatkerKeys = Array.from(formState.satker);
          const satkerKementerianCodes = new Set(
            selectedSatkerKeys
              .map((satkerKey) => {
                const satkerOption = computed.satkerOptions.find(
                  (s) => s.key === satkerKey
                );
                return satkerOption?.kementerian;
              })
              .filter(Boolean)
          );

          // Only reset if there's a complete conflict:
          // ALL of the satker's kementerian are NOT included in the new kementerian selection
          const hasCompleteConflict =
            satkerKementerianCodes.size > 0 &&
            Array.from(satkerKementerianCodes).every(
              (satkerKem) =>
                satkerKem && !newKementerianKeys.includes(satkerKem)
            );

          if (hasCompleteConflict) {
            // Reset satker selection only if there's a complete mismatch
            formState.setSatker(new Set());
            formState.setSatkerSearchQuery("");
            console.log(
              "Satker selection reset: none of the selected kementerian match the satker's kementerian"
            );
          } else {
            // Partial filtering: remove only satker that don't belong to any of the selected kementerian
            const validSatkerKeys = selectedSatkerKeys.filter((satkerKey) => {
              const satkerOption = computed.satkerOptions.find(
                (s) => s.key === satkerKey
              );
              return (
                satkerOption?.kementerian &&
                newKementerianKeys.includes(satkerOption.kementerian)
              );
            });

            if (validSatkerKeys.length !== selectedSatkerKeys.length) {
              formState.setSatker(new Set(validSatkerKeys));
              console.log(
                `Filtered satker: kept ${validSatkerKeys.length} out of ${selectedSatkerKeys.length} satker that match selected kementerian`
              );
            }
          }
        }

        formState.setKementerian(keys);
        formState.setKementerianSearchQuery("");
      } catch (error) {
        console.error("Error handling kementerian selection:", error);
      }
    },
    [
      formState.kementerian,
      formState.satker,
      formState.setKementerian,
      formState.setSatker,
      formState.setKementerianSearchQuery,
      formState.setSatkerSearchQuery,
      computed.satkerOptions,
    ]
  );

  const resetAllKementerian = useCallback(() => {
    // Reset satker selection when clearing all kementerian if satker doesn't belong to any remaining kementerian
    if (formState.satker.size > 0) {
      formState.setSatker(new Set());
      formState.setSatkerSearchQuery("");
    }
    formState.setKementerian(new Set());
  }, [
    formState.setKementerian,
    formState.setSatker,
    formState.setSatkerSearchQuery,
    formState.satker.size,
  ]);

  const selectAllKementerian = useCallback(() => {
    const allKeys = computed.kementerianOptions.map((option) => option.key);
    formState.setKementerian(new Set(allKeys));
  }, [computed.kementerianOptions, formState.setKementerian]);

  const selectAllFilteredSatker = useCallback(() => {
    try {
      const allKeys = searchFilteredSatkerOptions
        .filter((item) => item && item.key && item.key !== "select_all")
        .map((option) => option.key);
      formState.setSatker(new Set(allKeys));
    } catch (error) {
      console.error("Error selecting all satker:", error);
    }
  }, [searchFilteredSatkerOptions, formState.setSatker]);

  const clearAllSatker = useCallback(() => {
    try {
      formState.setSatker(new Set());
      formState.setSatkerSearchQuery("");
      formState.setOriginalSearchCount(0);
    } catch (error) {
      console.error("Error clearing satker:", error);
    }
  }, [
    formState.setSatker,
    formState.setSatkerSearchQuery,
    formState.setOriginalSearchCount,
  ]);
  const removeKementerian = useCallback(
    (keyToRemove: string) => {
      const newSet = new Set(formState.kementerian);
      newSet.delete(keyToRemove);

      // Check if any selected satker belongs to the removed kementerian
      if (formState.satker.size > 0) {
        const selectedSatkerKeys = Array.from(formState.satker);
        const validSatkerKeys = selectedSatkerKeys.filter((satkerKey) => {
          const satkerOption = computed.satkerOptions.find(
            (s) => s.key === satkerKey
          );
          return satkerOption?.kementerian !== keyToRemove;
        });

        // If some satker were removed, update the satker selection
        if (validSatkerKeys.length !== selectedSatkerKeys.length) {
          formState.setSatker(new Set(validSatkerKeys));
          if (validSatkerKeys.length === 0) {
            formState.setSatkerSearchQuery("");
          }
        }
      }

      formState.setKementerian(newSet);
    },
    [
      formState.kementerian,
      formState.setKementerian,
      formState.satker,
      formState.setSatker,
      formState.setSatkerSearchQuery,
      computed.satkerOptions,
    ]
  );

  const removeEselonSelection = useCallback(
    (keyToRemove: string) => {
      const newSet = new Set(formState.eselonI);
      newSet.delete(keyToRemove);
      formState.setEselonI(newSet);
    },
    [formState.eselonI, formState.setEselonI]
  );

  const removeSatker = useCallback(
    (keyToRemove: string) => {
      const newSet = new Set(formState.satker);
      newSet.delete(keyToRemove);
      formState.setSatker(newSet);
    },
    [formState.satker, formState.setSatker]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      const queryData = {
        cutOff: formState.cutOff,
        kementerian: formState.kementerian,
        satker: formState.satker,
      };

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        console.log("Query submitted:", queryData);
      }, 2000);
    },
    [formState.cutOff, formState.kementerian, formState.satker]
  );

  const handleExport = useCallback(() => {
    console.log("Exporting data...");
  }, []);

  const handleGetSQL = useCallback(async () => {
    try {
      // Generate SQL query based on current form state
      const sqlQuery = generateSQLQuery();

      // Copy to clipboard
      await navigator.clipboard.writeText(sqlQuery);

      // Show success toast
      showToast("SQL query copied to clipboard!", "success");
    } catch (error) {
      console.error("Failed to copy SQL query:", error);
      showToast("Failed to copy SQL query", "error");
    }
  }, [formState, showToast]);
  const generateSQLQuery = useCallback(() => {
    // Build dynamic SELECT columns based on tampilan settings
    const selectColumns: string[] = [];
    const whereConditions: string[] = ["1=1"];

    // Handle Kementerian columns based on tampilan setting
    if (
      formState.kementerianTampilan &&
      formState.kementerianTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.kementerianTampilan) {
        case "kode":
          selectColumns.push("kddept");
          break;
        case "uraian":
          selectColumns.push("nmdept");
          break;
        case "kode_uraian":
          selectColumns.push("kddept", "nmdept");
          break;
      }

      // Add WHERE condition only if specific kementerian are selected
      if (formState.kementerian.size > 0) {
        const kementerianList = Array.from(formState.kementerian);
        const kementerianFilter = kementerianList
          .map((k: string) => `'${k}'`)
          .join(", ");
        whereConditions.push(`kddept IN (${kementerianFilter})`);
      }
    }

    // Handle Eselon columns based on tampilan setting
    if (
      formState.eselonTampilan &&
      formState.eselonTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.eselonTampilan) {
        case "kode":
          selectColumns.push("kdunit");
          break;
        case "uraian":
          selectColumns.push("nmunit");
          break;
        case "kode_uraian":
          selectColumns.push("kdunit", "nmunit");
          break;
      }

      // Add WHERE condition only if specific eselon are selected
      if (formState.eselonI.size > 0) {
        const eselonList = Array.from(formState.eselonI);
        const eselonFilter = eselonList.map((e: string) => `'${e}'`).join(", ");
        whereConditions.push(`kdunit IN (${eselonFilter})`);
      }
    }

    // Handle Satker columns based on tampilan setting
    if (
      formState.satkerTampilan &&
      formState.satkerTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.satkerTampilan) {
        case "kode":
          selectColumns.push("kdsatker");
          break;
        case "uraian":
          selectColumns.push("nmsatker");
          break;
        case "kode_uraian":
          selectColumns.push("kdsatker", "nmsatker");
          break;
      }

      // Add WHERE condition only if specific satker are selected
      if (formState.satker.size > 0) {
        const satkerList = Array.from(formState.satker);
        const satkerFilter = satkerList.map((s: string) => `'${s}'`).join(", ");
        whereConditions.push(`kdsatker IN (${satkerFilter})`);
      }
    }

    // Add other filters
    if (formState.cutOff) {
      whereConditions.push(`cut_off = '${formState.cutOff}'`);
    } // If no specific columns are selected, use SELECT *
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    }

    // Remove duplicates from selectColumns
    const uniqueColumns = Array.from(new Set(selectColumns));

    // Build the final query
    const selectClause = uniqueColumns.join(", ");
    const whereClause = whereConditions.join(" AND ");

    const query = `SELECT ${selectClause} FROM belanja WHERE ${whereClause};`;
    return query;
  }, [formState, computed]);

  return (
    <div className="space-y-4 mb-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/30 shadow-sm">
        <CardHeader className="py-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md">
              <Filter className="text-white" size={18} />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Query Parameters & Actions
            </h3>
          </div>
        </CardHeader>
      </Card>

      {/* Query Parameters Card */}
      <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-100 dark:border-green-800/20 shadow-sm">
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Query Parameters Section */}
            <div className="space-y-4">
              <h4 className="text-md font-medium bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent border-b border-gray-200 dark:border-gray-700 pb-2">
                Query Parameters
              </h4>{" "}
              {/* Cut Off Section */}
              {switches.cutOff && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl border border-blue-200 dark:border-blue-800 transition-all duration-200">
                  <div className="flex items-center gap-2">
                    <Calendar
                      className="text-blue-600 dark:text-blue-400"
                      size={16}
                    />
                    <span className="font-medium text-blue-700 dark:text-blue-300 text-sm whitespace-nowrap">
                      Cut Off
                    </span>
                  </div>
                  <div>
                    <DropdownListbox
                      items={CUT_OFF_OPTIONS}
                      selectedKeys={formState.cutOff ? [formState.cutOff] : []}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        formState.setCutOff(selectedKey || "");
                      }}
                      placeholder="Pilih Cut Off"
                      ariaLabel="Pilih Cut Off"
                      variant="bordered"
                      size="sm"
                      className="min-w-[140px]"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Masukkan Kondisi"
                      value={formState.cutOffKondisi}
                      onChange={(e) =>
                        formState.setCutOffKondisi(e.target.value)
                      }
                      variant="bordered"
                      size="sm"
                      aria-label="Kondisi Cut Off"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Mengandung Kata"
                      value={formState.cutOffKata}
                      onChange={(e) => formState.setCutOffKata(e.target.value)}
                      variant="bordered"
                      size="sm"
                      aria-label="Kata yang mengandung Cut Off"
                    />
                  </div>{" "}
                  <div>
                    <Select
                      items={TAMPILAN_OPTIONS}
                      selectedKeys={
                        formState.cutOffTampilan
                          ? [formState.cutOffTampilan]
                          : []
                      }
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        formState.setCutOffTampilan(selectedKey || "");
                      }}
                      placeholder="Pilih Tampilan"
                      aria-label="Pilih Tampilan Cut Off"
                      variant="bordered"
                      size="sm"
                      className="min-w-[140px]"
                    >
                      {(item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                </div>
              )}{" "}
              {/* Kementerian Section */}
              {switches.kementerian && (
                <KementerianForm
                  kementerian={formState.kementerian}
                  kementerianKondisi={formState.kementerianKondisi}
                  kementerianKata={formState.kementerianKata}
                  kementerianTampilan={formState.kementerianTampilan}
                  kementerianSearchQuery={formState.kementerianSearchQuery}
                  kementerianOptions={computed.kementerianOptions}
                  searchFilteredKementerianOptions={
                    searchFilteredKementerianOptions
                  }
                  setKementerian={formState.setKementerian}
                  setKementerianKondisi={formState.setKementerianKondisi}
                  setKementerianKata={formState.setKementerianKata}
                  setKementerianTampilan={formState.setKementerianTampilan}
                  setKementerianSearchQuery={
                    formState.setKementerianSearchQuery
                  }
                  handleKementerianSelection={handleKementerianSelection}
                  resetAllKementerian={resetAllKementerian}
                  removeKementerian={removeKementerian}
                  isLoadingDepartments={dataLoading.isLoadingDepartments}
                />
              )}{" "}
              {/* Eselon I Section */}
              {switches.eselonI && (
                <EselonIForm
                  eselonI={formState.eselonI}
                  eselonKondisi={formState.eselonKondisi}
                  eselonKata={formState.eselonKata}
                  eselonTampilan={formState.eselonTampilan}
                  eselonSearchQuery={formState.eselonSearchQuery}
                  filteredEselonOptions={computed.filteredEselonOptions}
                  searchFilteredEselonOptions={searchFilteredEselonOptions}
                  isAllKementerianSelected={computed.isAllKementerianSelected}
                  kementerianSize={formState.kementerian.size}
                  setEselonI={formState.setEselonI}
                  setEselonKondisi={formState.setEselonKondisi}
                  setEselonKata={formState.setEselonKata}
                  setEselonTampilan={formState.setEselonTampilan}
                  setEselonSearchQuery={formState.setEselonSearchQuery}
                  removeEselonSelection={removeEselonSelection}
                  isLoadingEselon={dataLoading.isLoadingEselon}
                />
              )}{" "}
              {/* Satker Section */}
              {switches.satker && (
                <SatkerForm
                  satker={formState.satker}
                  satkerKondisi={formState.satkerKondisi}
                  satkerKata={formState.satkerKata}
                  satkerTampilan={formState.satkerTampilan}
                  satkerSearchQuery={formState.satkerSearchQuery}
                  filteredSatkerOptions={computed.filteredSatkerOptions}
                  limitedDisplaySatkerOptions={limitedDisplaySatkerOptions}
                  kementerianSize={formState.kementerian.size}
                  setSatker={formState.setSatker}
                  setSatkerKondisi={formState.setSatkerKondisi}
                  setSatkerKata={formState.setSatkerKata}
                  setSatkerTampilan={formState.setSatkerTampilan}
                  setSatkerSearchQuery={formState.setSatkerSearchQuery}
                  removeSatker={removeSatker}
                  clearAllSatker={clearAllSatker}
                  isLoadingSatker={dataLoading.isLoadingSatker}
                  isProcessingSatker={isProcessingSatker}
                />
              )}
            </div>{" "}
            {/* Action Buttons */}{" "}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 justify-center">
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                startContent={!isLoading && <Search size={18} />}
                className="min-w-[180px]"
              >
                {isLoading ? "Searching..." : "Search Data"}
              </Button>
              <Button
                type="button"
                variant="bordered"
                startContent={<RefreshCw size={18} />}
                className="min-w-[180px]"
                onClick={() => {
                  formState.resetAllState();
                }}
              >
                Reset Form
              </Button>
              <Button
                type="button"
                color="success"
                variant="flat"
                startContent={<Download size={18} />}
                className="min-w-[180px]"
                onClick={handleExport}
              >
                Export Data
              </Button>
              <Button
                type="button"
                color="warning"
                variant="flat"
                startContent={<Copy size={18} />}
                className="min-w-[180px]"
                onClick={handleGetSQL}
              >
                Get SQL{" "}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default FormSummary;

// Export components for modular usage
export { SearchableDropdownListbox };
