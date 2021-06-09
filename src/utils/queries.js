export const UsersWithRepos = `
  query SearchUsers(
    $searchQuery: String!
    $number_of_users: Int!
    $number_of_repos: Int!
  ) {
    search(query: $searchQuery, first: $number_of_users, type: USER) {
      edges {
        node {
          ... on User {
            avatarUrl
            name
            login
            repositories(first: $number_of_repos) {
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
    }
  }
`;