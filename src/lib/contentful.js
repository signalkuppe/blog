import * as contentful from 'contentful'


export const contentfulClient = contentful.createClient({
  space: import.meta.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_SPACE,
  accessToken: import.meta.env.NODE_ENV === 'development'
    ? import.meta.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_PREVIEWTOKEN
    : import.meta.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_ACCESSTOKEN,
  host: import.meta.env.NODE_ENV === 'development' ? "preview.contentful.com" : "cdn.contentful.com",
})