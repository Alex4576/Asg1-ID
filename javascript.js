/* Navigation Bar */
function navigate() {
    var x = document.getElementById("links");
    if (x.style.display === "block"){x.style.display = "none";}
    else {x.style.display = "block";}
}

/* Product Gallery */
const cartIcon = document.querySelector("#cartIcon i");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cartClose");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".addCart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".productBox");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cartContent");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".productTitle").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cartProductTitle");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("Item has already been added into your cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cartBox");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cartImg">
        <div class="cartDetail">
            <h2 class="cartProductTitle">${productTitle}</h2>
            <span class="cartPrice">${productPrice}</span>
            <div class="cartQuantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-6-line cartRemove"></i>
    `;
    
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cartRemove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cartQuantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1){
                decrementButton.style.color = "#c18effff";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#ffffffff";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".totalPrice");
    const cartBoxes = cartContent.querySelectorAll(".cartBox");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cartPrice");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".itemCount");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".buyBtn");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cartBox");
    if (cartBoxes.length === 0) {
        alert("Cart is empty, unable to checkout.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();
    alert("Items purchased.");
})

/* Automatic Image Carousel */
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2500);
}

/* Form Submit Button */
function myFunction() {
    alert("Form Submitted");
}