function doGet() {
  globalSettings();
  return HtmlService.createTemplateFromFile('home')
      .evaluate()
      .setTitle('Feedback Scheduler - TW');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
