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

	 //Original module
	 var ORIGINAL_MODULE_HEADING = repeat(unicode_Dash, 3) + unicode_Asterisk;
	 
	 // Translation module
	 var TRANSLATION_MODULE_HEADING = unicode_BOX_DRAWINGS_LIGHT_DOWN_AND_RIGHT + repeat(unicode_BoxDrawingsLightHorizontal, 3) + unicode_Asterisk;


	 var lines = text.split("\n");
	 var startLineBlocksBorderChars = [];
	 var translationLines = new Array(lines.length);
	 for(var iLine = 0; iLine < lines.length; iLine++)
	 {
	     
	     console.log(lines);
	     console.log(iLine);
	     console.log(lines[iLine]);
	     var originalLine = lines[iLine].toString();

	     /* Create nested module and if/els blocks side borders */ 
	     var blocksBorderDrawings = "";
	     if(startLineBlocksBorderChars.length > 0)
	     {
		 blocksBorderDrawings  = startLineBlocksBorderChars.join("");

	     }

	     /* Translate original module an if/else headings */
	     var regexStringMatchingOriginalModuleHeading = ORIGINAL_MODULE_HEADING;
	     var regex = new RegExp(regexStringMatchingOriginalModuleHeading);
	     console.log(regexStringMatchingOriginalModuleHeading);
	     var rawTranslatedLineText;	     
	     if(originalLine.match(regex))
	     {
		  rawTranslatedLineText = originalLine.replace(ORIGINAL_MODULE_HEADING, TRANSLATION_MODULE_HEADING);
		 startLineBlocksBorderChars.push(unicode_BOX_DRAWINGS_LIGHT_VERTICAL);
	     }
	     else
	     {
		 rawTranslatedLineText = originalLine;
	     }
	     
	     console.log(rawTranslatedLineText);
	     translationLines[iLine] = blocksBorderDrawings + rawTranslatedLineText;

	 }
	 
	 return translationLines.join("\n");
    

	 
     }
