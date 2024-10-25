import { useVanDetails } from "./hooks";

export function HostVanInfo() {
  const { vanDetails } = useVanDetails();
  return <pre>{JSON.stringify(vanDetails)}</pre>;
}
