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
  document.querySelector("#loader").classList = ""

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

document.querySelector("iframe").onload = function() {
  document.querySelector("#loader").classList = "hidden"
}

goButton.addEventListener('click', async function() {
  
  
   var url = omnibox.value;
  document.querySelector("#loader").classList = ""
  
  console.log("The url to convert is", url)
  
  
  if (!url.includes('http://') && !url.includes('https://')) {
    alert("missing protocol");
    
  const requestConfig = {
    method: "GET",
        headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }

  };
  // let request = await fetch(`https://${url}`, requestConfig);
      let request = await fetch(`https://www.google.com`, requestConfig);

  const responses = await request.json();
  console.log(responses);

    // fetch("https://" + url)
    // .then(response => console.log(response))
    // .then(contents => console.log(contents))
    // .catch(error => console.log(error.message));

    
  }
   
  

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