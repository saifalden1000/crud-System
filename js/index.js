var ProductName = document.querySelector("#ProductName");
var ProductPrice = document.querySelector("#ProductPrice");
var ProductCategory = document.querySelector("#ProductCategory");
var ProductDesc = document.querySelector("#ProductDesc");
var ProductImg = document.querySelector("#ProductImg");
var addProduct = document.querySelector("#addProduct");
var updateProduct = document.getElementById("updateProduct");
var searchInput = document.querySelector("#searchProduct");
var productArray = [];
var UpdateIndex;
var regex = {
  ProductName: /.{5,10}/,
  ProductPrice: /^([1-9][0-9]{0,3}|10000)$/,
  ProductDesc: /.{10,100}/,
  ProductCategory: /(TV|Mobile|Laptop|Screens|Others)/i,
};
// showing products from storage on load
if (localStorage.getItem("productArray") != null) {
  productArray = JSON.parse(localStorage.getItem("productArray"));
  displayProducts(productArray);
}
// add product
addProduct.addEventListener("click", function () {
  if (validateAllInputs()) {
    var product = {
      name: ProductName.value,
      price: ProductPrice.value,
      category: ProductCategory.value,
      desc: ProductDesc.value,
      image: `../images/${ProductImg.files[0]?.name}`,
      id: productArray.length,
    };
    productArray.push(product);
    idSetting();
    updateStorage();
    displayProducts(productArray);
    updateInputValue();
  }
});
//  display products to the user
function displayProducts(list) {
  var display = ``;
  for (var i = 0; i < list.length; i++) {
    display += ` <div class="col-md-6 col-lg-4">
          <div class="item bg-light rounded-2 overflow-hidden">
            <img class="w-100 mb-3" src="${list[i].image}" alt="" />
            <div class="p-3">
              <h2 class="h4">title: ${list[i].name}</h2>
              <p class="h5">desc: ${list[i].desc}</p>
              <h3 class="h6">price: ${list[i].price}</h3>
              <h3 class="h6 mb-3">Category: ${list[i].category}</h3>
               <button onclick="getDataToUpdate(${list[i].id})" class="btn btn-warning w-100 mb-2">Update</button>
             <button onclick="deleteProduct(${list[i].id})" class="btn btn-danger w-100">Delete</button>
            </div>
          </div>
        </div>`;
  }
  document.querySelector("#productItems").innerHTML = display;
}
// deletes product
function deleteProduct(index) {
  productArray.splice(index, 1);
  idSetting();
  updateStorage();
  displayProducts(productArray);
}
//clears of fill in the inputs
function updateInputValue(config) {
  ProductName.value = config ? config.name : null;
  ProductPrice.value = config ? config.price : null;
  ProductCategory.value = config ? config.category : null;
  ProductDesc.value = config ? config.desc : null;
}
// filling the inputs with the product data to update it
function getDataToUpdate(index) {
  updateInputValue(productArray[index]);
  UpdateIndex = index;
  addProduct.classList.toggle("d-none");
  updateProduct.classList.toggle("d-none");
}

// ========== update the product info
updateProduct.addEventListener("click", function () {
  if (validateAllInputs()) {
    productArray[UpdateIndex].name = ProductName.value;
    productArray[UpdateIndex].price = ProductPrice.value;
    productArray[UpdateIndex].category = ProductCategory.value;
    productArray[UpdateIndex].desc = ProductDesc.value;
    productArray[UpdateIndex].image = `../images/${ProductImg.files[0]?.name}`;
    updateStorage();
    displayProducts(productArray);
    addProduct.classList.toggle("d-none");
    updateProduct.classList.toggle("d-none");
    updateInputValue();
  }
});
// saving data to storage
function updateStorage() {
  localStorage.setItem("productArray", JSON.stringify(productArray));
}
// search function with adding event listenr to the search input
searchInput.addEventListener("input", function () {
  var searchedList = [];
  for (var i = 0; i < productArray.length; i++) {
    if (
      productArray[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      searchedList.push(productArray[i]);
    }
  }
  displayProducts(searchedList);
});
// ==== setting id for the products to be able to locate it for delete and update
function idSetting() {
  for (var i = 0; i < productArray.length; i++) {
    productArray[i].id = i;
  }
}
// ====== adding event listener to the inputs
var inputs = document.querySelectorAll(".input-field");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    validateProduct(e.target);
  });
}
// ======= validation function
function validateProduct(config) {
  if (regex[config.id].test(config.value) == true) {
    config.classList.add("is-valid");
    config.classList.remove("is-invalid");
    return true;
  } else {
    config.classList.remove("is-valid");
    config.classList.add("is-invalid");
    return false;
  }
}

function validateAllInputs() {
  var item1 = validateProduct(ProductName);
  var item2 = validateProduct(ProductPrice);
  var item3 = validateProduct(ProductCategory);
  var item4 = validateProduct(ProductDesc);
  if (item1 == true && item2 == true && item3 == true && item4 == true) {
    return true;
  } else {
    return false;
  }
}
