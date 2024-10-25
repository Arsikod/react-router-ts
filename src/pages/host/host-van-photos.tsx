import { useVanDetails } from "./hooks";

export function HostVanPhotos() {
  const { vanDetails } = useVanDetails();
  return <h4>{vanDetails?.make}</h4>;
}
