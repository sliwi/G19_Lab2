
contentDiv = document.getElementById("content-container");
clientBtn = document.getElementById('clientBtn');
productsBtn = document.getElementById('productsBtn');
cartBtn = document.getElementById('cartBtn');

clientBtn.addEventListener("click",clientClick);
productsBtn.addEventListener("click",productsClick);
cartBtn.addEventListener("click",cartClick);

const category = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
    organic: false,
    nonOrganic: false
}

let productList = [
    {
        name: "Carrot",
        price: 1.1,
        vegan: true,
        vegetarian: true
    },
    {
        name: "Eggs",
        price: 2.5,
        vegetarian: true
    },
    {
        name: "Apple",
        price: 3.8,
        vegan: true,
        vegetarian: true,
        nonOrganic: true
    },
    {
        name: "Organic Apple",
        price: 5.0,
        organic: true,
    },
    {
        name: "Tomato",
        price: 3.0,
        organic: true,
    },
    {
        name: "Banana",
        price: 2.2,
        vegetarian: true,
        vegan: true
    },
    {
        name: "Zucchini",
        price: 6.6,
        glutenFree: true,
        vegetarian: true,
        vegan: true
    },
    {
        name: "Sweet Potatoes",
        price: 1.2,
        glutenFree: true,
        lactoseFree: true
    },
    {
        name: "Broccoli",
        price: 2.4,
        vegan: true,
        vegetarian: true
    },
    {
        name: "Cheese",
        price: 8.8,
        glutenFree: true
    },
    {
        name: "Bread",
        price: 1.5,
        glutenFree: false
    },
    {
        name: "Whole Wheat Bread",
        price: 1.8,
        glutenFree: true
    },
    {
        name: "Walnuts",
        price: 3.8,
        lactoseFree: true,
        vegan: true
    },
    {
        name: 'Ham',
        price: 5.5,
        vegan: false,
        vegetarian:false
    },
    {
        name: 'Milk',
        price: 3.5,
        lactoseFree:false,
        vegetarian: true
    },
    {
        name: 'Lactose-Free Milk',
        price: 3.5,
        lactoseFree:true,
        vegetarian: true
    }
]

var cart = [
    
]

function clientClick(){    
    //clear the content div first
    contentDiv.innerHTML = ""
    
    contentDiv.innerHTML = `<h3>Client Information</h3>
    <p>Choose a category.</p>
    <label>Category</label>
    <select id="categorySelect">
        <option value="noPreference">No Preference</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
    </select>
    <br>
    <p>Select Product Preference</p>
    <input type="checkbox" id="glutenCheckbox" name="GlutenFree" value="glutenFree">
    <label for="GlutenFree">Gluten Free</label><br>
    <input type="checkbox" id="lactoseCheckbox" name="LactoseFree" value="lactoseFree">
    <label for="LactoseFree">Lactose Free</label><br>
    <input type="checkbox" id="organicCheckbox" name="Organic" value="organic">
    <label for="Organic">Organic</label><br>
    <input type="checkbox" id="nonOrganicCheckbox" name="NonOrganic" value="nonOrganic">
    <label for="NonOrganic">Non-Organic</label><br>
    `

    //reset category to default values
    for(let elem in category){
        category[elem] = false;
    }

    //get the select and add an event listenr to listen for change
    selectCategory = document.getElementById("categorySelect");

    //get the value of the checkboxes
    glutenCheckbox = document.getElementById("glutenCheckbox");
    lactoseCheckbox = document.getElementById("lactoseCheckbox");
    organicCheckbox = document.getElementById("organicCheckbox");
    nonOrganicCheckbox = document.getElementById("nonOrganicCheckbox");

    //listen for change in select
    selectCategory.addEventListener('change', () => {
        if(selectCategory.value != "noPreference"){
            category[selectCategory.value] = true;
        }
    });

    //listen for change in checkboxes
    glutenCheckbox.addEventListener('change',()=>{
        category[glutenCheckbox.value] = glutenCheckbox.checked
    });
    
    lactoseCheckbox.addEventListener('change',()=>{
        category[lactoseCheckbox.value] = lactoseCheckbox.checked
    });

    organicCheckbox.addEventListener('change',()=>{
        category[organicCheckbox.value] = organicCheckbox.checked
    });

    nonOrganicCheckbox.addEventListener('change',()=>{
        category[nonOrganicCheckbox.value] = nonOrganicCheckbox.checked
    });
}

function productsClick(){
    console.log(category)

    let a = ""
    cart.forEach(item => {
        a += item.name + ", "
    });

    contentDiv.innerHTML = ""
    contentDiv.innerHTML = `<h3>Products Tab info</h3><br><h4>Current Cart: ${a}</h4>`

    let filtered = false
    for(var i = 0; i < Object.entries(category).length; i++){
        if (Object.entries(category)[i][1] === true) {
            filtered = true;
        }
    }

    let filteredList = []
    let addToCart = [] 

    if (filtered === true) {
    filteredList = productList.filter(function(item) {
        console.log(item)
        for (var key in category) {
          if (item[key] == category[key])
            return true;
        }
        return false;
      });
    } else {
        filteredList = productList
    }

    filteredList = filteredList.sort(function(itemA,itemB) { return itemA.price - itemB.price})

    for(let product of filteredList){

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "product";
        checkbox.value = product.name;
        contentDiv.appendChild(checkbox);

        var label = document.createElement('label')
        label.appendChild(document.createTextNode(product.name + ", $" + product.price.toFixed(2)));
        contentDiv.appendChild(label);

        addToCart.push(checkbox);
        
        contentDiv.appendChild(document.createElement("br"));
    }

    var add = document.createElement("BUTTON");
    add.onclick = function() {selectedItems(addToCart, filteredList)};
    add.textContent = "Add selected items to cart";
    contentDiv.appendChild(add); 
    
}

function selectedItems(addToCart, filteredList){

    if (cart.length >0) { cart = []; }

    for (let i = 0; i < addToCart.length; i++) {
        if (addToCart[i].checked){
            cart.push(filteredList[i])
        }
    }
    console.log(cart)
    productsClick()
}


function cartClick(){
    console.log(cart)
    contentDiv.innerHTML = `<h3> Cart information </h3>
                            <h5> You have selected the items below: </h5>`
    var totalPrice = 0;
      
    var cartList = document.createElement("div");
    contentDiv.appendChild(cartList);

    contentDiv.innerHTML+= 
    `<table id="SelectedItems">
        <thead> 
            <tr>
                <th> Product Name </th>
                <th> Product Price (CAD) </th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </table>`

    var productTable = document.getElementById("SelectedItems").getElementsByTagName('tbody')[0];
    
    for (let i=0; i<cart.length; i++) {
        var newRow = productTable.insertRow(productTable.rows.length);
        var productName = newRow.insertCell(0);
        productName.innerHTML = cart[i].name;
        var productPrice = newRow.insertCell(1);
        productPrice.innerHTML = cart[i].price.toFixed(2);

        totalPrice += cart[i].price;
        
    }

    var totalPriceInfo = document.createElement("p");
    totalPriceInfo.innerHTML = "<h5> The total price is: " + totalPrice.toFixed(2) + "</h5>";
    contentDiv.appendChild(totalPriceInfo);
    
}



