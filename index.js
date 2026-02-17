const loadCategory = () => {
  const url = "https://fakestoreapi.com/products/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data));
};



const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  //   console.log(categoryContainer);
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.innerHTML = `
          <button onClick="loadSingleCategory('${category}')" class="btn btn-outline btn-sm rounded-full px-6">
            ${category}
          </button>
        `;
    categoryContainer.appendChild(btn);
  });
};

loadCategory();
