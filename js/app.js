//All the below API key used are only for development and educcation purpose only and all below api keys belongs me.
//Thank you running the project.Hope you like it and hopefully it complete all your requirements.Thank you.

$(document).ready(function () {
   
    $("#submitbth").click(function () {
	clearContent();
        var searchTxtBoxVal = $("#pinCode").val();
        if (searchTxtBoxVal != "") {
            if (!validateCityOrPostalCode(searchTxtBoxVal)) {
                getLocationFromPinCode(searchTxtBoxVal);
            }
            else {
                alert("Please enter valid Postal Code.Thank you");
            }
        }
        else {
            alert("Please enter Postal Code.Thank you");
        }
       
    });


});

function clearContent()
{
	$("#showLocationDetails").empty();
	$("#weatherForCity").empty();
	$("#showWeatherDetails").find("tr:gt(0)").remove();
	$("#showMapDetails").empty();

}

function validateCityOrPostalCode(value) {
    return /^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/.test(value);
}

function getLocationFromPinCode(pincode) {
    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/JP/" + pincode, true);
    client.onreadystatechange = function () {
        if (client.readyState == 4) {
            var dataObj=JSON.parse(client.responseText);
            var str = '<span>' + pincode + "->" + dataObj.places[0]["place name"] + ' ,' + dataObj.places[0]["state"] +'</span>';
            $("#showLocationDetails").append(str);
            getWeatherReport(dataObj["post code"], dataObj["country abbreviation"]);
            showMap(dataObj.places[0]["latitude"], dataObj.places[0]["longitude"]);
            
        };
    };

    client.send();  
   
}
function getWeatherReport(pincode, countryAbbreviation) {
  
    var key = "272290fd8522323b12157aac53f333b5";
    var zipcode = pincode+"," + countryAbbreviation; 
    var url = "https://api.openweathermap.org/data/2.5/forecast";

    $.ajax({
        url: url, //API Call
        dataType: "json",
        type: "GET",
        data: {
            zip: zipcode,
            appid: key,
            units: "metric",
            cnt: "10"
        },
        success: function (data) {
            $("#weatherForCity").append("<h2 style=''>City:" + data.city.name + "</h2>"); // City (displays once)
            $.each(data.list, function (index, val) {
                var row = document.createElement('tr'); // create row node
                var col = document.createElement('td'); // create 1 column node
                var col2 = document.createElement('td'); // create 2 column node
                var col3 = document.createElement('td'); // create 3  column node
                var col4 = document.createElement('td'); // create 4 column node
                var col5 = document.createElement('td'); // create 5 column node
                row.appendChild(col); // append 1 column to row
                row.appendChild(col2); // append 2 column to row
                row.appendChild(col3); // append 3 column to row
                row.appendChild(col4); // append 4 column to row
                row.appendChild(col5); // append 5 column to row
                col.innerHTML = "<b>" + val.dt_txt + "</b>" 
                col2.innerHTML = "<b>" + val.main.temp_min  + "</b>" 
                col3.innerHTML = "<b>" + val.main.temp_max + "</b>" 
                col4.innerHTML = "<p>" + val.weather[0].description + "</p>" 
                col5.innerHTML = "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png' >"
                var table = document.getElementById("showWeatherDetails"); // find table to append to
                table.appendChild(row); // append row to table
            });
           
        }
    });
  
   
}

function showMap(latitude, longitude) {
    var createMapUrlString = '<img style="width: 100%; height: auto" src="' + 'https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/' + latitude + ',' + longitude + '/18?mapSize=500,500&pp=' + latitude + ',' + longitude + ';66&mapLayer=Basemap,Buildings&key=Aqb9tNSPxsJ98vjTIICh0cU9YJROc2YvXMZ2ooe1q7emRTwDhbaPbzpBCkmEW_P0' + '" alt="no map found" />';
    $("#showMapDetails").append(createMapUrlString);
}