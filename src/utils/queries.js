export const UsersWithRepos = `
  query SearchUsers(
    $searchQuery: String!
    $number_of_users: Int!
    $number_of_repos: Int!
    $cursor: String
  ) {
    search(query: $searchQuery, first: $number_of_users, after: $cursor, type: USER) {
      edges {
        node {
          ... on User {
            avatarUrl
            name
            login
            repositories(first: $number_of_repos, orderBy: {field: STARGAZERS, direction: DESC}) {
              totalCount
              edges {
                node {
                  name
                  stargazerCount
                  isFork
                  url
                }
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
