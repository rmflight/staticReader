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

// Make a request for the user
// Make sure to do var accessToken = 'access_token=access_token from github'
var urlGist = "https://api.github.com/users/rmflight/gists?";
var useGist = urlGist + accessToken;
var xhr = createCORSRequest('GET', useGist)
xhr.send()
xhr.responseText

// Request info on a particular gist
var urlGist = "https://api.github.com/gists/5737151?"
var useGist = urlGist + accessToken;
var xhr = createCORSRequest('GET', useGist)
xhr.send()
xhr.response

// make a patch request to the server
var currDate = "todays date is:" + Date();
var contentString = "This is a test file that I'm working \nwith to see if I can modify it\nafter getting a personal OAuth token\n" + currDate;
var newData = {
  "description": "still a test gist",
  "files": {
    "file1.txt": {
      "content": contentString
    }
  }
};

var xhr = createCORSRequest('PATCH', useGist)
xhr.send(JSON.stringify(newData))