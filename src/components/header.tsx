import { NavLinkStyled } from "./nav-link";
import { useAuthStore } from "../store/auth-context";

export function Header() {
  const { isLoggedIn, logOut } = useAuthStore();

  return (
    <header style={{ display: "flex", gap: "10px" }}>
      <NavLinkStyled to="/">Home</NavLinkStyled>
      <NavLinkStyled to="/about">About</NavLinkStyled>
      <NavLinkStyled to="/vans">Vans</NavLinkStyled>

      {isLoggedIn && <NavLinkStyled to="/host">Host</NavLinkStyled>}

      {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <NavLinkStyled to="/login">Login</NavLinkStyled>
      )}
    </header>
  );
}
