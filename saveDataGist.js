// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			tmpJSON = JSON.parse(xhr.response);
			console.log("changed data")
		}
	}
  }
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

// bunch of global variables used for querying the gist. They are global because they are shared amongst the functions.

var gistID = "6825393"; // Should be modified to where you want your gist to be stored
var gitAPI = "https://api.github.com/gists/"
var gistQuery = "";
var gistData = "";
var patchContent;

// functions for setting the githug access token as a cookie, and loading it when the page loads
var accessToken = "";

function submitToken() {
  var token = document.getElementById('tokenField').value;
  var nDay = 14;
  var date = new Date();
  date.setTime(date.getTime() + (nDay * 24 * 60 * 60 * 1000))
  var expires = "; expires=" + date.toGMTString();
  document.cookie = "staticReader" + "=" + token + expires + ";";
  document.getElementById('tokenButton').style.color = "green";
  accessToken = token;
  gistQuery = gitAPI + gistID + "?" + accessToken;
}
  
function loadToken() {
  var tokenCookie = "staticReader";
  var t_value = document.cookie;
  var t_start = t_value.indexOf(tokenCookie + "=");
  if (t_start != -1){
    t_start = t_value.indexOf("=") + 1;
    t_end = t_value.length;
    accessToken = t_value.substr(t_start, t_end);
    document.getElementById('tokenButton').style.color = "green";
    document.getElementById('tokenField').value = accessToken;
    gistQuery = gitAPI + gistID + "?" + accessToken;
  }
}




function askToken() {
	if (accessToken.length == 0) {
		accessToken = getAccessToken();
		gistQuery = gitAPI + gistID + "?" + accessToken;
	}
}

function getInitial() {
	if (gistData.length == 0) {
		gistData = createCORSRequest('GET', gistQuery);
	}
	gistData.send()
}

function sendPatch(patchContent) {
		
	{
		patchContent = typeof patchContent !== 'undefined' ? patchContent : Date();
	}
	
	var tmpContents = tmpJSON['files']['savedURL.md']['content'];
	var newContents = "\n" + tmpContents + patchContent + "\n\n";
	var newData = {
					"files": {
						"savedURL.md" : {
							"content": newContents
										}
						}
					};
	
	gistData = createCORSRequest('PATCH', gistQuery)
	gistData.send(JSON.stringify(newData));
}
