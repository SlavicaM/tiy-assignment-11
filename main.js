// When the page is ready
$(function (){
  // AJAX request for data
  $.ajax("data.json", {
    // callback for successful fetch of fata
    success: function(data){
      // assign the return of buildTree to the variable tree
      var tree = buildTree(data); 
      // set the html of the <body> tag to our tree
      $("body").html(tree);
    }
  });
});

var buildTree = function(data){
  var $rootUl;
  $rootUl = $("<ul />"); // New jquery object for an unordered list <ul></ul>

  _.each(data, function (item) { // Go through each (top-level) key in the data
    var $innerUl, $innerLi;

    $rootLi = $("<li />"); // create list item
    $rootLi.append("<span>" + item.name + "</span>"); // add a span with the item's name to the list item
    $rootUl.append($rootLi); // add that list item too our root <ul>

    if(item.children){ // if the item has a key called children (that's not null)
      innerData = item.children;
      $innerUl = $("<ul />"); // create a new <ul>
      _.each(innerData, function  (innerItem){ // go through each child item
        $innerLi = $("<li />"); // make a new list item
        $innerLi.append("<span>" + innerItem.name + "</span>"); // add a span with the item's name to the list item
        $innerUl.append($innerLi); // add that list item to our new <ul> 
      });
      $rootLi.append($innerUl); // append the child <ul> to the parent <li>
    }
  });

  return $rootUl; // return the whole tree
};