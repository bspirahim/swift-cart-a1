// ======================================
// Reusable Fetch Function
// ======================================
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response failed");
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};

// ======================================
// Load Categories
// ======================================
const loadCategory = async () => {
  const data = await fetchData("https://fakestoreapi.com/products/categories");
  if (data) displayCategory(data);
};

// ======================================
// Load All Products
// ======================================
const loadAllProducts = async () => {
  const data = await fetchData("https://fakestoreapi.com/products");
  if (data) displayProducts(data);
};

// ======================================
// Load Top Rated Products
// ======================================
const loadTopRatedProducts = async () => {
  const data = await fetchData("https://fakestoreapi.com/products");
  if (data) displayTopRated(data);
};

// ======================================
// Load Single Category
// ======================================
const loadSingleCategory = async (category) => {
  const data = await fetchData(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  if (data) displayProducts(data);
};

// ======================================
// Load Product Details
// ======================================
const loadProductDetails = async (id) => {
  const data = await fetchData(`https://fakestoreapi.com/products/${id}`);
  if (data) displayProductDetails(data);
};

const displayProductDetails = (product) => {
  const detailsBox = document.getElementById("details-container");
  if (!detailsBox) return;

  detailsBox.innerHTML = `
    <img src="${product.image}" width="250"/>
    <p class="text-sm text-gray-500 mt-6">${product.description}</p>
  `;

  const modal = document.getElementById("product_modal");
  if (modal) modal.showModal();
};

// ======================================
// Display Products
// ======================================
const displayProducts = (products) => {
  const cardContainer = document.getElementById("card-container");
  if (!cardContainer) return;

  cardContainer.innerHTML = "";

  products.forEach((product) => {
    const { id, category, title, image, price, rating } = product;

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

          <p class="font-bold text-lg mt-2">$ ${price.toFixed(2)}</p>

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

// ======================================
// Display Top Rated Products
// ======================================
const displayTopRated = (products) => {
  const container = document.getElementById("top-rated-container");
  if (!container) return;

  container.innerHTML = "";

  const topProducts = [...products]
    .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    .slice(0, 3);

  topProducts.forEach((product) => {
    const { id, category, title, image, price, rating } = product;
    const card = document.createElement("div");
    card.className = "p-4";

    card.innerHTML = `
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

          <p class="font-bold text-lg mt-2">$ ${price.toFixed(2)}</p>

          <div class="flex justify-between mt-4">
            <button onclick="loadProductDetails(${id})" class="btn btn-sm btn-outline px-4">Details</button>
            <button class="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none px-5">
              Add
            </button>
          </div>

        </div>
      </div>
    `;

    container.appendChild(card);
  });
};

// ======================================
// Display Categories
// ======================================
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  if (!categoryContainer) return;

  categoryContainer.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "btn btn-outline btn-sm rounded-full px-6";
  allBtn.innerText = "All";
  allBtn.onclick = loadAllProducts;
  categoryContainer.appendChild(allBtn);

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline btn-sm rounded-full px-6";
    btn.innerText = category;
    btn.onclick = () => loadSingleCategory(category);
    categoryContainer.appendChild(btn);
  });
};

// ======================================
// Initial Load
// ======================================
loadCategory();
loadAllProducts();
loadTopRatedProducts();
