
import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, canonical, ogImage, schema }) {
  const base = 'https://yoursite.com' // replace with your real domain

  return (
    <Helmet>
      <title>{title} | YourCompany</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${base}${canonical}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${base}${canonical}`} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={`${base}${ogImage}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}