import { useQuery } from "@apollo/client";
import { HeaderMenuDocument, HeaderMenuQuery } from "../../../../gql/graphql";
import MainNav from "./ManinNav";


const Header = () => {
  const {data} = useQuery<HeaderMenuQuery>(HeaderMenuDocument);

  return (
    <header>
      <div className={`container`}>
        {data?.menu?.menuItems?.nodes.length && (
          <MainNav menu={data.menu.menuItems.nodes}/>
        )}
      </div>
    </header>
  );
};

export default Header;
