import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardActivity } from "./Card";
import { SelectTypeOfActivity } from "../PreviewCards/SelectTypeOfActivity";
import { Activity } from "@/types";

import { getActivityData } from "@/lib/hooks/getActivityData";

interface ActivitiesSectionProps {
  isHomePage: boolean;
}

export default function ActivitiesSection({
  isHomePage,
}: ActivitiesSectionProps) {
  const [selectedTypeOfActivity, setSelectedTypeOfActivity] = React.useState<{
    icon: string;
    text: string;
    category: string;
  } | null>({
    icon: "🏛️",
    text: "Museums 🏛️",
    category: "museum",
  });

  const activities = getActivityData();

  const filteredData = React.useMemo(
    () =>
      selectedTypeOfActivity
        ? activities.filter(
            (cat) => cat.type === selectedTypeOfActivity.category
          )
        : activities,
    [selectedTypeOfActivity]
  );

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4 pr-[16px] flex justify-end w-full">
        <SelectTypeOfActivity onSelect={setSelectedTypeOfActivity} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="activities"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mb-6 w-full"
        >
          <div className="mb-6">
            <div className="flex flex-rows justify-between">
              {activities
                .slice(0, 3)
                .map((activity: Activity, index: number) => (
                  <CardActivity
                    key={index}
                    id={index}
                    name={activity.name}
                    quartier={activity.quartier}
                    prix={activity.prix}
                    image={activity.image}
                    type={selectedTypeOfActivity?.icon ?? ""}
                    isHomePage={isHomePage}
                  />
                ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
