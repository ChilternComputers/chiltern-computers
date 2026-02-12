export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  const newHeaders = new Headers(response.headers);

  // Delete any existing CSP and set our own
  newHeaders.delete('Content-Security-Policy');
  newHeaders.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://formspree.io; " +
      "style-src 'self' 'unsafe-inline'; " +
      "font-src 'self'; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://formspree.io https://*.cloudflareinsights.com; " +
      "frame-src https://maps.google.com https://www.google.com https://*.google.com; " +
      "object-src 'none'; " +
      "base-uri 'self'"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};
