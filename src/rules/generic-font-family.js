CSSLint.addRule({

    //rule information
    id: "generic-font-family",
    name: "Generic font family",
    desc: "Check for generic font family presence",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            genericFonts = { 
                'serif': 1, 
                'sans-serif': 2, 
                'fantasy': 3, 
                'monospace': 4, 
                'cursive': 5 
            };

        parser.addListener("property", function(event){

            var property = event.property,
                value = event.value,
                propertyName = property.text.toLowerCase(),
                valueParts = value.parts,
                hasGeneric = false,
                i, l, value, type, fontName;

            if(propertyName == "font" || propertyName == "font-family") {
                for(i = 0, l = valueParts.length; i < l; i++) {
                    value = valueParts[i];
                    type = value.type;
                    if(type == 'identifier') {
                        if(fontName in genericFonts) {
                            hasGeneric = true;
                        }
                    } else if(type == 'string') {
                        fontName = value.text.substr(1, value.text.length - 2);
                        if(fontName in genericFonts) {  
                            hasGeneric = true;                          
                            reporter.report("Generic font-family specified as string, not as an identifier (" + 
                                            value.text + " instead of " + fontName + "). Consider removing quotes.", 
                                            value.line,
                                            value.col,
                                            rule);
                        }
                    }
                }
                if(!hasGeneric)
                    reporter.report("No generic font-family alternative specified. Consider adding one of the following:\n" +
                                  "serif, sans-serif, monospace, fantasy, cursive.",
                                  event.line,
                                  event.col,
                                  rule);
            }
        });

    }

});