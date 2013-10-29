// Create the XHR object.
function createCORSRequest(method, url, buttonID) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			gistContents = JSON.parse(xhr.response);
      colorGreen(buttonID);
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
var gistContents;

// functions for setting the githug access token as a cookie, and loading it when the page loads
var accessToken = "";

/*
Lets the user provide their github api oauth token to be stored as a cookie, and also refresh it. The token is stored for 2 weeks.
*/
function submitToken() {
  var token = document.getElementById('tokenField').value;
  var nDay = 14;
  var date = new Date();
  date.setTime(date.getTime() + (nDay * 24 * 60 * 60 * 1000))
  var expires = "; expires=" + date.toGMTString();
  document.cookie = "staticReader" + "=" + token + expires + ";";
  colorGreen('tokenButton');
  accessToken = "access_token=" + token;
  gistQuery = gitAPI + gistID + "?" + accessToken;
}
  
/* 
Loads the github token previously stored as a cookie, if it is available
*/
function loadToken() {
  var tokenCookie = "staticReader";
  var t_value = document.cookie;
  var t_start = t_value.indexOf(tokenCookie + "=");
  if (t_start != -1){
    t_start = t_value.indexOf("=") + 1;
    t_end = t_value.length;
    accessToken = "access_token=" + t_value.substr(t_start, t_end);
    colorGreen('tokenButton');
    document.getElementById('tokenField').value = accessToken;
    gistQuery = gitAPI + gistID + "?" + accessToken;
    
  }
}

function getInitial(buttonID) {
  console.log(buttonID)
	if ((gistData.length == 0) && (accessToken.length != 0)) {
		gistData = createCORSRequest('GET', gistQuery, buttonID);
    colorRed(buttonID);
    gistData.send();
	}
  
}

function colorRed(buttonID) {
  document.getElementById(buttonID).style.backgroundColor = "#FF3300"
}

function colorGreen(buttonID) {
  document.getElementById(buttonID).style.backgroundColor = "#99FF66"
}


/* Takes the content (normally a single URL) and the button doing the submitting,
   and submits a patch request to the gist. If there is no content (undefined), then
   the current date is sent. The buttonID is used to change the color of the button
   while the patch request is operational. After updating, the data is stored in 'tmpJSON'
*/
function sendPatch(patchContent, buttonID) {
		
	{
		patchContent = typeof patchContent !== 'undefined' ? patchContent : Date();
	}
	
  if (gistContents !== 'undefined') {
  
  	var tmpContents = gistContents['files']['savedURL.md']['content'];
  	var newContents = "\n" + tmpContents + patchContent + "\n\n";
  	var newData = {
  					"files": {
  						"savedURL.md" : {
  							"content": newContents
  										}
  						}
  					};
  	
  	gistData = createCORSRequest('PATCH', gistQuery, buttonID);
    colorRed(buttonID);
  	gistData.send(JSON.stringify(newData));
  }
}
