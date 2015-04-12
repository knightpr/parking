app.directive('parkingfooter',function () {
  return {
    restrict: 'E',
    scope: {
      copyright: "@",
      title: "@"
    },
    templateUrl: "/footer.html"
  };
});

app.directive('currentuser',function (){ 
 return function(scope, element,attr) {
 	element.addClass(attr.currentuser); 
    }
});

app.directive('over',function(){
 return function(scope, element,attr) {
      element.bind("mouseenter", function(){
      element.addClass(attr.over); 
      })
    }
});

app.directive('out',function(){
 return function(scope, element,attr) {
      element.bind("mouseleave", function(){
        element.removeClass(attr.over); 
      })
    }
});




