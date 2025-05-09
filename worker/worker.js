// Cloudflare Worker script to proxy an Angular SPA from bsw.soydev.life to soydev.life/bsw

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const targetHost = 'bsw.soydev.life';
  
    // Create the URL to fetch from the original host
    let targetUrl;
    if (url.pathname.startsWith('/bsw')) {
      // Remove the /bsw prefix when fetching from the original host
      targetUrl = new URL(`https://${targetHost}${url.pathname.replace(/^\/bsw/, '')}`);
    } else {
      // Handle requests to the root of /bsw
      targetUrl = new URL(`https://${targetHost}${url.pathname}`);
    }
  
    // Copy query parameters
    targetUrl.search = url.search;
  
    // Create a new request with necessary headers
    const newHeaders = new Headers(request.headers);
  
    // Set the Host header to the target host
    newHeaders.set('Host', targetHost);
  
    // Fetch the resource from the original host
    let response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: newHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
      redirect: 'manual'
    });
  
    // Create a new response with modified headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  
    // Extract content type for processing
    const contentType = newResponse.headers.get('content-type') || '';
  
    // Handle HTML content - rewrite URLs
    if (contentType.includes('text/html')) {
      let text = await response.text();
  
      // Rewrite base href
      text = text.replace(/<base href="\/"/i, '<base href="/bsw/">');
  
      // Fix asset URLs - adjust these patterns based on your Angular app structure
      text = text.replace(/(src|href)="(?!\w+:\/\/)([^"]*?)"/g, (match, attr, path) => {
        // Don't modify absolute URLs or URLs that already have /bsw prefix
        if (path.startsWith('/bsw/') || path.startsWith('http')) {
          return match;
        }
        // Handle the root path case
        if (path.startsWith('/')) {
          return `${attr}="/bsw${path}"`;
        }
        // Handle relative paths
        return `${attr}="/bsw/${path}"`;
      });
  
      // Fix JavaScript references to manage paths
      text = text.replace(/\.config\(\s*\{\s*path\s*:\s*['"]([^'"]+)['"]/g, (match, path) => {
        if (path === '' || path === '/') {
          return match;
        }
        return match;
      });
  
      // Also fix any dynamically loaded image URLs in JavaScript
      text = text.replace(/"(assets\/images\/[^"]+)"/g, '"/bsw/$1"');
  
      // Handle image references at root path
      text = text.replace(/(src)="\/([^"\/][^"]*?\.(jpg|jpeg|png|gif|svg|webp|ico))"/gi, '$1="/bsw/$2"');
  
      return new Response(text, {
        status: newResponse.status,
        statusText: newResponse.statusText,
        headers: newResponse.headers
      });
    }
  
    // Handle image content - ensure proper headers
    if (contentType.includes('image/')) {
      // For images, let's ensure cache control headers are preserved
      // and that we're not unnecessarily modifying the binary content
      return newResponse;
    }
  
    // Handle CSS content - rewrite any URLs in CSS files
    if (contentType.includes('text/css')) {
      let text = await response.text();
  
      // Rewrite URLs in CSS (url() syntax)
      text = text.replace(/url\(['"]?(?!\w+:\/\/)([^'"\)]+)['"]?\)/g, (match, path) => {
        // Don't modify absolute URLs or URLs that already have /bsw prefix
        if (path.startsWith('/bsw/') || path.startsWith('http')) {
          return match;
        }
        // Handle the root path case
        if (path.startsWith('/')) {
          return `url("/bsw${path}")`;
        }
        // Handle relative paths
        return `url("/bsw/${path}")`;
      });
  
      // Ensure all image references in CSS are properly rewritten
      text = text.replace(/url\(['"]?\/(images\/[^'"\)]+)['"]?\)/gi, 'url("/bsw/$1")');
      text = text.replace(/url\(['"]?\/([^'"\)\/][^'"\)]*?\.(jpg|jpeg|png|gif|svg|webp|ico))['"]?\)/gi, 'url("/bsw/$1")');
  
      return new Response(text, {
        status: newResponse.status,
        statusText: newResponse.statusText,
        headers: newResponse.headers
      });
    }
  
    // Handle JavaScript content
    if (contentType.includes('javascript') || contentType.includes('application/json')) {
      // For JS files, check if they contain paths that need rewriting
      let text = await response.text();
  
      // Look for common Angular asset paths in JS and rewrite them
      text = text.replace(/"(assets\/[^"]+)"/g, '"/bsw/$1"');
      text = text.replace(/'(assets\/[^']+)'/g, "'/bsw/$1'");
  
      // Handle root path images in JS
      text = text.replace(/"\/([^"\/][^"]*?\.(jpg|jpeg|png|gif|svg|webp|ico))"/gi, '"/bsw/$1"');
      text = text.replace(/'\/([^'\/][^']*?\.(jpg|jpeg|png|gif|svg|webp|ico))'/gi, "'/bsw/$1'");
  
      return new Response(text, {
        status: newResponse.status,
        statusText: newResponse.statusText,
        headers: newResponse.headers
      });
    }
  
    // For redirects, rewrite Location headers to maintain the /bsw prefix
    if (newResponse.status >= 300 && newResponse.status < 400) {
      const location = newResponse.headers.get('Location');
      if (location) {
        try {
          const redirectUrl = new URL(location);
          if (redirectUrl.hostname === targetHost) {
            const newPath = `/bsw${redirectUrl.pathname}`;
            newResponse.headers.set('Location', `${url.origin}${newPath}${redirectUrl.search}`);
          }
        } catch (e) {
          // If the location isn't a valid URL, leave it unchanged
        }
      }
    }
  
    return newResponse;
  }
  