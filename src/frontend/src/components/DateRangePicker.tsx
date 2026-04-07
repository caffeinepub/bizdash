import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { format, parseISO, subDays } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "../types";

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const PRESETS: Array<{ label: string; days: number }> = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

function formatDisplayRange(range: DateRange): string {
  try {
    const start = parseISO(range.startDate);
    const end = parseISO(range.endDate);
    return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
  } catch {
    return "Select range";
  }
}

export default function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const handlePreset = (days: number) => {
    const end = new Date();
    const start = subDays(end, days - 1);
    onChange({
      startDate: format(start, "yyyy-MM-dd"),
      endDate: format(end, "yyyy-MM-dd"),
    });
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          data-ocid="date-range-picker"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
            "bg-card border border-border text-foreground",
            "hover:bg-muted/60 transition-smooth",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-xs">{formatDisplayRange(value)}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className={cn(
            "z-50 w-48 rounded-lg border border-border bg-popover shadow-elevated",
            "p-1.5 animate-in fade-in-0 zoom-in-95",
          )}
        >
          <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Quick ranges
          </p>
          {PRESETS.map(({ label, days }) => (
            <button
              type="button"
              key={days}
              onClick={() => handlePreset(days)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md transition-smooth",
                "text-foreground hover:bg-muted/60 hover:text-foreground",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {label}
            </button>
          ))}
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
