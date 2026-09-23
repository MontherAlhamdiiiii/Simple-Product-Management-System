//Get Total
//Create
//Search By Title
//Search By Category
//Delete All

// Input Fields Start
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("tax");
let ads = document.getElementById("ad");
let discounts = document.getElementById("dis");
let total = document.getElementById("total");

let count = document.getElementById("count");
let category = document.getElementById("cat");
let search = document.getElementById("search");
// Input Fields End

// Buttons Start
let createBtn = document.getElementById("create");
let byTitleBtn = document.getElementById("byTitle");
let byCategoryBtn = document.getElementById("byCategory");
let deleteAll = document.getElementById("deleteAll");
// End

// Flag
let flag = "Create";
// Index
let updateIndex;

// Get Total Function
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discounts.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = "";
  }
}

let productsData;
if (window.localStorage.getItem("Products")) {
  productsData = JSON.parse(window.localStorage.getItem("Products"));
} else {
  productsData = [];
}

createBtn.onclick = function (e) {
  e.preventDefault();

  if (flag === "Create") {
    let newProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discounts: discounts.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        productsData.push(newProduct);
      }
    } else {
      productsData.push(newProduct);
    }
  } else {
    productsData[updateIndex].title = title.value;
    productsData[updateIndex].price = price.value;
    productsData[updateIndex].taxes = taxes.value;
    productsData[updateIndex].ads = ads.value;
    productsData[updateIndex].discounts = discounts.value;
    productsData[updateIndex].total = total.innerHTML;
    productsData[updateIndex].category = category.value;
    flag = "Create";
    createBtn.innerHTML = "Create";
    count.style.display = "block";
    total.style.backgroundColor = "red";
  }
  window.localStorage.setItem("Products", JSON.stringify(productsData));
  clearData();
  showData();
};

//Clear Data

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discounts.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
let table = document.querySelector("tbody");
// Reading Data
function showData() {
  let result = "";
  for (let i = 0; i < productsData.length; i++) {
    result += ` <tr>
              <td>${i + 1}</td>
              <td>${productsData[i].title || "N/A"}</td>
              <td>${productsData[i].price || 0}</td>
              <td>${productsData[i].price * productsData[i].count}</td>
              <td>${productsData[i].ads || "N/A"}</td>
              <td>${productsData[i].discounts || 0}</td>
              <td>${productsData[i].total || "N/A"}</td>
              <td>${productsData[i].category || "N/A"}</td>
              <td><button onclick ="updateData(${i})" id ="up">Update</button></td>
              <td><button onclick="deleteElement(${i})" id ="del">Delete</button></td>
            </tr>`;
  }
  table.innerHTML = result;
}

showData();
// Delete Functionality
function deleteElement(index) {
  productsData.splice(index, 1);
  window.localStorage.setItem("Products", JSON.stringify(productsData));
  showData();
}
// Delete All Function
deleteAll.onclick = function deleteAllFun(e) {
  e.preventDefault();
  productsData.length = 0;
  window.localStorage.setItem("Products", JSON.stringify(productsData));
  showData();
};

//Update Data Func
function updateData(index) {
  title.value = productsData[index].title;
  price.value = productsData[index].price;
  taxes.value = productsData[index].taxes;
  discounts.value = productsData[index].discounts;
  ads.value = productsData[index].ads;
  count.style.display = "none";
  category.value = productsData[index].category;
  getTotal();
  createBtn.innerHTML = "Update";
  flag = "Update";
  updateIndex = index;
}

//Search By Title
let searchMode = "title";

function getSearchMode(Mode) {
  if (Mode === "byTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }

  search.placeholder = "Search By " + searchMode;
  search.focus();
  search.value = "";
  showData();
}

//Search Data

function searchData(value) {
  let result = "";

  for (let i = 0; i < productsData.length; i++) {
    if (searchMode == "title") {
      if (productsData[i].title.includes(value.toLowerCase())) {
        result += ` <tr>
              <td>${i + 1}</td>
              <td>${productsData[i].title || "N/A"}</td>
              <td>${productsData[i].price || 0}</td>
              <td>${productsData[i].price * productsData[i].count}</td>
              <td>${productsData[i].ads || "N/A"}</td>
              <td>${productsData[i].discounts || 0}</td>
              <td>${productsData[i].total || "N/A"}</td>
              <td>${productsData[i].category || "N/A"}</td>
              <td><button onclick ="updateData(${i})" id ="up">Update</button></td>
              <td><button onclick="deleteElement(${i})" id ="del">Delete</button></td>
            </tr>`;
      }
    } else {
      if (productsData[i].category.includes(value.toLowerCase())) {
        result += ` <tr>
              <td>${i + 1}</td>
              <td>${productsData[i].title || "N/A"}</td>
              <td>${productsData[i].price || 0}</td>
              <td>${productsData[i].price * productsData[i].count}</td>
              <td>${productsData[i].ads || "N/A"}</td>
              <td>${productsData[i].discounts || 0}</td>
              <td>${productsData[i].total || "N/A"}</td>
              <td>${productsData[i].category || "N/A"}</td>
              <td><button onclick ="updateData(${i})" id ="up">Update</button></td>
              <td><button onclick="deleteElement(${i})" id ="del">Delete</button></td>
            </tr>`;
      }
    }
  }

  table.innerHTML = result;
}
