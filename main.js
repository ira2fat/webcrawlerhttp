const {crawlPage} = require('./crawl.js');

function main() {
  if (process.argv.length < 3) {
    console.error("No URL provided.");
    process.exit(1);
  }

  if (process.argv.length >3) {
    console.error("too many command line argument.");
    process.exit(1);
  }
    const baseUrl = process.argv[2];
  console.log(`Starting web crawl for: ${baseUrl}`);
  crawlPage(baseUrl)
 
}

main();