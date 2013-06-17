// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = 'http://updates.html5rocks.com';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function incCounter(currCount) {
	var newCount = currCount + 1;
	return newCount;
}

function genStr(oldContent, currCount) {
	var newStr = "count: " + currCount + "; date: " + Date() + "\n";
	return(oldContent + newStr)
}

var accessToken = "";

var tmpJSON = "";
var gistData = "";

var gistID = "5789756";
var gitAPI = "https://api.github.com/gists/"
var gistQuery = gitAPI + gistID;

function getAccessToken() {
	accessToken = "access_token=" + prompt("Please supply your GitHub token");
	return(accessToken)
}

function incrementGist() {
	gistData = createCORSRequest('GET', gistQuery);
	gistData.send();
	tmpJSON = JSON.parse(gistData.responseText.trim());
}


