"use strict";

const productList = document.querySelector(".product-list");
let productInSession=false
let index=0
//let returnDiv="";
let imgSrcs=new Array();
let prodPrices=new Array();
let qtyIndex


function loadJson() {
  fetch("data/products.json")
    .then((responce) => responce.json())
    .then((data) => {
      const categories = document.querySelector(".filters");
      let item = "";
      data.forEach((element) => {
        if (element.filter_name == "All categories") {
          element.products.forEach((element) => {
            item += productView(element);
          });
        }
        categories.innerHTML += categoryView(element);
      });
      productList.innerHTML = item;
    })
    .catch((error) => {
      alert(error);
    });
}
loadJson();

function categoryView(category) {
  return `
  <button type="button" class="filter-option" onclick="categoryFilter(${category.filter_id})">${category.filter_name}</button>
  `;
}

function productView(product) {
  return `
  <div class="col-3 product-item" data="${product.id}">
     <div class="product-img-box">
       <img src="${product.imgSrc}" alt="product image" class="product-img" />
       <div class="overlay">
         <a class="overlay-link" href="product.html?id=${product.id}">
           <img src="images/arrow.png" alt="arrow" class="arrow-img" />
         </a>
         <div class="overlay-info">
           <p>Design | Branding</p>
           <h2>Creative Web Design</h2>
         </div>
       </div>
       <p class="num-box"></p>
     </div>
     <hr />
     <div class="product-content">
       <p class="product-price">${product.price}</p>
       <button type="button" class="btn btn-add-cart" onclick="addToCart('${product.name}',${product.price},'${product.imgSrc}')"><span class="add-btn">+</span>&nbsp;Cart</button>
     </div>
 </div>
  `;
}

function addToCart(proName,proPrice,proImgSrc)
	
{
	
	
	let returnDiv
	
	qtyIndex="i"+index
	imgSrcs.push(proImgSrc)
	prodPrices.push(proPrice)
	
	
	
	if(!productInSession)
	{
		
		productInSession=true
	    returnDiv=`<div id='flex-container'>
		           <div id="cart${index}">
		             
		             <label>Product-name:</label><span style="margin-left:50px;">${proName}</span><br>
		             <label>Quantity:</label><input type="number" style="text-align:center;margin-left:50px;"  id="${qtyIndex}"></span><br>
		             <label>Product-price:</label><span style="margin-left:70px">€${proPrice}</span>
		            </div>
		            <button type='button' class="btn btn-add-cart" id="cartButton">Check-Out</button></div>`
	
	
	
     document.getElementById("cartBox").innerHTML=returnDiv
     
    }
	else
	{
		returnDiv=document.getElementById("cartBox")
		let oldContainer=document.getElementById("flex-container")
		
		let newCart=document.createElement("div")
		
		newCart.id="cart"+index
		
		let productLabel=document.createElement("label")
		let labelText=document.createTextNode("Product-name:")
		
		productLabel.appendChild(labelText)
		
		newCart.appendChild(productLabel)
		
		
		let productNameSpan=document.createElement("span")
		let productName=document.createTextNode(proName)
		productNameSpan.appendChild(productName)
		productNameSpan.style.marginLeft="50px"
		
	    newCart.appendChild(productNameSpan)
	    
	    
	    newCart.appendChild(document.createElement("br") )
		
		let quantityLabel=document.createElement("label")
		let quantityText=document.createTextNode("Quantity:")
		
		quantityLabel.appendChild(quantityText)
		
		newCart.appendChild(quantityLabel)
		
		
		let quantityInput=document.createElement("input")
		quantityInput.type="number"
		quantityInput.id=qtyIndex
		quantityInput.style.textAlign="center"
		quantityInput.style.marginLeft="50px"
		
		
		newCart.appendChild(quantityInput)
		newCart.appendChild(document.createElement("br") )
		
		let productPriceLabel=document.createElement("label")
		let productPriceText=document.createTextNode("Product-price:")
		productPriceLabel.appendChild(productPriceText)
		
		newCart.appendChild(productPriceLabel)
		let productPriceSpan=document.createElement("span")
		productPriceSpan.style.marginLeft="70px"
		let productPriceValue=document.createTextNode("€"+proPrice)
		
		productPriceSpan.appendChild(productPriceValue)
		
		newCart.appendChild(productPriceSpan)
		newCart.appendChild(document.createElement("br"))
		
		
		let checkOutButton=document.getElementById("cartButton")
		oldContainer.insertBefore(newCart,checkOutButton)
		
		
		
		document.getElementById("cartBox").innerHTML=returnDiv.innerHTML
		
	}
	
	
	let checkOutButton2=document.getElementById("cartButton")
	checkOutButton2.addEventListener("click",function(){
			checkOut(imgSrcs,prodPrices)
		})
	
	index++
	
}


function checkOut(imgs,prodPrices)
{
	
	
	let qty=new Array()
	
	for(let n=0;n<imgs.length;n++)
	{
		if(document.getElementById("i"+n).value != ""){
		
		qty.push(document.getElementById("i"+n).value)
		}else{
			qty.push(1)
		}
		
	}
	
	document.write("<link rel='stylesheet' href='css/reset.css' />")
    document.write("<link rel='stylesheet' href='css/layout.css' />")
    document.write("<link rel='stylesheet' href='css/style.css' />")
    
    
	document.write(`<div id="cursor"></div><div class='container'><nav><div class="row">
          <div class="col-6">
            <div class="navbar-left">
              <h1>
                <a href="#">Mate<span>Store</span></a>
              </h1>
              <p class="navbar-p">Our Best Shopping Center</p>
            </div>
          </div>
          </div></nav></div>`)
    cursorAnimate()
    document.write(`<div class='container'><div class="row"><div class="col-12">`)
    let table=`<table><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>`
    let total=0
     
    
    
	 for(let k=0;k<imgs.length;k++)
	 {
	 
	 let imgSrcName=imgs[k]
	 let prodPrice=Number(prodPrices[k])
	 
	 let tot=prodPrice*qty[k]
	 total+=tot
	 table+=`<tr><td><img src="${imgSrcName}" height="50px" style="object-fit:contain;"></td><td>${qty[k]}</td><td>€${prodPrice}</td><td>€${tot}</td></tr>`
	 
    }
    total=total.toFixed(2)
    table+=`<tr><td colspan="3">Grand Total</td><td>€${total}</td></tr></table>`
    
    document.write(table)
	
	document.write("</div></div></div>")
	}

function cursorAnimate()
{
	const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", changeCursor);

function changeCursor(e) {
  const x = e.pageX;
  const y = e.pageY;

  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
}

}	
	



function categoryFilter(id) {
  fetch("data/products.json")
    .then((responce) => responce.json())
    .then((data) => {
      const buttons = document.querySelectorAll(".filter-option");
      buttons.forEach((button) => {
        button.style.color = "var(--secondary-color)";
      });
      buttons[id - 1].style.color = "var(--red-color)";

      const products = document.querySelector(".product-list");
      products.innerHTML = "";
      for (const category of data) {
        if (category.filter_id == id) {
          category.products.forEach((element) => {
            products.innerHTML += productView(element);
          });
        }
   
     }
    })
    .catch((error) => {
      alert(error);
    });
}

// loader
function removeLoader() {
  $("#loadingDiv").fadeOut(500, () => {
    $("#loadingDiv").remove();
  });
}

$(window).on("load", () => {
  setTimeout(removeLoader, 2000);

  $("body").css(
    "overflow-y",
    "hidden",
    setTimeout(() => {
      $("body").css("overflow-y", "visible");
    }, 2000)
  );
});
