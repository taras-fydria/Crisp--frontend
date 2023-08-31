# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Generating TypeScript Types with GraphQL Codegen

In this project, we use GraphQL Codegen to automatically generate TypeScript types based on our GraphQL schema and documents. This allows us to have strongly-typed interactions with our GraphQL API, enhancing type safety and development efficiency.

### Prerequisites

Before we begin, ensure that you have the necessary dependencies installed. If you haven't already, you can install them using the following command:

```bash
npm install --save-dev @graphql-codegen/cli @graphql-codegen/client-preset @graphql-codegen/introspection @graphql-codegen/typescript
```

### Configuration

We've provided a graphql.config.yml file in the root of the project. This configuration specifies how GraphQL Codegen should generate TypeScript types. Let's break down the key parts of the configuration:

```yaml
overwrite: true
schema: "http://localhost:10013/graphql"
documents:
  - "src/graphql/**/*.graphql"
  - "src/graphql/**/*.gql"
  - "src/**/*.ts"
  - "src/**/*.tsx"
generates:
  ./gql/:
    preset: "client"
  ./graphql.schema.json:
    plugins:
      - "introspection"
```

- **overwrite:** Generated files will overwrite existing files (set to true).
- **schema:** URL of the GraphQL schema (change to your schema URL).
- **documents:** Patterns for GraphQL documents and TypeScript files to consider.
- **generates:** Output locations and plugins for code generation.
- **./gql/:** Directory for generated client-side code (preset: "client").
- **./graphql.schema.json:** File containing introspection result.


### Generating Types

To generate TypeScript types, run the following command in your terminal:

```bash

npm run codegen

```

This command will trigger the GraphQL Codegen process, which reads your schema and documents, and generates TypeScript types accordingly.
Using Generated Types

After running the code generation, you'll find the generated TypeScript files in the ./gql/ directory. These files contain strongly-typed representations of your GraphQL operations, making it easier to work with your API.

For example, if you have a GraphQL query named GetUser, you can import and use its generated type like this:

```typescript

import { GetUserQuery } from './gql';

// Now you can use GetUserQuery type for type-safe interactions
const user: GetUserQuery['user'] = /_ ... _/;
```

### Summary

By using GraphQL Codegen, we simplify the process of generating TypeScript types based on our GraphQL schema and documents. This enhances the reliability and maintainability of our code by providing strong typings for our GraphQL operations.

For more customization options and advanced usage of GraphQL Codegen, refer to the official documentation: GraphQL Code Generator.

That's it! With GraphQL Codegen, we're able to harness the power of TypeScript's type system for efficient and error-free development.

Feel free to adjust the wording and formatting to fit your project's style. This chapter should help users understand how to use GraphQL Codegen for generating TypeScript types based on your provided configuration.

## Writing GraphQL Operations and Fragments and Their Usage in .tsx 

### 1. Create .graphql Files

In your project, create .graphql files to write your GraphQL operations (queries, mutations, etc.) and fragments. These files will hold your GraphQL code and are a convenient way to organize and manage your queries and fragments.

For example, let's create a file named postQueries.graphql:

```graphql

# postQueries.graphql

fragment PostPreview on Post {
  title
  link
  content
}

query PostQuery {
  posts {
    nodes {
      ...PostPreview
    }
  }
}
```

In this example, we have a fragment named PostPreview that selects specific fields from the Post type. The PostQuery queries for posts and includes the PostPreview fragment for each post.

### 2. Using Fragments

Fragments allow you to define reusable selections of fields that can be included in multiple queries. They help keep your code DRY (Don't Repeat Yourself) and make your queries more maintainable.
### 3. Storing Fragments Separately

You can store your fragments in separate .graphql files. For example, create a postFragments.graphql file:

```graphql

# postFragments.graphql

fragment PostPreview on Post {
  title
  link
  content
}
```

### 4. Run Codegen

Run the code generation process:

```bash
npx graphql-codegen
```

### 5. Fetching Data with Apollo Client

Assuming you have Apollo Client set up in your project, you can now use the generated types and operations.

```tsx

import React from 'react';
import { useQuery } from '@apollo/client';
import { PostQueryDocument, PostQueryQuery } from './gql'; // Adjust import path

const PostList: React.FC = () => {
  const { data, loading, error } = useQuery<PostQueryQuery>(PostQueryDocument);

  // Handle loading and error states

  const posts = data?.posts?.nodes;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <a href={post.link}>Read More</a>
        </div>
      ))}
    </div>
  );
};

export default PostList;
```

By using the generated types, you ensure type safety and avoid common GraphQL-related errors when fetching and working with data from your API.

This chapter explains how to write GraphQL operations and fragments in .graphql files, generate TypeScript code using GraphQL Code Generator, and use the generated types with Apollo Client to fetch and work with data from your GraphQL API. This approach enhances the maintainability and reliability of your GraphQL queries and interactions.
