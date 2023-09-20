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


  switch (data.nodeByUri?.__typename) {
    case "Page":
    case "Post":
      output.postType = data.nodeByUri.contentTypeName;
      output.ID = data.nodeByUri.databaseId;
      break;

    default:
      output = null;
      break;
  }

  console.log(output);

  return "1";
};

export default postPageLoader;
