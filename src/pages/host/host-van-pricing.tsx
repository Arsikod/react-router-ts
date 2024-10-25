import { useVanDetails } from "./hooks";

export function HostVanPricing() {
  const { vanDetails } = useVanDetails();
  return <h5>{vanDetails?.model}</h5>;
}
