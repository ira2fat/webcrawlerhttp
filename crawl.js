const { url } = require('inspector');
const { JSDOM } = require('jsdom');


async function crawlPage(baseUrl, currentUrl, pages) {

    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);

    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages
    }
    const normalizedUrl = normalizeUrl(currentUrl);

    if (pages[normalizedUrl]) {		
        pages[normalizedUrl].count++;
        return pages;
    }

    pages[normalizedUrl] = { count: 1 };

    console.log(`Crawling page: ${currentUrl}`);

    
    try {
        const resp = await fetch(currentUrl);

        if (resp.status > 399) {
            console.error(`Error fetching URL: ${currentUrl}, Status: ${resp.status}`);
            return pages;
        }
        const contentType = resp.headers.get('content-type');

        if ( !contentType.includes('text/html')) {
            console.error(`No html response URL: ${currentUrl}`);
            return pages;
        }
        const htmlBody = await resp.text();
        const urls = getURLFromHTML(htmlBody, baseUrl);

        for (const url of urls) {
           pages = await crawlPage(baseUrl, url, pages);
        }
    } 
    catch (error) {
        console.error(`Error fetching URL: ${currentUrl}`, error);

    }
    return pages;
}

function getURLFromHTML(htmlbody, baseUrl) {
const urls = [];
const dom = new JSDOM(htmlbody );
const linkElements = dom.window.document.querySelectorAll('a');

for (const linkElement of linkElements) {

    if (linkElement.href.slice(0, 1) === '/') {

        try {
            const urlObj = new URL(`${baseUrl}${linkElement.href}`);
            urls.push(urlObj.href);
        }
        catch (error) {
            console.error(`Error constructing URL from base and href: ${baseUrl}${linkElement.href}`, error);
        }
        
    }
    else{

         try {
            const urlObj = new URL(linkElement.href);
            urls.push(urlObj.href);
        }
        catch (error) {
            console.error(`Error constructing URL from base and href: ${baseUrl}${linkElement.href}`, error);
        }
    }
    
}


return urls
}

function normalizeUrl(urlStr) {
  const url = new URL(urlStr);

  const hostPath=`${url.hostname}${url.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {    
    return hostPath.slice(0, -1);
  } 
  else return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLFromHTML,
  crawlPage
};