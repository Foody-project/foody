import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { CaretRightIcon } from "@phosphor-icons/react";
import { PartyPopper } from 'lucide-react';

export function SubMenuRedirection() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent">
          <CaretRightIcon color="white" className="bg-transparent hover:bg-transparent focus:bg-transparent"/>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            I'm a professionnal
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="text-[#a55ff0] hover:!text-purple-500">
            <PartyPopper color="#a55ff0ff"/>
            Offers
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}