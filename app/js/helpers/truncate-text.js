define(function() {  
  var unescapeHtml = function(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
 
   return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
 };

 return function(options) {
    var maxChars = options.hash.maxChars;
    var text = unescapeHtml(options.hash.text()).split(' ');
    var output = '';

    while (output.length <= maxChars && text.length) {
      var nextWord = text.shift();

      if (output.concat(' ' + nextWord).trim().length > maxChars) {
        break;
      }

      output = output.concat(' ' + nextWord);
    }

    return (output + ' ...').trim();
  };
});