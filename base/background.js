// No, really, this is all it does.
function showOptions(){
    browser.runtime.openOptionsPage();
}
browser.browserAction.onClicked.addListener(showOptions);