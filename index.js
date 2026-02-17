// ===============================
// Load All Categories
// ===============================
const loadCategory = () => {
  const url = "https://fakestoreapi.com/products/categories";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data))
    .catch((error) => console.log("Category Error:", error));
};

// ===============================
// Load All Products
// ===============================
const loadAllProducts = () => {
  const url = "https://fakestoreapi.com/products";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProducts(data))
    .catch((error) => console.log("Product Error:", error));
};

// ===============================
// Load Single Category Products
// ===============================
const loadSingleCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProducts(data))
    .catch((error) => console.log("Single Category Error:", error));
};

// ===============================
// Load Single Products details
// ===============================
const loadProductDetails = async (id) =>{
    const url = `https://fakestoreapi.com/products/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayProductDetails(details) 
}
const displayProductDetails = (product) => {
    console.log(product);

    const detailsBox = document.getElementById('details-container');

    if (!detailsBox) {
        console.error("details-container not found in HTML");
        return;
    }

    detailsBox.innerHTML = `
        <img src="${product.image}" width="250"/>
        <p class="text-sm text-gray-500 mt-6">${product.description}</p>
    `;
    document.getElementById('product_modal').showModal();
};



// ===============================
// Display Products
// ===============================
const displayProducts = (products) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  products.forEach((product) => {
    const {id, category, title, image, price, rating } = product;

    const productCard = document.createElement("div");
    productCard.className = "p-4";

    productCard.innerHTML = `
      <div class="card bg-white shadow-sm hover:shadow-lg transition rounded-xl h-full">
        
        <figure class="p-6 bg-gray-100 rounded-t-xl">
          <img src="${image}" class="h-32 object-contain mx-auto" />
        </figure>

        <div class="card-body p-5">
          
          <span class="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full w-fit">
            ${category}
          </span>

          <h2 class="font-semibold text-sm mt-2 leading-snug">
            ${title}
          </h2>

          <div class="flex items-center text-sm mt-2">
            <span class="text-yellow-500">★</span>
            <span class="ml-1 font-medium">${rating?.rate || 0}</span>
            <span class="text-gray-400 ml-1">(${rating?.count || 0})</span>
          </div>

          <p class="font-bold text-lg mt-2">$ ${price}</p>

          <div class="flex justify-between mt-4">
            <button onclick="loadProductDetails(${id})" class="btn btn-sm btn-outline px-4">Details</button>
            <button class="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none px-5">
              Add
            </button>
          </div>

        </div>
      </div>
    `;

    cardContainer.appendChild(productCard);
  });
};

// ===============================
// Display Category Buttons
// ===============================
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  // 🔹 Add ALL button manually
  const allBtn = document.createElement("button");
  allBtn.className = "btn btn-outline btn-sm rounded-full px-6";
  allBtn.innerText = "All";
  allBtn.onclick = loadAllProducts;
  categoryContainer.appendChild(allBtn);

  // 🔹 Add dynamic category buttons
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline btn-sm rounded-full px-6";
    btn.innerText = category;
    btn.onclick = () => loadSingleCategory(category);
    categoryContainer.appendChild(btn);
  });
};

// ===============================
// Initial Load
// ===============================
loadCategory();
loadAllProducts();
