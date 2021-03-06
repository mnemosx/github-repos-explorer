# GitHub repos explorer

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/><img alt="Vue.js" src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vue-dot-js&logoColor=%234FC08D"/><img alt="SASS" src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white"/><img alt="GraphQL" src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql"/><img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>

### [LIVE SITE: https://repos.andis.dev/](https://repos.andis.dev/) :link: [![Netlify Status](https://api.netlify.com/api/v1/badges/458b9c64-f0f8-4d1c-8056-b75fb7bf3240/deploy-status)](https://app.netlify.com/sites/github-repos-xplorer/deploys)

## App lets you search GitHub users and browse their repositories. 

### Features
:fire: Written using the latest and greatest Vue 3 and [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api). Data is fetched from [GitHub GraphQL API](https://docs.github.com/en/graphql) using [Villus](https://villus.logaretm.com/)  
:heavy_check_mark: Search input is debounced by 1 second, thus delaying API request until user has finished typing (sort of)  
:heavy_check_mark: Loading spinner is displayed while data is fetching  
:heavy_check_mark: User list is paginated (using 'Load More' button)  
:heavy_check_mark: Fetched data is cached in memory and also in localStorage (for persistence between app launches)  
:heavy_check_mark: 'No results' page is displayed when request returns 0 items  
:heavy_check_mark: Start screen displays past searches (last 15 by FIFO) which are persistent between app launches  
:heavy_check_mark: Mobile friendly  
:heavy_check_mark: User can like repos  
:heavy_multiplication_x: Tested using Cypress  


### Additionaly
:heavy_check_mark: Liked repos are gathered together in a separate page  
:heavy_check_mark: Repos are sorted by most starred  
:heavy_check_mark: User can use URL queries (/search?q=something) to directly search for users on page load   
:heavy_check_mark: Skip users with 0 repos  
:heavy_check_mark: App can be navigated using keyboard  
:heavy_check_mark: If number of repos > 10, request more repos on user input  

<br />  
<br />  


<p align="center">
    <img src="./lighthouse.svg" width="600px">
</p>
<p align="center">
  :point_up: Tested against <a href="https://pagespeed-insights.herokuapp.com/?url=https://repos.andis.dev/search?q=dave">https://repos.andis.dev/search?q=dave</a>
</p>

<br />  
<br />  


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
