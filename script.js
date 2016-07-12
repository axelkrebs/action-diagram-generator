     window.onload = updateTranslation;

     function updateTranslation()
     {
	 var originalPanel = document.querySelector(".original > textarea");
	 var originalText = originalPanel.value;
	 var translationPanel = document.querySelector(".translation > textarea");
	 translationPanel.value = actionDiagramTranslationFrom(originalText);
     }

     function actionDiagramTranslationFrom(text)
     {
	 function repeat(stringToRepeat, nTimes)
	 {
	     var stringRepeated = "";
	     for(var i = 0; i < nTimes; i++)
		 {
		     stringRepeated += stringToRepeat;
		 }
	     return stringRepeated;
	 }

	 var unicode_BoxDrawingsLightHorizontal = "&#9472;";
	 var unicode_Asterisk = "&#8727;"
	 var replacementString = repeat(unicode_BoxDrawingsLightHorizontal, 3) + unicode_Asterisk;
	 var regex = "---*";
	 var diagramText = text.replace(regex, replacementString);
	 return diagramText;

     }
