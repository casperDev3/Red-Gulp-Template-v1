const order = {
  main_products: [],
  additional_products: [],
  total_price: 0,
  name_of_client: "",
  phone_of_client: "",
  address_of_client: "",
  comment_of_client: "",
  delivery_type: "",
  payment_type: "",
};

const products = [
  {
    id: 1,
    name: "Картошка",
    price: 10,
  },
  {
    id: 2,
    name: "Морковь",
    price: 20,
  },
];

const additionalProducts = [
  {
    id: 1,
    name: "Вода",
    price: 10,
  },
  {
    id: 2,
    name: "Сік",
    price: 20,
  },
];

class Products {
  constructor(products) {
    this.products = products;
  }
  drawPizzaOnPage(array, selecor) {
    let html = ``;
    array.forEach((product) => {
      html += `
        <div class="product">
          <div class="product__name">${product.name}</div>
          <div class="product__price">${product.price}</div>
          <button data-mainId="${product.id}" class="product__add-to-cart">Add to cart</button>
          <button data-mainId="${product.id}" class="product__delete-from-cart">Delete from cart</button>
        </div>
      `;
    });
    document.querySelector(selecor).innerHTML = html;
  }
}

class Cart {
  constructor(main_products, additional_products) {
    this.main_products = main_products;
    this.additional_products = additional_products;
  }
  addMainProduct(product) {
    this.main_products.push(product);
    // get order from local storage
    let order = JSON.parse(localStorage.getItem("order"));
    // check if product is already in order
    let isProductInOrder = order.main_products.some(
      (item) => item.id === product.id
    );
    // if product is in order, increase quantity
    if (isProductInOrder) {
      product.quantity++;
      order.main_products = order.main_products.map((item) => {
        if (item.id === product.id) {
          return product;
        } else {
          return item;
        }
      });
    } else {
      product.quantity = 1;
      order.main_products.push(product);
    }
    // save order to local storage
    localStorage.setItem("order", JSON.stringify(order));
  }
  addAdditionalProduct(product) {
    this.additional_products.push(product);
  }
  removeMainProduct(product) {
    // filter if product is not equal to product
    this.main_products = this.main_products.filter(
      (item) => item.id !== product.id
    );
    // get order from local storage
    let order = JSON.parse(localStorage.getItem("order"));
    // remove product from order
    order.main_products = this.main_products;
    // save order to local storage
    localStorage.setItem("order", JSON.stringify(order));
  }
  removeAdditionalProduct(product) {
    this.additional_products = this.additional_products.filter(
      (item) => item !== product
    );
  }
  clearCart() {
    this.main_products = [];
    this.additional_products = [];
  }
}

class LocalStorage {
  checkLocalStorage() {
    if (localStorage.getItem("order") === null) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }
  getMainProducts() {
    const order = JSON.parse(localStorage.getItem("order"));
    return order.main_products;
  }
  getAdditionalProducts() {
    const order = JSON.parse(localStorage.getItem("order"));
    return order.additional_products;
  }
}

// start point
document.addEventListener("DOMContentLoaded", () => {
  // 1. Init products
  const allPizza = new Products(products);
  const allAdditionals = new Products(additionalProducts);
  // 2. Init cart
  const localStorage = new LocalStorage();
  localStorage.checkLocalStorage();
  const cart = new Cart(
    localStorage.getMainProducts(),
    localStorage.getAdditionalProducts()
  );
  // 3. Draw products on page
  allPizza.drawPizzaOnPage(products, ".pizza");
  // 4. Add event listeners on add to cart buttons
  const ADD_BTNS = document.querySelectorAll(".product__add-to-cart");
  ADD_BTNS.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.mainid;
      const product = products.find((item) => item.id == id);
      cart.addMainProduct(product);
    });
  });
  // 5. Add event listeners on delete from cart buttons
  const DELETE_BTNS = document.querySelectorAll(".product__delete-from-cart");
  DELETE_BTNS.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.mainid;
      const product = products.find((item) => item.id == id);
      cart.removeMainProduct(product);
    });
  });
});

// check size screen
const checkSizeScreen = () => {
  if (window.innerWidth < 768) {
    // ...
  }
};
