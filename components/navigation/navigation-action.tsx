"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hook/use-model-store";

function NavigationAction() {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center dark:bg-neutral-700 dark:group-hover:bg-emerald-500">
            <Plus
              className=" text-emerald-500 size={25}
            group-hover:text-white
            trasition"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}

export default NavigationAction;
