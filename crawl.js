function normalizeUrl(urlStr) {
  const url = new URL(urlStr);

  const hostPath=`${url.hostname}${url.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {    
    return hostPath.slice(0, -1);
  } 
  else return hostPath;
}

module.exports = {
  normalizeUrl
};