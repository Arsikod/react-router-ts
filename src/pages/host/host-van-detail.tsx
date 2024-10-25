import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { NavLinkStyled } from "../../components/nav-link";
import { Van } from "../vans";

export type OutletContext = {
  vanDetails: Van | undefined;
};

export function HostVanDetail() {
  const [vanDetails, setVanDetails] = useState<Van>();
  const { vanId } = useParams();
  const [fetchStatus, setFetchStatus] = useState("idle");

  useEffect(() => {
    setFetchStatus("loading");
    fetch(`/api/host/vans/${vanId}`)
      .then((response) => response.json())
      .then((data) => setVanDetails(data))
      .finally(() => setFetchStatus("idle"));
  }, [vanId]);

  if (fetchStatus === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavLink to=".." relative="path">
        Back to vans
      </NavLink>

      <ol style={{ display: "flex", gap: "10px" }}>
        <NavLinkStyled to="." end>
          Details
        </NavLinkStyled>
        <NavLinkStyled to="photos">Photos</NavLinkStyled>
        <NavLinkStyled to="pricing">Pricing</NavLinkStyled>
      </ol>

      <Outlet
        context={
          {
            vanDetails,
          } satisfies OutletContext
        }
      />
    </div>
  );
}
