let asc = true;
let last = 0;

//Making headers clickable

function clickFunction() {
    document.getElementById("listOS").addEventListener("click", function () { sortTable(0) });
    document.getElementById("listBrand").addEventListener("click", function () { sortTable(1) });
    document.getElementById("listModel").addEventListener("click", function () { sortTable(2) });
    document.getElementById("listScreen").addEventListener("click", function () { sortTable(3) });
    document.getElementById("detailsName").addEventListener("click", function () { sortTable2(0) });
    document.getElementById("detailsEmail").addEventListener("click", function () { sortTable2(1) });
    document.getElementById("detailsPhone1").addEventListener("click", function () { sortTable2(2) });
    document.getElementById("detailsPhone2").addEventListener("click", function () { sortTable2(3) });
    document.getElementById("detailsAddress").addEventListener("click", function () { sortTable2(4) });
    document.getElementById("detailsPostcode").addEventListener("click", function () { sortTable2(5) });
}

//Sorting function

function sortTable(z) {

    let table = document.getElementsByClassName("tablePhones")[0];
    let tableRows = table.getElementsByTagName("tr");

    if (last == z) {
        asc = !asc;
    }

    else {
        asc = true;
    }

    last = z;

    for (let i = 1; i < tableRows.length - 3; i++) {
        console.log(i);
        for (let j = i + 1; j < tableRows.length - 2; j++) {
            console.log(j);
            let a = tableRows[i].innerText.split("\t");
            let b = tableRows[j].innerText.split("\t");
            if ((asc && a[z].toLowerCase() > b[z].toLowerCase()) || (!asc && a[z].toLowerCase() < b[z].toLowerCase())) {
                let c = tableRows[i].innerHTML;
                tableRows[i].innerHTML = tableRows[j].innerHTML;
                tableRows[j].innerHTML = c;
            }
        }
    }

    for (let i = 0; i < tableRows.length; i++) {
        console.log(tableRows[i].innerText);
    }
}

//Helper sorting function

function sortTable2(z) {

    let table = document.getElementsByClassName("contactTable")[0];
    let tableRows = table.getElementsByTagName("tr");

    if (last == z) {
        asc = !asc;
    }

    else {
        asc = true;
    }

    last = z;

    for (let i = 1; i < tableRows.length - 2; i++) {
        console.log(i);
        for (let j = i + 1; j < tableRows.length - 1; j++) {
            console.log(j);
            let a = tableRows[i].innerText.split("\t");
            let b = tableRows[j].innerText.split("\t");
            if ((asc && a[z].toLowerCase() > b[z].toLowerCase()) || (!asc && a[z].toLowerCase() < b[z].toLowerCase())) {
                let c = tableRows[i].innerHTML;
                tableRows[i].innerHTML = tableRows[j].innerHTML;
                tableRows[j].innerHTML = c;
            }
        }
    }

    for (let i = 0; i < tableRows.length; i++) {
        console.log(tableRows[i].innerText);
    }

}

// Reset request

$("#resetButton").click(function (e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://wt.ops.labs.vu.nl/api22/f43c7ea1/reset",
        success: function () {
            console.log("database reset");
        },
        error: function () {
            console.log("database not reset due to an error");
        }
    })
    fetchProducts();
})

clickFunction();

//Function for displaying the entire database in a table, clearing teh previous table and clearing the input fields

function fetchProducts() {
    $.get("https://wt.ops.labs.vu.nl/api22/f43c7ea1", function (data, status) {

        $(".addedRow").remove();

        data.forEach(function (data) {

            $(".listTemplate").after(

                "<tr class='addedRow'>" +
                "<td>" + data.brand + "</td>" +
                "<td>" + data.model + "</td>" +
                "<td>" + data.os + "</td>" +
                "<td>" + data.screensize + "</td>" +
                "<td><img class='tableImg' src='" + data.image + "' /></td>" +
                "</tr>"
            );
        })

        $('#brand').val('');
        $('#model').val('');
        $('#os').val('');
        $('#image').val('');
        $('#screensize').val('');
    })
}

$(document).ready(fetchProducts);

//a post request for submitting the form and displaying the updated database in the table

$(function () {
    $(".productsForm").submit(function (e) {
        var payload = {
            brand: $("#brand").val(),
            model: $("#model").val(),
            os: $("#os").val(),
            image: $("#image").val(),
            screensize: $("#screensize").val(),
        };

        console.log(payload);

        $.ajax({
            method: "POST",
            url: "https://wt.ops.labs.vu.nl/api22/f43c7ea1",
            data: payload,
            success: function () {
                console.log("the data has been posted");
            },
            error: function () {
                console.log("data not posted due to an error");
            }
        })
        e.preventDefault();
        fetchProducts();
    });
});