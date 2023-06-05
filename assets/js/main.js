let crud = document.getElementById('crud');

function getMeals() {
    var meals = localStorage.getItem('meals');  
    if (meals) {
        return JSON.parse(meals);
    }
    return {};
}

function saveMeals(meals) {
    localStorage.setItem('meals',JSON.stringify(meals));
}

// open & close
document.getElementById('closeCart').onclick = function () {
    crud.style.display = 'none'
}

document.getElementById('openCart').onclick = function () {
    crud.style.display = 'inline'
}
// plus & minus 

let Qplus = document.querySelectorAll('.Qplus');
for (let i = 0; i < Qplus.length; i++) {
    Qplus[i].onclick = function (e) {
        e.preventDefault();
        var parentLi = Qplus[i].closest('li');
        var quantityElement = parentLi.querySelector('.quantity');
        if (quantityElement.value < 10) {
            quantityElement.value++;
        }
        
    }
}

let Qminus = document.getElementsByClassName('Qminus');
for (let i = 0; i < Qminus.length; i++) {
    Qminus[i].onclick = function (e) {
        e.preventDefault();
        var parentLi = Qminus[i].closest('li');
        var quantityElement = parentLi.querySelector('.quantity');
        if (quantityElement.value > 1) {
            quantityElement.value--;
        }
    }
}

// All Price

function calculateTotal() {
    var cartTotal = 0;
    var meals = getMeals();
    let mealNames = Object.keys(meals);
    for (let i = 0; i < mealNames.length; i++) {
        var mealName = mealNames[i];
        var meal = meals[mealName];
        cartTotal += meal.quantity * parseInt(meal.productPrice.substring(1));
    }
    document.getElementById('priceAll').innerHTML = '$' + cartTotal;
}


// Display Data

function refreshCart() {
    var meals = getMeals();
    let mealNames = Object.keys(meals);
    var ulElement = document.createElement('ul');
    for (let i = 0; i < mealNames.length; i++) {
        var mealName = mealNames[i];
        var liElement = document.createElement('li');
        liElement.classList.add('d-flex');
        liElement.classList.add('mt-4');
        liElement.innerHTML = `
        <div>
        <button class="deleteMeal close-img"><i class="fa-regular fa-circle-xmark"></i></button>
        <img class="imgMeal" src="${meals[mealName].productImg}" alt="photo meat meal"/>
        </div>
        <div class="ms-3 mt-2">
        <h3 class="nameMeal">${mealName}</h3>
        <p class="priceMeal">${meals[mealName].quantity} x ${meals[mealName].productPrice}</p>
        </div>
    `;
        ulElement.appendChild(liElement);
    }
    crud.querySelector('ul').innerHTML = ulElement.innerHTML;
    crud.querySelectorAll('.deleteMeal').forEach(function (deleteBtn) {
        deleteBtn.onclick = function (e) {
            let parentLi = e.target.closest('li');
            let mealName = parentLi.querySelector('.nameMeal').innerHTML;
            parentLi.remove();
            var meals = getMeals();
            delete meals[mealName];
            saveMeals(meals);
            calculateTotal();
        };
    });
    calculateTotal();
}

// add cart
let addCart = document.getElementsByClassName('addCart');
for (let i = 0; i < addCart.length; i++) {
    addCart[i].onclick = function () {
        var meals = getMeals();
        var parentLi = addCart[i].closest('li');
        var productName = parentLi.querySelector('.productName').innerHTML;
        if (meals[productName]) {
            meals[productName].quantity += parseInt(parentLi.querySelector('.quantity').value);
        } else {
            meals[productName] = {
                productImg: parentLi.querySelector('.productImg').src,
                productPrice: parentLi.querySelector('.productPrice').innerHTML,
                quantity: parseInt(parentLi.querySelector('.quantity').value)
            };
        }
        saveMeals(meals);
        parentLi.querySelector('.quantity').value = '1';
        refreshCart();
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
        crud.style.display = 'inline';
    }
   
}
// 



// loading
document.body.style.overflow = 'hidden';
window.addEventListener('load', function () {
    refreshCart();
    setTimeout(function () {
        let preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0'
        preloader.style.visibility = 'hidden'
        preloader.style.transform = 'scaleY(0.1)'
        preloader.style.transition = '1s'
        document.body.style.overflow = 'auto'

    }, 1000);
    let slideNum = 0;
    setInterval(function () {
        slideNum++;
        if (slideNum === 3) {
            slideNum = 0;
        }
        let carouselButtons = document.querySelectorAll('#carouselExampleIndicators2 .carousel-indicators button');
        carouselButtons[slideNum].click();
    }, 3000);

    let slideNumb = 0;
    setInterval(function () {
        slideNumb++;
        if (slideNumb === 3) {
            slideNumb = 0;
        }
        let carouselButtons = document.querySelectorAll('#carouselExampleIndicators3 .carousel-indicators button');
        carouselButtons[slideNumb].click();
    }, 3000);
})


// scroll
let scrollToTop = document.querySelector('.scrollToTop');


scrollToTop.style.opacity = '0';
scrollToTop.addEventListener('click', function () {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
})

let seeMenus = document.querySelector('.see-menus');
window.addEventListener('scroll', function () {
    if (this.window.scrollY > seeMenus.offsetTop) {
        scrollToTop.style.opacity = '1'
    }
    if (this.window.scrollY < seeMenus.offsetTop) {
        scrollToTop.style.opacity = '0'
    }
})

