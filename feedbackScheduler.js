function doGet() {
  globalSettings();
  return HtmlService.createTemplateFromFile('home')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
