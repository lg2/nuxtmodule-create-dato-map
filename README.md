# nuxtmodule-create-dato-map

```
  yarn add @lg2/nuxtmodule-create-dato-map -D
  npm i @lg2/nuxtmodule-create-dato-map -D
```

This module create a public `dato-route-map.json` mapping of your `~/assets/jsons/link-resolver.json`  once nuxt is build parsing all your routes.

example of link-resolver.json

```
{
  "HomePageRecord": { "name": "index" },
  "FaqPageRecord": { "name": "faq" },
  "ArticleRecord": {
    "name": "blog-slug",
    "params": { "slug": "slug" }
  }
}
```