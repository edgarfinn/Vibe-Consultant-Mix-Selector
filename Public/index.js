// userListener
  // on submit trigger search and begin render.

var mockResults = ["https://www.mixcloud.com/detroitswindle/detroit-swindle-gilles-peterson-worldwide-gpww995/", "https://www.mixcloud.com/gillespeterson/gilles-marathon-2015-mix/", "https://www.mixcloud.com/gillespeterson/caribou-7-inch-vinyl-mix-chat/", "https://www.mixcloud.com/gillespeterson/carnival-m%C3%BAsica-popular-brasileira-mix/", "https://www.mixcloud.com/gillespeterson/gpww-presents-kon-amir/", "https://www.mixcloud.com/gillespeterson/in-memory-of-maurice-white-mix/", "https://www.mixcloud.com/gillespeterson/trevor-jackson-words-music/", "https://www.mixcloud.com/gillespeterson/goldie-words-music/", "https://www.mixcloud.com/WORLDWIDEFESTIVAL/wf-sete-14-gilles-peterson/", "https://www.mixcloud.com/gillespeterson/chaka-khan-words-and-music/", "https://www.mixcloud.com/gillespeterson/jon-hassell-words-music/", "https://www.mixcloud.com/NTSRadio/gilles-peterson-brazilian-special-10th-june-2014/", "https://www.mixcloud.com/gillespeterson/otis-brown-iii-words-music/", "https://www.mixcloud.com/gillespeterson/gilles-peterson-and-pharoahe-monch-in-conversation/", "https://www.mixcloud.com/gillespeterson/yosi-horik…daisuke-tanabe-japan-night-at-worldwide-festival/", "https://www.mixcloud.com/bestbeforec4/bestbefore-gilles-peterson-mixtape-26112015/", "https://www.mixcloud.com/gillespeterson/lv-words-music/", "https://www.mixcloud.com/NTSRadio/gilles-peterson-15th-december-2015/", "https://www.mixcloud.com/gillespeterson/ned-doheny-words-music/", "https://www.mixcloud.com/TheVinylFactory/vf-mix-09-gilles-peterson/"]

var searchBar = document.getElementById('search-container');
searchBar.addEventListener('submit', searchHandler)


function searchHandler(event){
  event.preventDefault();
  var searchInput = event.target.childNodes[1].value;
  // makeRequest(formatQueryString(searchInput), extractMixUrls);
  generateDOMNodes(formatMixUrls(mockResults));
}


// format queryString
  // toLowerCase
  // trim whitespace
  // replace spaces with '+'
function formatQueryString(input) {
  var formattedQuery = input.slice();
  formattedQuery = formattedQuery.trim().toLowerCase().replace(/\s\s+/g, '+');
  return formattedQuery;
}


// request module.
// need to add callback
// callback needs to render response to DOM.
function makeRequest(queryString, callback) {
  console.log("requestMade for",queryString);
  var baseUrl = "https://api.mixcloud.com";
  var action = "/search/?q=";
  var searchWord = queryString.slice();
  var searchType = "type=cloudcast"
  var url = baseUrl+action+searchWord+"&"+searchType;
  var dummyUrl = "https://api.mixcloud.com/search/?q=gilles+peterson&type=cloudcast";
  // console.log("lru", dummyUrl);
  // console.log("url", url);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 &&  xhr.status === 200) {
      var resonse = JSON.parse(xhr.responseText);
      callback(resonse);
      // Render-To-DOM-function-callback
    }
  }
  // xhr.open("GET", url);
  // xhr.send();

};

// render response back to the DOM.

// extract urls from the response object and turn into an array

function extractMixUrls(mixList){
  var urlNodes = [];
  mixList.data.forEach(function(responseObj){
    urlNodes.push(responseObj.url);
  });
  formatMixUrl(urlNodes);
}

function formatMixUrls(urlNodes) {
  var formattedUrls = [];
  urlNodes.forEach(function(url){
    formattedUrls.push(url.replace(/https:\/\/www/,"https://api")+"embed-html/");
  })
  return formattedUrls;
}

// populate resuults list
function generateDOMNodes(mixArray){
  var resultsContainer = document.getElementById('results-container');
  var list = document.getElementById('results');

  mixArray.forEach(function(mixUrl){
    var mixNode = document.createElement('LI');
    mixNode.className = "mixNode";
    var mixFrame = document.createElement('IFRAME');
    mixFrame.src= mixUrl;
    mixFrame.className = "mixcloud-frame";
    mixFrame.style.width = "100%";
    mixFrame.style.height = "120";
    mixFrame.frameBorder="0";

    mixNode.appendChild(mixFrame);
    list.appendChild(mixNode);
  });

}

//
