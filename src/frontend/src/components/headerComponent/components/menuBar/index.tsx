import { useContext } from "react";
import { TabsContext } from "../../../../contexts/tabsContext";
import { PopUpContext } from "../../../../contexts/popUpContext";
import {
  Plus,
  ChevronDown,
  ChevronLeft,
  Undo,
  Redo,
  Settings2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../ui/dropdown-menu";

import { alertContext } from "../../../../contexts/alertContext";
import { Link } from "react-router-dom";
import { undoRedoContext } from "../../../../contexts/undoRedoContext";
import FlowSettingsModal from "../../../../modals/flowSettingsModal";
import { Button } from "../../../ui/button";

export const MenuBar = ({ flows, tabId }) => {
  const { updateFlow, setTabId, addFlow } = useContext(TabsContext);
  const { setErrorData } = useContext(alertContext);
  const { openPopUp } = useContext(PopUpContext);
  const { undo, redo } = useContext(undoRedoContext);

  function handleAddFlow() {
    try {
      addFlow(null, true);
      // saveFlowStyleInDataBase();
    } catch (err) {
      setErrorData(err);
    }
  }
  let current_flow = flows.find((flow) => flow.id === tabId);

  return (
    <div className="flex gap-2 items-center">
      <Link to="/">
        <ChevronLeft className="w-4" />
      </Link>
      <div className="flex items-center font-medium text-sm rounded-md py-1 px-1.5 gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="gap-2 flex items-center" variant="primary">
              {current_flow.name}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                openPopUp(<FlowSettingsModal />);
              }}
            >
              <Settings2 className="w-4 h-4 mr-2 dark:text-gray-300" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                undo();
              }}
            >
              <Undo className="w-4 h-4 mr-2 dark:text-gray-300" />
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                redo();
              }}
            >
              <Redo className="w-4 h-4 mr-2 dark:text-gray-300" />
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Flows</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={tabId}
              onValueChange={(value) => {
                setTabId(value);
              }}
            >
              {flows.map((flow, idx) => {
                return (
                  <Link to={"/flow/" + flow.id}>
                    <DropdownMenuRadioItem value={flow.id}>
                      {flow.name}
                    </DropdownMenuRadioItem>
                  </Link>
                );
              })}
            </DropdownMenuRadioGroup>
            <DropdownMenuItem
              onClick={() => {
                handleAddFlow();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Flow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MenuBar;