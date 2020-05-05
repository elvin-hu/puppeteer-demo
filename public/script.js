const omnibox = document.getElementById('url')
const goButton = document.getElementById('go')

const urlParams = new URLSearchParams(window.location.search);
var urlToConvert = urlParams.get('url');
if (urlToConvert == null || urlToConvert == "") {
  urlToConvert = "about:blank"
  document.querySelector("iframe").src = "about:blank"
}
else {
console.log("Received from address bar", urlToConvert)
// omnibox.innerHTML = urlToConvert;
omnibox.value = urlToConvert;

    try {
      const encoded = encodeURIComponent(urlToConvert);
      
      const structuredUrl = `/pdf?url=${encoded}`
      // const data = await fetch(`/pdf?url=${encoded}`);
      
      document.querySelector("iframe").src = structuredUrl
      
      // const file = await data.blob();
      // console.log(file)
      // const fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
    } catch (err) {
      console.log(err)
    }


}

goButton.addEventListener('click', async function() {
  
   var url = omnibox.value;
  
  console.log("The url to convert is", url)
  

    try {
      const encoded = encodeURIComponent(url);
      
      const structuredUrl = `/pdf?url=${encoded}`
      // const data = await fetch(`/pdf?url=${encoded}`);
      
      document.querySelector("iframe").src = structuredUrl
      
      // const file = await data.blob();
      // console.log(file)
      // const fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
    } catch (err) {
      console.log(err)
    }

  
});