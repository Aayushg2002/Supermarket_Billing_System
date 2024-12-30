// Array to store product items
let products = [];

// Add Product to Billing Table
function addProduct() {
  // Get values from input fields
  const productName = document.getElementById("product-name").value;
  const productPrice = parseFloat(document.getElementById("product-price").value);
  const productQuantity = parseInt(document.getElementById("product-quantity").value);

  // Check if inputs are valid
  if (!productName || isNaN(productPrice) || isNaN(productQuantity) || productQuantity <= 0) {
    alert("Please enter valid product details.");
    return;
  }

  // Create product object and add to products array
  const product = {
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    total: productPrice * productQuantity,
  };
  products.push(product);

  // Clear input fields
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-quantity").value = "";

  // Update billing table
  displayProducts();
  updateTotalAmount();
}

// Display Products in the Table
function displayProducts() {
  const tableBody = document.getElementById("billing-table").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  products.forEach((product, index) => {
    const row = tableBody.insertRow();

    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>$${product.total.toFixed(2)}</td>
      <td><button onclick="removeProduct(${index})">Remove</button></td>
    `;
  });
}

// Update Total Amount Display
function updateTotalAmount() {
  const totalAmount = products.reduce((sum, product) => sum + product.total, 0);
  document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
}

// Remove Product from Billing Table
function removeProduct(index) {
  products.splice(index, 1);
  displayProducts();
  updateTotalAmount();
}

// Generate and Display Final Bill
function generateBill() {
  if (products.length === 0) {
    alert("No products added.");
    return;
  }

  let billOutput = "<h2>Final Bill</h2><ul>";
  products.forEach((product) => {
    billOutput += `<li>${product.name} - ${product.quantity} x $${product.price.toFixed(2)} = $${product.total.toFixed(2)}</li>`;
  });
  
  const totalAmount = products.reduce((sum, product) => sum + product.total, 0);
  billOutput += `</ul><h3>Total Amount: $${totalAmount.toFixed(2)}</h3>`;

  document.getElementById("bill-output").innerHTML = billOutput;

  // Reset products array and clear table
  products = [];
  displayProducts();
  updateTotalAmount();
}
