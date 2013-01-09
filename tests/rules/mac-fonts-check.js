(function(){

  /*global YUITest, CSSLint*/
  var 
    	Assert = YUITest.Assert,
    	testSpec = { "check-fonts": 1 };

 	function mkErrorMessage(font, alternative) {
 		return "No MacOS-alternative for font '" + font + "'. Consider adding '" + alternative + "'.";
 	}						

  YUITest.TestRunner.add(new YUITest.TestCase({

   	name: "Mac alternative font checker - font property",

    "No erros when no Mac alternative needed": function(){
      var result = CSSLint.verify(".c { font-family: Arial }", testSpec);
            
      Assert.areEqual(0, result.messages.length);
    },

		"No erros when Mac alternative is specified": function(){
			var result = CSSLint.verify(".c { font: 14px bold Tahoma, Geneva }", testSpec);
            
      Assert.areEqual(0, result.messages.length);
    },

    "No alternative detection 0": function(){
      var result = CSSLint.verify(".c { font: 14px bold Lucida Console }", testSpec);
            
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual(mkErrorMessage("Lucida Console", "Monaco"), result.messages[0].message);
    },

    "No alternative detection 1": function(){
      var result = CSSLint.verify(".c { font: 14px bold MS Serif }", testSpec);
            
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual(mkErrorMessage("MS Serif", "New York"), result.messages[0].message);
    },

    "'font: inherit' causes no error": function() {
      var result = CSSLint.verify(".c { font: inherit }", testSpec);
            
      Assert.areEqual(0, result.messages.length);	
    }

  }));

	YUITest.TestRunner.add(new YUITest.TestCase({

   	name: "Mac alternative font checker - font-family property",

    "No erros when no Mac alternative needed": function(){
      var result = CSSLint.verify(".c { font-family: Arial }", testSpec);
            
      Assert.areEqual(0, result.messages.length);
    },

		"No erros when Mac alternative is specified": function(){
      var result = CSSLint.verify(".c { font-family: Tahoma, Geneva }", testSpec);
            
      Assert.areEqual(0, result.messages.length);
    },

    "No alternative detection 0": function(){
      var result = CSSLint.verify(".c { font-family: Lucida Console }", testSpec);
            
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual(mkErrorMessage("Lucida Console", "Monaco"), result.messages[0].message);
    },

    "No alternative detection 1": function(){
      var result = CSSLint.verify(".c { font-family: MS Serif }", testSpec);
            
      Assert.areEqual(1, result.messages.length);
      Assert.areEqual(mkErrorMessage("MS Serif", "New York"), result.messages[0].message);
    },
    
    "No detection inside @font-face rule 1": function() {
      var result = CSSLint.verify("@font-face { font-family: MyFont; }", testSpec);
            
      Assert.areEqual(0, result.messages.length);	
    },

    "No detection inside @font-face rule 2": function() {
      var result = CSSLint.verify("@font-face { font-family: Tahoma; }", testSpec);
            
      Assert.areEqual(0, result.messages.length); 
    }

  }));

})();   