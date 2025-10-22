// Load order data when page loads
document.addEventListener('DOMContentLoaded', function() {
    const orderDataString = sessionStorage.getItem('orderData');
    
    if (!orderDataString) {
        // If no order data, redirect back to order form
        window.location.href = 'purchase.html';
        return;
    }
    
    const orderData = JSON.parse(orderDataString);
    
    // Format the delivery date
    const dateObj = new Date(orderData.deliveryDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Update confirmation page with order data
    document.getElementById('confirmRecipientName').textContent = orderData.recipientName;
    document.getElementById('confirmAddress').textContent = orderData.deliveryAddress;
    document.getElementById('confirmDate').textContent = formattedDate;
    document.getElementById('orderNumber').textContent = '#' + orderData.orderNumber;
    
    // Check the appropriate size radio button
    if (orderData.bouquetSize === 'standard') {
        document.getElementById('confirmStandard').checked = true;
    } else {
        document.getElementById('confirmDeluxe').checked = true;
    }
});

// View Order Details button
document.querySelector('.view-btn').addEventListener('click', function() {
    const orderData = JSON.parse(sessionStorage.getItem('orderData'));
    
    let detailsMessage = `Order Details:\n\n`;
    detailsMessage += `Order Number: ${orderData.orderNumber}\n`;
    detailsMessage += `Recipient: ${orderData.recipientName}\n`;
    detailsMessage += `Delivery Address: ${orderData.deliveryAddress}\n`;
    detailsMessage += `Delivery Date: ${orderData.deliveryDate}\n`;
    detailsMessage += `Bouquet Size: ${orderData.bouquetSize.charAt(0).toUpperCase() + orderData.bouquetSize.slice(1)}\n`;
    detailsMessage += `Payment Method: ${orderData.paymentMethod.toUpperCase()}\n`;
    detailsMessage += `Total Price: ${orderData.totalPrice}\n`;
    
    if (orderData.giftMessage) {
        detailsMessage += `\nGift Message:\n${orderData.giftMessage}`;
    }
    
    alert(detailsMessage);
});