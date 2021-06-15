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
            id
            avatarUrl
            name
            login
            repositories(first: $number_of_repos, orderBy: {field: STARGAZERS, direction: DESC}) {
              totalCount
              edges {
                node {
                  id
                  name
                  stargazerCount
                  isFork
                  url
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export const MoreRepos = `
  query GetRepos(
    $user: String!
    $number_of_repos: Int
    $cursor: String
  ) {
    user(login: $user) {
      repositories(first: $number_of_repos, after: $cursor, orderBy: {field: STARGAZERS, direction: DESC}) {
        edges {
          node {
            id
            name
            stargazerCount
            isFork
            url
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      } 
    }
  }
`;
