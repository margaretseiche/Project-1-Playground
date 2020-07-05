$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search); //constructing URl with saved parameters from the window location href
  var stateName = urlParams.get("stateName"); // getting stateName from the URL
  console.log(stateName);
  var stateCode = urlParams.get("stateCode"); // getting stateCode from the URL
  console.log(stateCode);
  var stateActivities = urlParams.get("activity"); // getting the activities from the URL
  console.log(stateActivities);
  var stateTheme = urlParams.get("theme"); // getting the activities from the URL
  console.log(stateTheme); // getting theme from the URL

  function ajaxStatesCall(stateCode) {
    // if user picks only state option it'll be running only this AJAX api

    //"https://developer.nps.gov/api/v1/parks?api_key="  + apiKey + "&stateCode=" + "NY"

    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        stateCode +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",

      method: "GET",
    }).then(function (data) {
      console.log(data);
      console.log(data.data.length);
      $(".spinner").addClass("hide");
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      for (var i = 0; i < data.data.length; i++) {
        var parkName = data.data[i].fullName;
        var resultsDiv = $("<div>")
          .addClass("results")
          .appendTo("#parentResultsDiv")
          .attr({
            "data-lon": data.data[i].longitude,
            "data-lat": data.data[i].latitude,
            "data-park": data.data[i].parkCode,
          });
        $("<h4>").text(parkName).appendTo(resultsDiv);
        var activitiesObj = data.data[i].activities;
        var divOfPtags = $("<div>").addClass("container");

        for (var j = 0; j < activitiesObj.length; j++) {
          $("<p>").text(activitiesObj[j].name).appendTo(divOfPtags);
        }
        divOfPtags.appendTo(resultsDiv);

        var entranceFee = $("<p>");
        if (data.data[i].entranceFees[0]) {
          entranceFee
            .text(
              data.data[i].entranceFees[0].title +
                ": $" +
                parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)
            )
            .appendTo(resultsDiv);
        }
      }
    });
  } 
  function ajaxStateActivityCall(stateCode, stateActivities) {
    // if user picks state and activity, it'll be filtering in the given state by matching activity
    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        stateCode +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      $(".spinner").addClass("hide");
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      $("<h3>")
        .text(
          "You picked " +
          stateActivities +
            ". Try another activity to explore more."
        )
        .prependTo($("#resultsResume"));
      for (var i = 0; i < data.data.length; i++) {
        var activitiesObj = data.data[i].activities;
        for (var j = 0; j < activitiesObj.length; j++) {
          if (activitiesObj[j].name == stateActivities) {
            var parkName = data.data[i].fullName;
            var resultsDiv = $("<div>")
              .addClass("results")
              .appendTo("#parentResultsDiv")
              .attr({
                "data-lon": data.data[i].longitude,
                "data-lat": data.data[i].latitude,
                "data-park": data.data[i].parkCode,
              });
            $("<h4>").text(parkName).appendTo(resultsDiv);
            var divOfPtags = $("<div>").addClass("container");

            for (var j = 0; j < activitiesObj.length; j++) {
              $("<p>").text(activitiesObj[j].name).appendTo(divOfPtags);
            }
            divOfPtags.appendTo(resultsDiv);
            var entranceFee = $("<p>");
            if (data.data[i].entranceFees[0]) {
              entranceFee
                .text(
                  data.data[i].entranceFees[0].title +
                    ": $" +
                    parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)
                )
                .appendTo(resultsDiv);
            }
          }
        }
      }
    });
  } 
  function ajaxStateThemesCall(stateCode, stateTheme) {
    // if user picks state and theme, it'' be filtering in the given state by matching theme
    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        stateCode +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      $(".spinner").addClass("hide");
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      $("<h3>")
        .text(
          "You picked " +
            stateTheme +
            ". Try another theme to explore more."
        )
        .prependTo($("#resultsResume"));
      for (var i = 0; i < data.data.length; i++) {
        var topicsObj = data.data[i].topics;
        for (var j = 0; j < topicsObj.length; j++) {
          if (topicsObj[j].name == stateTheme) {
            var parkName = data.data[i].fullName;
            var resultsDiv = $("<div>")
              .addClass("results")
              .appendTo("#parentResultsDiv")
              .attr({
                "data-lon": data.data[i].longitude,
                "data-lat": data.data[i].latitude,
                "data-park": data.data[i].parkCode,
              });
            $("<h4>").text(parkName).appendTo(resultsDiv);
            var divOfPtags = $("<div>").addClass("container");

            for (var j = 0; j < topicsObj.length; j++) {
              $("<p>").text(topicsObj[j].name).appendTo(divOfPtags);
            }
            divOfPtags.appendTo(resultsDiv);
            var entranceFee = $("<p>");
            if (data.data[i].entranceFees[0]) {
              entranceFee
                .text(
                  data.data[i].entranceFees[0].title +
                    ": $" +
                    parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)
                )
                .appendTo(resultsDiv);
            }
          }
        }
      }
    });
  }
  function ajaxStateActivityThemeCall(
    stateCode,
    stateActivities,
    stateTheme
  ) {
    // if user picks only state option it'll be running only this AJAX api
    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        stateCode +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      $(".spinner").addClass("hide");
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      $("<h3>")
        .text(
          "You picked " +
          stateActivities +
            " and " +
            stateTheme +
            ". Try another activity or theme to explore more."
        )
        .prependTo($("#resultsResume"));

      var activitiesObj = data.data.map(
        (arrActivities) => arrActivities.activities
      );
      console.log(activitiesObj);
      var topicsObj = data.data.map((arrTopics) => arrTopics.topics);
      console.log(topicsObj);
      var parkByActivities = [];
      var parkByTheme = [];

      var filteringActivities = false;
      var filteringTheme = false;
      for (var x of activitiesObj) {
        for (var y of x) {
          if (y.name == stateActivities) {
            filteringActivities = true;
            parkByActivities.push(data.data[activitiesObj.indexOf(x)]);
          }
        }
      }
      console.log(filteringActivities);
      console.log(parkByActivities);
      for (var x of topicsObj) {
        for (var y of x) {
          if (y.name == stateTheme) {
            filteringTheme = true;
            parkByTheme.push(data.data[topicsObj.indexOf(x)]);
          }
        }
      }
      console.log(filteringTheme);
      console.log(parkByTheme);

      for (var x of parkByActivities) {
        var parkName = x.fullName;

        if (parkByTheme.includes(x)) {
          console.log("yes");

          var resultsDiv = $("<div>")
            .addClass("results")
            .appendTo("#parentResultsDiv")
            .attr({
              "data-lon": x.longitude,
              "data-lat": x.latitude,
              "data-park": x.parkCode,
            });
          $("<h4>").text(parkName).appendTo(resultsDiv);
          var divOfPtags = $("<div>").addClass("container");

          for (var j = 0; j < x.activities.length; j++) {
            $("<p>").text(x.activities[j].name).appendTo(divOfPtags);
          }
          divOfPtags.appendTo(resultsDiv);

          var entranceFee = $("<p>");
          if (x.entranceFees[0].title) {
            entranceFee
              .text(
                x.entranceFees[0].title +
                  ": $" +
                  parseFloat(x.entranceFees[0].cost).toFixed(2)
              )
              .appendTo(resultsDiv);
          }
        }
      }
      if (filteringActivities == false && filteringTheme == false) {
        $("<h1>")
          .text(
            "Your search criteria did not match any Park in " + stateName
          )
          .appendTo("#parentResultsDiv");
      }
    });
  }

  if (stateCode !== null) {
    if (stateActivities == "null" && stateTheme == "null") {
      console.log(stateCode + " was selected");
      ajaxStatesCall(stateCode);
    }
    if (stateActivities != "null" && stateTheme == "null") {
      console.log("state " + stateCode + " activity " + stateActivities);
      ajaxStateActivityCall(stateCode, stateActivities);
    }
    if (stateActivities != "null" && stateTheme != "null") {
      console.log("all things were selected");
      ajaxStateActivityThemeCall(stateCode, stateActivities, stateTheme);
    }
    if (stateActivities == "null" && stateTheme != "null") {
      console.log("state " + stateCode + " and theme " + stateTheme);
      ajaxStateThemesCall(stateCode, stateTheme);
    }
  }

  $("#parentResultsDiv").click(function (event) {
    event.stopPropagation();
    var d_results = event.target;
    while(!d_results.getAttribute("data-park") && d_results.parentNode) d_results = d_results.parentNode;

      var longitude = d_results.getAttribute("data-lon");
      var latitude = d_results.getAttribute("data-lat");
      var parkCode = d_results.getAttribute("data-park");
    

    if (parkCode != null) {
      window.location.href =
        "./details.html" + // saving object into the window location href with parameters of user's choices
        "?longitude=" +
        longitude + // saving object into the window location href of user's stateName choice
        "&latitude=" +
        latitude + // saving object into the window location href of user's activity choice
        "&parkCode=" +
        parkCode; // saving object into the window location href of user's theme choice
      console.log(window.location);
    }
  });
});