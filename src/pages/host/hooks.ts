import { OutletContext } from "./host-van-detail";
import { useOutletContext } from "react-router-dom";

export function useVanDetails() {
  return useOutletContext<OutletContext>();
}
