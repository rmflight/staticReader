#' parsing the opml subscriptions file
#'
#' @param opmlFile the opml file to parse
#' @param outFile the file to put the rawdog feeds into
#' @export
#' @importFrom XML xmlTreeParse xmlChildren xmlAttrs xmlSize
parseOPML <- function(opmlFile="subscriptions.xml", outFile="feedList.txt"){
  stopifnot(exists(opmlFile))
  
  opml <- xmlTreeParse(opmlFile, useInternalNodes=T)
  opmlUse <- xmlChildren(opml)[[1]][[2]]
  
  outXML <- vector("list", 0)
  
  getNodeData <- function(inNode){
    if (xmlSize(inNode) == 0){
      outXML <<- c(outXML, list(xmlAttrs(inNode)))
    } else {
      for (iN2 in seq(1, xmlSize(inNode))){
        inNode2 <- inNode[[iN2]]
        getNodeData(inNode2)
      }
    }
  }
  
  
  for (iNode in seq(1, xmlSize(opmlUse))){
    tmpNode <- opmlUse[[iNode]]
    getNodeData(tmpNode)
  }
  
  feedList <- sapply(outXML, function(x){
    paste("feed", "24h", x["xmlUrl"], sep=" ")
  })
  
  cat(feedList, sep="\n", file=outFile)
  
}