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
  AlertTriangle,
} from "lucide-react";
import { useBelanja } from "./context";
import {
  ReferenceApiService,
  DepartmentData,
  SatkerData,
  EselonData,
} from "../../../utils/referenceApi";
import { useToast } from "../../context/ToastContext";
import { KementerianForm, EselonIForm, SatkerForm, CutOffForm } from "./forms";
import {
  KementerianQueryGenerator,
  EselonIQueryGenerator,
  CombinedQueryGenerator,
  CutOffQueryGenerator,
} from "./query-generate";
import DataTableModal from "./data-table-modal";
import FormSummaryButton from "./form-summary-button";

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
const useFormState = (initialSwitchState?: { cutOff: boolean }) => {
  // Helper function to get current month name
  const getCurrentMonthName = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based month
    const monthNames = [
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember",
    ];
    return monthNames[currentMonth];
  };

  // Initialize cutOff based on switch state
  const getInitialCutOffValue = () => {
    if (initialSwitchState?.cutOff === false) {
      // Switch is OFF: start with current month
      return getCurrentMonthName();
    }
    // Switch is ON or undefined: start empty (will be set to "januari" by useEffect)
    return "";
  };

  // Query Parameters State
  const [cutOff, setCutOff] = useState<string>(getInitialCutOffValue());
  const [kementerian, setKementerian] = useState<Set<string>>(new Set());
  const [eselonI, setEselonI] = useState<Set<string>>(new Set());
  const [satker, setSatker] = useState<Set<string>>(new Set());
  // Additional form fields
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
  const {
    switches,
    selectedJenisLaporan,
    selectedTahun,
    selectedPembulatan,
    activeFiltersCount,
  } = useBelanja();
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSqlQuery, setCurrentSqlQuery] = useState("");

  // Track previous switch states to avoid unnecessary resets
  const prevSwitchesRef = useRef(switches);
  // Form state using custom hook with switch state context
  const formState = useFormState({ cutOff: switches.cutOff }); // Reset all form fields when all switches are reset
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
      // Don't reset cutOff value when switching off - let CutOffForm handle the auto-selection
      // This prevents the race condition between reset and auto-selection logic
      // formState.setCutOff(""); // Removed this line
    }
    prevSwitchesRef.current = {
      ...prevSwitchesRef.current,
      cutOff: switches.cutOff,
    };
  }, [switches.cutOff]);
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
  const resetAllCutOff = useCallback(() => {
    if (switches.cutOff) {
      // When switch is ON: Reset to "januari" (required default)
      formState.setCutOff("januari");
    } else {
      // When switch is OFF: Reset to current month (auto-selection)
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-based month
      const monthNames = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
      ];
      formState.setCutOff(monthNames[currentMonth]);
    }
  }, [formState.setCutOff, switches.cutOff]);

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

      try {
        // Generate SQL query based on current form state - we'll call it after it's defined
        // Set a flag to open modal after SQL generation
        setIsLoading(false);

        // For now, just set the modal to open - the actual SQL will be generated by the modal
        setIsModalOpen(true);

        showToast("Opening query results...", "success");
      } catch (error) {
        console.error("Error opening modal:", error);
        showToast("Failed to open query results", "error");
        setIsLoading(false);
      }
    },
    [showToast]
  );

  const generateSQLQuery = useCallback(() => {
    // Check if "Pagu Realisasi" is selected from Jenis Laporan
    if (selectedJenisLaporan === "Pagu Realisasi") {
      // Special query for Pagu Realisasi report

      // Check if kementerian tampilan is "jangan_tampilkan" - return empty query
      if (
        switches.kementerian &&
        formState.kementerianTampilan === "jangan_tampilkan"
      ) {
        return "SELECT 'No data to display' AS message";
      }

      // Build SELECT columns based on kementerian tampilan setting
      let selectColumns = [];
      let groupByColumns = [];
      let needsShowAllDepartments = false;

      // Default case: if kementerian switch is not enabled, show kddept
      if (!switches.kementerian) {
        selectColumns.push("a.kddept");
        groupByColumns.push("a.kddept");
      } else {
        // When kementerian switch is enabled, we want to show all departments
        needsShowAllDepartments = true;

        // Handle tampilan options when kementerian switch is enabled
        switch (formState.kementerianTampilan) {
          case "kode":
            selectColumns.push("b.kddept");
            groupByColumns.push("b.kddept");
            break;
          case "uraian":
            selectColumns.push("b.nmdept");
            groupByColumns.push("b.nmdept");
            break;
          case "kode_uraian":
            selectColumns.push("b.kddept", "b.nmdept");
            groupByColumns.push("b.kddept", "b.nmdept");
            break;
          default:
            // Fallback to kode if tampilan not set
            selectColumns.push("b.kddept");
            groupByColumns.push("b.kddept");
        }
      } // Add the financial columns
      selectColumns.push(
        "ROUND(SUM(a.pagu)/1,0) AS PAGU_DIPA",
        "ROUND(SUM(a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12)/1,0) AS REALISASI",
        "ROUND(SUM(a.blokir)/1,0) AS BLOKIR"
      );

      // Build the query based on whether we need to show all departments
      let query = "";
      if (needsShowAllDepartments) {
        // Use data table as main table and LEFT JOIN with reference table
        query = `SELECT ${selectColumns.join(", ")} 
                 FROM monev2025.pagu_real_detail_harian_2025 a
                 LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept`; // Add WHERE conditions for specific kementerian selection
        let whereConditions: string[] = [];
        if (formState.kementerian.size > 0) {
          const kementerianList = Array.from(formState.kementerian);
          const kementerianFilter = kementerianList
            .map((k: string) => `'${k}'`)
            .join(", ");
          whereConditions.push(`a.kddept IN (${kementerianFilter})`);
        }

        // Note: cutOff filter temporarily removed for debugging

        // Build final query
        if (whereConditions.length > 0) {
          query += ` WHERE ${whereConditions.join(" AND ")}`;
        }
      } else {
        // Simple query when kementerian switch is not enabled
        query = `SELECT ${selectColumns.join(", ")} 
                 FROM monev2025.pagu_real_detail_harian_2025 a`; // Add WHERE conditions
        let whereConditions: string[] = [];

        // Note: cutOff filter temporarily removed for debugging

        // Build final query
        if (whereConditions.length > 0) {
          query += ` WHERE ${whereConditions.join(" AND ")}`;
        }
      }

      query += ` GROUP BY ${groupByColumns.join(", ")}`;

      return query;
    }

    // Original query logic for other report types
    // Build dynamic SELECT columns based on tampilan settings
    const selectColumns: string[] = [];
    const whereConditions: string[] = ["1=1"];

    // Handle Kementerian columns based on switch AND tampilan setting
    if (
      switches.kementerian &&
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
    } // Handle Eselon columns based on switch AND tampilan setting
    if (
      switches.eselonI &&
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
      } // Add WHERE condition for eselon based on selection
      if (formState.eselonI.size > 0) {
        // If specific eselon are selected, use them directly
        // The JOIN with t_unit_2025 will ensure proper kementerian relationship
        const eselonList = Array.from(formState.eselonI);
        const eselonFilter = eselonList.map((e: string) => `'${e}'`).join(", ");
        whereConditions.push(`kdunit IN (${eselonFilter})`);
      }
      // Note: If no specific eselon selected but kementerian is selected,
      // the JOIN with t_unit_2025 and kddept filter will automatically limit eselon
    } // Handle Satker columns based on switch AND tampilan setting
    if (
      switches.satker &&
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
      } // Add WHERE condition for satker based on selection
      if (formState.satker.size > 0) {
        // If specific satker are selected, use them directly
        // The JOIN with t_unit_2025 will ensure proper hierarchical relationships
        const satkerList = Array.from(formState.satker);
        const satkerFilter = satkerList.map((s: string) => `'${s}'`).join(", ");
        whereConditions.push(`kdsatker IN (${satkerFilter})`);
      }
      // Note: If no specific satker selected, the JOIN with t_unit_2025 and
      // kddept/kdunit filters will automatically limit satker appropriately
    } // Add cutOff filter - always applied regardless of switch state
    // When switch is off: filters to current month automatically
    // When switch is on: filters based on user selection
    if (formState.cutOff) {
      whereConditions.push(`cut_off = '${formState.cutOff}'`);
    }

    // If no specific columns are selected, use SELECT *
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    }

    // Remove duplicates from selectColumns
    const uniqueColumns = Array.from(new Set(selectColumns)); // Build the final query
    const selectClause = uniqueColumns.join(", ");
    const whereClause = whereConditions.join(" AND ");

    // Determine if we need to join with reference tables based on enabled switches and selections
    let query: string;
    const needsKementerianFilter =
      switches.kementerian && formState.kementerian.size > 0;
    const needsEselonFilter = switches.eselonI && formState.eselonI.size > 0;
    const needsSatkerFilter = switches.satker && formState.satker.size > 0;
    // Check if any hierarchical columns are in the SELECT clause
    const kementerianInSelectColumns =
      uniqueColumns.includes("kddept") || uniqueColumns.includes("nmdept");
    const eselonInSelectColumns =
      uniqueColumns.includes("kdunit") || uniqueColumns.includes("nmunit");
    const satkerInSelectColumns =
      uniqueColumns.includes("kdsatker") || uniqueColumns.includes("nmsatker"); // Only join if we actually need data from reference table (names) or filtering
    const needsJoin =
      needsKementerianFilter ||
      needsEselonFilter ||
      needsSatkerFilter ||
      uniqueColumns.includes("nmdept") ||
      uniqueColumns.includes("nmunit") ||
      uniqueColumns.includes("nmsatker") ||
      (switches.kementerian &&
        formState.kementerian.size === 0 && // Include when kementerian is enabled but no specific selection (filter only)
        formState.kementerianTampilan !== "jangan_tampilkan");

    if (needsJoin) {
      // Use the correct reference table for all hierarchical relationships
      const joinTable = "monev2025.pagu_real_detail_harian_2025";
      const tableAlias = "p";
      let joinCondition: string;
      // Determine the best join condition based on what switches are enabled (not what's needed)
      if (switches.satker) {
        // Join on kdsatker if satker switch is enabled
        joinCondition = "b.kdsatker = p.kdsatker";
      } else if (switches.eselonI) {
        // Join on kdunit if eselon switch is enabled
        joinCondition = "b.kdunit = p.kdunit";
      } else if (switches.kementerian) {
        // For kementerian only, join on kddept without including kdunit
        // This ensures that when "kode" tampilan is selected, only kddept is used
        joinCondition = "b.kddept = p.kddept";
      } else {
        // Fallback
        joinCondition = "b.kdsatker = p.kdsatker";
      }
      const selectColumns_prefixed = uniqueColumns
        .map((col) => {
          if (col === "*") return `a.*`;

          // For kementerian mode with "kode" tampilan, make sure we only use kddept
          if (
            switches.kementerian &&
            formState.kementerianTampilan === "kode" &&
            !(switches.eselonI || switches.satker)
          ) {
            if (col === "kddept") return `a.${col}`;
            if (col === "kdunit" || col === "nmunit" || col === "nmdept")
              return null;
          } else {
            // Special handling for department code and name based on tampilan
            if (col === "kddept") {
              // For LEFT JOIN scenario (kementerian switch enabled), use reference table
              if (
                switches.kementerian &&
                (formState.kementerianTampilan === "kode" ||
                  formState.kementerianTampilan === "kode_uraian")
              ) {
                return `b.${col}`;
              }
              // For Uraian only, don't include kddept
              if (
                switches.kementerian &&
                formState.kementerianTampilan === "uraian"
              ) {
                return null;
              }
              return `a.${col}`;
            }

            if (col === "nmdept") {
              // For Uraian or Kode Uraian, show nmdept from reference table
              if (
                switches.kementerian &&
                (formState.kementerianTampilan === "kode_uraian" ||
                  formState.kementerianTampilan === "uraian")
              ) {
                return `b.nmdept`;
              }
              // For Kode only, don't include nmdept
              if (
                switches.kementerian &&
                formState.kementerianTampilan === "kode"
              ) {
                return null;
              }
              return `a.${col}`;
            }

            // Other hierarchical columns
            if (col === "kdunit" || col === "nmunit") return `a.${col}`;
            if (col === "kdsatker" || col === "nmsatker") return `a.${col}`;
          }

          // All other columns use the 'a' table alias
          return `a.${col}`;
        })
        .filter(Boolean) // Remove null entries
        .join(", "); // Only include GROUP BY if we have specific columns (not "*")
      // Use GROUP BY clause that matches the selected columns for each tampilan option
      let groupByClause = "";
      if (uniqueColumns.includes("*")) {
        groupByClause = "";
      } else if (
        switches.kementerian &&
        !switches.eselonI &&
        !switches.satker &&
        formState.kementerian.size === 0 // Only use GROUP BY when not selecting specific kementerian (filter only)
      ) {
        // Different GROUP BY clauses based on tampilan when using filter only (not list selection)
        switch (formState.kementerianTampilan) {
          case "kode":
            groupByClause = `GROUP BY a.kddept`;
            break;
          case "uraian":
            groupByClause = `GROUP BY b.nmdept`;
            break;
          case "kode_uraian":
            groupByClause = `GROUP BY a.kddept, b.nmdept`;
            break;
          default:
            groupByClause = `GROUP BY ${selectColumns_prefixed}`;
        }
      } else if (
        switches.kementerian &&
        !switches.eselonI &&
        !switches.satker
      ) {
        // GROUP BY clauses for LEFT JOIN scenario (when kementerian switch is enabled)
        // This covers both cases: specific selection and no selection (show all)
        switch (formState.kementerianTampilan) {
          case "kode":
            groupByClause = `GROUP BY b.kddept`;
            break;
          case "uraian":
            groupByClause = `GROUP BY b.nmdept`;
            break;
          case "kode_uraian":
            groupByClause = `GROUP BY b.kddept, b.nmdept`;
            break;
          default:
            groupByClause = `GROUP BY ${selectColumns_prefixed}`;
        }
      } else {
        // Default case for other combinations
        groupByClause = `GROUP BY ${selectColumns_prefixed}`;
      } // Determine if we need to join with reference tables based on enabled switches and selections
      let joinClauses = ""; // Add LEFT JOIN for Kementerian when "Kode Uraian" or "Uraian" tampilan is selected
      if (
        switches.kementerian &&
        (formState.kementerianTampilan === "kode_uraian" ||
          formState.kementerianTampilan === "uraian")
      ) {
        joinClauses += `\n               LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept`;
      } // Determine if we need to show all departments (using LEFT JOIN from reference table)
      // Show all departments when: kementerian switch is enabled (regardless of selection)
      const showAllDepartments = switches.kementerian;

      if (showAllDepartments) {
        // Use reference table as main table and LEFT JOIN with data table to show all departments
        let departmentFilter = "";

        if (formState.kementerian.size > 0) {
          // If specific departments are selected, filter by them
          const departmentList = Array.from(formState.kementerian);
          departmentFilter = `WHERE b.kddept IN (${departmentList
            .map((d) => `'${d}'`)
            .join(", ")})`;
        } else {
          // If no specific departments selected, show all departments (no WHERE filter)
          departmentFilter = "";
        }

        query = `SELECT ${selectColumns_prefixed} 
                 FROM dbref.t_dept_2023 b
                 LEFT JOIN ${joinTable} a ON b.kddept = a.kddept
                 ${departmentFilter}
                 ${groupByClause};`;
      } else {
        // Use monev2025.pagu_real_detail_harian_2025 as the main table with LEFT JOINs as needed
        // Using table alias 'a' for consistency with the requested SQL format

        query = `SELECT ${selectColumns_prefixed} 
                 FROM ${joinTable} a${joinClauses}
                 WHERE ${whereClause
                   .replace(/\bkddept\b/g, `a.kddept`)
                   .replace(/\bkdunit\b/g, `a.kdunit`)
                   .replace(/\bkdsatker\b/g, `a.kdsatker`)}
                 ${groupByClause};`;
      }
    } else {
      // Handle cases when no hierarchical filtering/joining is needed
      // But we still might need LEFT JOIN for showing all departments
      if (switches.kementerian) {
        // Use LEFT JOIN for simple cases when kementerian switch is enabled
        let departmentFilter = "";

        if (formState.kementerian.size > 0) {
          // If specific departments are selected, filter by them
          const departmentList = Array.from(formState.kementerian);
          departmentFilter = `WHERE b.kddept IN (${departmentList
            .map((d) => `'${d}'`)
            .join(", ")})`;
        } else {
          // If no specific departments selected, show all departments (no WHERE filter)
          departmentFilter = "";
        }

        let simpleGroupBy = "";
        if (
          formState.kementerianTampilan === "kode" &&
          !uniqueColumns.includes("*")
        ) {
          simpleGroupBy = " GROUP BY b.kddept";
        }

        let selectWithoutId = selectClause.replace(/\bkddept\b/g, "b.kddept");

        query = `SELECT ${selectWithoutId} 
                 FROM dbref.t_dept_2023 b
                 LEFT JOIN monev2025.pagu_real_detail_harian_2025 a ON b.kddept = a.kddept
                 ${departmentFilter}${simpleGroupBy};`;
      } else {
        // Standard simple query for filter-only cases
        let simpleGroupBy = "";
        if (
          switches.kementerian &&
          formState.kementerian.size === 0 &&
          formState.kementerianTampilan === "kode" &&
          !uniqueColumns.includes("*")
        ) {
          simpleGroupBy = " GROUP BY kddept";
        }

        query = `SELECT ${selectClause} FROM monev2025.pagu_real_detail_harian_2025 WHERE ${whereClause}${simpleGroupBy};`;
      }
    }
    return query;
  }, [formState, switches, computed]);

  // NEW: Enhanced modular query generation using CombinedQueryGenerator
  // This handles single filters and multiple filter combinations
  const generateModularQuery = useCallback(() => {
    console.log(
      "🔄 Using CombinedQueryGenerator for scalable query generation"
    );

    // Add detailed debugging for satker queries
    console.log("🐛 Debug - Form State:", {
      satker: Array.from(formState.satker),
      satkerTampilan: formState.satkerTampilan,
      satkerEnabled: switches.satker,
      cutOff: formState.cutOff,
      selectedJenisLaporan,
      selectedTahun,
      selectedPembulatan,
    });

    try {
      // Use the new CombinedQueryGenerator which handles all scenarios
      const modularQuery = CombinedQueryGenerator.generateQuery({
        switches: {
          kementerian: switches.kementerian,
          eselonI: switches.eselonI,
          satker: switches.satker,
          cutOff: switches.cutOff,
        },
        formState: {
          kementerian: formState.kementerian,
          kementerianTampilan: formState.kementerianTampilan,
          eselonI: formState.eselonI,
          eselonTampilan: formState.eselonTampilan,
          satker: formState.satker,
          satkerTampilan: formState.satkerTampilan,
          cutOff: formState.cutOff,
        },
        selectedJenisLaporan: selectedJenisLaporan,
        selectedTahun: selectedTahun,
        selectedPembulatan: selectedPembulatan,
      });

      console.log("✅ Combined modular query generated:", modularQuery);
      return modularQuery;
    } catch (error) {
      console.warn(
        "⚠️ CombinedQueryGenerator failed, falling back to original logic:",
        error
      );
      // Fallback to original function for unsupported combinations
      return generateSQLQuery();
    }
  }, [
    formState,
    switches,
    selectedJenisLaporan,
    selectedTahun,
    selectedPembulatan,
    generateSQLQuery,
  ]);

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
        {" "}
        <CardBody className="p-6">
          <div className="space-y-6">
            {/* Query Parameters Section */}
            <div className="space-y-4">
              <h4 className="text-md font-medium bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent border-b border-gray-200 dark:border-gray-700 pb-2">
                Query Parameters
              </h4>{" "}
              {/* Cut Off Section - Always shown but disabled when switch is off */}
              <CutOffForm
                cutOff={formState.cutOff}
                setCutOff={formState.setCutOff}
                resetAllCutOff={resetAllCutOff}
                isEnabled={switches.cutOff}
              />{" "}
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
              )}{" "}
            </div>{" "}
            {/* Form Summary Buttons */}{" "}
            <FormSummaryButton
              isLoading={isLoading}
              generateSQLQuery={generateSQLQuery}
              generateModularQuery={generateModularQuery}
              resetAllState={formState.resetAllState}
              onSearchSubmit={() => {}}
              setIsModalOpen={setIsModalOpen}
              setCurrentSqlQuery={setCurrentSqlQuery}
              setIsLoading={setIsLoading}
              activeFiltersCount={activeFiltersCount}
              switches={switches}
            />
          </div>
        </CardBody>
      </Card>{" "}
      {/* Data Table Modal */}
      <DataTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sqlQuery={currentSqlQuery}
        cutOff={formState.cutOff} // Always pass cutOff value since it's always used for filtering
        selectedTahun={selectedTahun}
        selectedPembulatan={selectedPembulatan}
      />
    </div>
  );
};

export default FormSummary;

// Export components for modular usage
export { SearchableDropdownListbox };
