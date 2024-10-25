import { NavLinkStyled } from "../../components/nav-link";
import { Outlet } from "react-router-dom";

export function Host() {
  return (
    <div>
      <header style={{ display: "flex", gap: "10px" }}>
        <NavLinkStyled to="." end>
          Dashboard
        </NavLinkStyled>
        <NavLinkStyled to="income">Income</NavLinkStyled>
        <NavLinkStyled to="reviews">Reviews</NavLinkStyled>
        <NavLinkStyled to="vans">Vans</NavLinkStyled>
      </header>
      <Outlet />
    </div>
  );
}
