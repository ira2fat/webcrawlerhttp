function printReport(pages) {
    console.log("Web Crawl Report:");
    console.log("-----------------");
    const sortedPages = sortPages(pages);
    for (const [url, data] of sortedPages) {
        console.log(`${url} - Hits: ${data.count}`);
    }
}

function sortPages(pages) {
    pagesArr = Object.entries(pages)
    pagesArr.sort(((a,b)=>{

        aHits = a[1].count;
        bHits = b[1].count;
        return bHits - aHits;
    }));
    return pagesArr
}
module.exports = {
    sortPages,
    printReport,
};