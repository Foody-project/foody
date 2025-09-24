import CircularProgress from "@mui/material/CircularProgress";
import { Place } from "@/types";
import { Info } from "@phosphor-icons/react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

interface ReviewRecapProps {
  place?: Place;
}

export default function ProgressBarCircle({ place }: ReviewRecapProps) {
  if (!place) return;

  const value = (place?.stars ?? 0) * 20;
  const valueFoody = (parseFloat(place?.foodysNotation ?? "0") || 0) * 20;
  const tooltipContent =
    "At Foody, we test the restaurants we feature and give them a rating. We don't cheat, we don't give them the rating they ask for, we judge them as ordinary users would.";

  return (
    <div className="flex flex-row items-start gap-8">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <CircularProgress
              variant="determinate"
              value={value}
              thickness={3}
              size={80}
              sx={{
                color: "var(--text-orange)",
                "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[var(--text-basic)] font-normal text-base">
              {place.stars}/5
            </span>
          </div>
          <span className="mt-2 text-sm text-[var(--text-basic)]">
            Average rating
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <CircularProgress
              variant="determinate"
              value={valueFoody}
              thickness={3}
              size={80}
              sx={{
                color: "var(--text-orange-third)",
                "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[var(--text-orange-third)] font-normal text-base">
              {place.foodysNotation}/5
            </span>
          </div>

          <div className="mt-2 flex items-center">
            <span className="text-sm text-[var(--text-orange-third)]">
              Foody's review
            </span>
            <Tooltip
              title={tooltipContent}
              placement="right"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "rgba(var(--background-rgb), 0.7)",
                    color: "rgba(var(--text-basic), 0.7)",
                    opacity: "0.2",
                    border: "1px solid var(--grey-opacity)",
                    borderRadius: "8px",
                    padding: "0.5rem 0.75rem",
                  },
                },
              }}
            >
              <IconButton size="small" className="p-1">
                <Info size={12} color="var(--text-orange-third)" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
