import { NavLink, NavLinkProps } from "react-router-dom";

export function NavLinkStyled({ children, ...rest }: NavLinkProps) {
  return (
    <NavLink
      style={({ isActive }) => ({
        color: isActive ? "red" : "black",
        fontWeight: isActive ? "bold" : "normal",
      })}
      {...rest}
    >
      {children}
    </NavLink>
  );
}
