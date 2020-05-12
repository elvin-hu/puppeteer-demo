const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

exports.pdf = async (request, response) => {
  const options = {
    width: "1440px",
    height: "900px",
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: true,
    margin: {
      top: "0px",
      bottom: "0px"
    },
    printBackground: true
  };

  const url = request.query.url;
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-infobars",
      "--window-position=0,0",
      "--ignore-certifcate-errors",
      "--ignore-certifcate-errors-spki-list",
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ]
  });

  const page = await browser.newPage().catch(function(error) {
    /* Handle error here for browser new page and return
       expected value for page if things fail */
    console.log(error);
  });
  await page.goto(url, { waitUntil: "networkidle0" }).catch(function(error) {
    /* Handle error here for browser new page and return
       expected value for page if things fail */
    console.log(error);
  });
  const scriptToInject = `
  var anchors = document.getElementsByTagName("a");

  for (var i = 0; i < anchors.length; i++) {
    anchors[i].href = "http://puppeteer-api.glitch.me/pdf?url=" + anchors[i].href;
    anchors[i].target = '_PARENT';
  }

  `;
  await page.evaluate(scriptText => {
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.textContent = scriptText;
    document.body.parentElement.appendChild(el);
  }, scriptToInject);
  
  const pdf = await page.pdf(options).catch(function(error) {
    /* Handle error here for browser new page and return
       expected value for page if things fail */
    console.log(error);
  });
  await browser.close();
  response.setHeader("Content-Type", "application/pdf");
  response.setHeader("Content-Length", pdf.length);
  response.setHeader("Content-Disposition", "inline");
  // console.log(JSON.stringify(pdf));
  // response.status(204);
  response.send(pdf);
};
