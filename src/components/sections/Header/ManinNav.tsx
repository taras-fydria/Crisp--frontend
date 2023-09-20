import { FC } from "react";
import { NavLink } from "react-router-dom";
import { HeaderMenuItemFragment } from "../../../../gql/graphql";

const MainNav: FC<{menu: HeaderMenuItemFragment[]}> = (
  props
) => {

  return (
    <nav>
      <ul>
        {props.menu &&
          props.menu.map((menuItem) => (
            <>
              {menuItem && (
                <li key={menuItem.databaseId}>
                  <NavLink to={menuItem.path || ""}>{menuItem.label}</NavLink>
                </li>
              )}
            </>
          ))}
      </ul>
    </nav>
  );
};

export default MainNav;
