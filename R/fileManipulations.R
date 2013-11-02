#' get the saved URLs
#' 
#' @param ctx github context and authorization
#' @param id the gist id to use
#' @return set of URLs
#' @export
#' @importFrom XML htmlTreeParse xmlValue
getSavedURL <- function(ctx, id){
  gistData <- get.gist(ctx, id=gistID)
  
  savedURLs <- gistData$content$files[["savedURL.md"]][["content"]]
  savedURLs <- strsplit(savedURLs, "\n")[[1]]
  savedURLs <- savedURLs[!(nchar(savedURLs) == 0)]
  savedURLs <- savedURLs[grep("^http", savedURLs)]
}


#' clean up oxford URLs
#' 
#' @param inURL the url to clean up, assumes is already an oxford url
#' @return outURL cleaned up URL
modURL_oxfordJ <- function(inURL){
  
  splitURL <- strsplit(inURL, split="/")[[1]]
  splitURL <- splitURL[3:length(splitURL)]
  delPart <- c("cgi", "short")
  splitURL <- splitURL[!(splitURL %in% delPart)]
  hasRSS <- grep("rss=1$", splitURL)
  tmpRSS <- splitURL[hasRSS]
  tmpRSS <- paste(substr(tmpRSS, 1, nchar(tmpRSS)-6), ".long", sep="")
  splitURL[hasRSS] <- tmpRSS
  outURL <- paste("http://", paste(splitURL, collapse="/"), sep="")
}

#' get titles from the html page
#' 
#' @param inURL the journal article URL to query
#' @return title the contents of the title field, if any
#' @export
#' @importFrom XML htmlTreeParse xmlValue
getTitle <- function(inURL){
  try({
    htmlParsed <- htmlTreeParse(inURL, useInternalNodes=T)
    title <- xmlValue(getNodeSet(htmlParsed, "//title")[[1]])
  }
  )
}



