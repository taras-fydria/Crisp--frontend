import { LoaderFunction } from "react-router-dom";
import { apolloClient } from "../apollo";
import {
  PostPageLoaderDocument,
  PostPageLoaderQuery,
  PostPageLoaderQueryVariables,
} from "../../gql/graphql";

const postPageLoader: LoaderFunction = async ({ params }) => {
  const { postSlug } = params;

  if (!postSlug) return "";

  const { data } = await apolloClient.query<
    PostPageLoaderQuery,
    PostPageLoaderQueryVariables
  >({
    query: PostPageLoaderDocument,
    variables: {
      uri: postSlug,
    },
  });


  switch (data?.nodeByUri) {
    case "Page":
    case "Post":
      break;

    default:
      break;
  }


};

export default postPageLoader;
