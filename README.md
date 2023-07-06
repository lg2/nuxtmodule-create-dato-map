# nuxtmodule-create-dato-map

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