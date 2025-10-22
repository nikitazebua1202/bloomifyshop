// Set today's date automatically
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    // Update price when bouquet size changes
    const bouquetSizeInputs = document.querySelectorAll('input[name="bouquetSize"]');
    bouquetSizeInputs.forEach(input => {
        input.addEventListener('change', updatePrice);
    });
    
    // Initial price update
    updatePrice();
});

function updatePrice() {
    const selectedSize = document.querySelector('input[name="bouquetSize"]:checked').value;
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (selectedSize === 'standard') {
        totalPriceElement.textContent = '$65';
    } else if (selectedSize === 'deluxe') {
        totalPriceElement.textContent = '$95';
    }
}

// Handle form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const recipientName = document.getElementById('recipientName').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const deliveryDate = document.getElementById('dateDate').value;
    const giftMessage = document.getElementById('giftMessage').value;
    const bouquetSize = document.querySelector('input[name="bouquetSize"]:checked').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const totalPrice = document.getElementById('totalPrice').textContent;
    
    // Generate order number
    const orderNumber = 'ORD' + Date.now().toString().slice(-8);
    
    // Store data in sessionStorage
    const orderData = {
        recipientName,
        deliveryAddress,
        deliveryDate,
        giftMessage,
        bouquetSize,
        paymentMethod,
        totalPrice,
        orderNumber
    };
    
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    
    // Redirect to confirmation page
    window.location.href = 'confirm.html';
});