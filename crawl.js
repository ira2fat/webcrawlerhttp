const { url } = require('inspector');
const { JSDOM } = require('jsdom');


async function crawlPage(url) {

    console.log(`Crawling page: ${url}`);
    try {
        const resp = await fetch(url);

        if (resp.status > 399) {
            console.error(`Error fetching URL: ${url}, Status: ${resp.status}`);
            return;
        }
        const contentType = resp.headers.get('content-type');

        if ( !contentType.includes('text/html')) {
            console.error(`No html response URL: ${url}`);
            return;
        }
        console.log(`Response text: ${ await resp.text()}`);
    } 
    catch (error) {
        console.error(`Error fetching URL: ${url}`, error);

    }
    
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