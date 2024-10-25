import { NavLinkStyled } from "./nav-link";

export function Header() {
  return (
    <header style={{ display: "flex", gap: "10px" }}>
      <NavLinkStyled to="/">Home</NavLinkStyled>
      <NavLinkStyled to="/about">About</NavLinkStyled>
      <NavLinkStyled to="/vans">Vans</NavLinkStyled>
      <NavLinkStyled to="/host">Host</NavLinkStyled>
    </header>
  );
}
