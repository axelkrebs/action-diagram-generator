// make objects originalModule and translationModule
// each have properties : heading, footer, border which returns the corresponding formatting strings
window.onload = updateTranslation;

function updateTranslation()
{
  var originalPanel = document.querySelector(".original > textarea");
  var originalText = originalPanel.value;
  var translationPanel = document.querySelector(".translation > textarea");
  translationPanel.value = actionDiagramTranslationFrom(originalText);
}

function repeat(stringToRepeat, nTimes)
{
  var stringRepeated = "";
  for(var i = 0; i < nTimes; i++)
  {
    stringRepeated += stringToRepeat;
  }
  return stringRepeated;
}



function actionDiagramTranslationFrom(text)
{
  //Original shared characters
  const unicode_Dash = String.fromCharCode(45);
  const unicode_Asterisk = String.fromCharCode(42);


  // Translation shared characters
  const unicode_BOX_DRAWINGS_LIGHT_VERTICAL = String.fromCharCode(9474);
  const unicode_BOX_DRAWINGS_LIGHT_DOWN_AND_RIGHT = String.fromCharCode(9484);
  const unicode_BoxDrawingsLightHorizontal = String.fromCharCode(9472);

  
  
  
  
  var lines = text.split("\n");
  var startLineBlocksBorderChars = [];
  var translationLines = new Array(lines.length);
  for(var iLine = 0; iLine < lines.length; iLine++)
  {

    
    
    var originalLine = lines[iLine].toString();

    /* Create nested module and if/els blocks side borders */ 
    var blocksBorderDrawings = "";
    if(startLineBlocksBorderChars.length > 0)
    {
      blocksBorderDrawings  = startLineBlocksBorderChars.join("");

    }
    var rawTranslatedLineText = originalLine.slice(0);
    var regexParenthesedGroup_remainingTextOnLine = "";
    var replacementString = "";
    
    /* Translate module heading */
    // Original module heading
    var regexStringMatchingOriginalModuleHeading = "^\\s*" + repeat(unicode_Dash, 3) + "\\" + unicode_Asterisk+ "(.*)$";
    var regexMatchingOriginalModuleHeading = new RegExp(regexStringMatchingOriginalModuleHeading,"");
  
    // Translation module heading
    var TRANSLATION_MODULE_HEADING = unicode_BOX_DRAWINGS_LIGHT_DOWN_AND_RIGHT + repeat(unicode_BoxDrawingsLightHorizontal, 3) + unicode_Asterisk;

    if(regexMatchingOriginalModuleHeading.test(originalLine))
    {
      regexParenthesedGroup_remainingTextOnLine = "$1";
      replacementString = TRANSLATION_MODULE_HEADING + regexParenthesedGroup_remainingTextOnLine;
      rawTranslatedLineText = originalLine.replace(regexMatchingOriginalModuleHeading, replacementString);
      startLineBlocksBorderChars.push(unicode_BOX_DRAWINGS_LIGHT_VERTICAL);
    }

    

    /* Translate if */
    var TRANSLATION_IF_HEADING = unicode_BOX_DRAWINGS_LIGHT_DOWN_AND_RIGHT + repeat(unicode_BoxDrawingsLightHorizontal, 2);
    var regexStringMatchingOriginalIfHeading = "^\\s*" + "(?:[iI][fF]){1}" + "(.*)$"; 
    var regexMatchingOriginalIfHeading = new RegExp(regexStringMatchingOriginalIfHeading, "");
    if(regexMatchingOriginalIfHeading.test(originalLine))
    {
      regexParenthesedGroup_remainingTextOnLine = "$1";
      replacementString = TRANSLATION_IF_HEADING + " if" + regexParenthesedGroup_remainingTextOnLine;
      rawTranslatedLineText = originalLine.replace(regexMatchingOriginalIfHeading, replacementString);
      startLineBlocksBorderChars.push(unicode_BOX_DRAWINGS_LIGHT_VERTICAL);
    }


    
    //Translation else
    var unicode_BOX_DRAWINGS_LIGHT_VERTICAL_AND_RIGHT = String.fromCharCode(9500);
    var TRANSLATION_ELSE_HEADING = unicode_BOX_DRAWINGS_LIGHT_VERTICAL_AND_RIGHT + repeat(unicode_BoxDrawingsLightHorizontal, 2);
    var regexStringMatchingOriginalElseHeading = "^\\s*(?:else){1}(.*)$";
    var regexMatchingOriginalElseHeading = new RegExp(regexStringMatchingOriginalElseHeading,"");
    if(regexMatchingOriginalElseHeading.test(originalLine))
    {
      var blocksBorderDrawingsWithoutMatchingIfBorderLineChar =  blocksBorderDrawings.slice(0, -1);
      blocksBorderDrawings = blocksBorderDrawingsWithoutMatchingIfBorderLineChar;
      regexParenthesedGroup_remainingTextOnLine = "$1";
      replacementString = TRANSLATION_ELSE_HEADING + " else" + regexParenthesedGroup_remainingTextOnLine;
      rawTranslatedLineText = originalLine.replace(regexMatchingOriginalElseHeading, replacementString);
    }    


    
    translationLines[iLine] = blocksBorderDrawings + rawTranslatedLineText;
  }
  return translationLines.join("\n");

}
    

	 
