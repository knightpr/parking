app.directive('mainmenu',function () {
  return {
    restrict: 'E',
    templateUrl: "views/mainmenu.html"
  };
});

app.directive('mainbody',function () {
  return {
    restrict: 'E',
    templateUrl: "views/mainbody.html"
  };
});

app.directive('mainfooter',function () {
  return {
    restrict: 'E',
    templateUrl: "views/footer.html"
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




