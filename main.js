const {crawlPage} = require('./crawl.js');
const {printReport} = require('./report.js');
const { connectToDb } = require('./db.js');

async function main() {
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
  const pages = await crawlPage(baseUrl, baseUrl, {});
  
  printReport(pages);

  try{

    const db = await connectToDb();

    const collection = db.collection('crawlReports');

    const crawlEntry = {
    timestamp: new Date(),
    baseUrl,
    pages
  };
  await collection.insertOne(crawlEntry);
  console.log('Crawl results saved to MongoDB');
  }
  catch(err){
    console.error('Failed to connect to MongoDB:', err);
  }
   
 
}

main();