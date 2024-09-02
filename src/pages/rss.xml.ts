import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import { SITE_TITLE, SITE_DESCRIPTION } from '../constants'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async context => {
  if (!context.site) throw new Error('Contexto não possui site')

  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({ ...post.data, link: `/blog/${post.slug}/` })),
  })
}
