// $(document).ready(function() {
//     $(".quantity-button1").click(function() {
//         let quantity = parseInt($("#item_quantity").text(), 10);
//         quantity = quantity - 1;
//         $("#item_quantity").text(quantity);
        
//         alert(quantity);
//     });
//     $(".quantity-button2").click(function() {
//         let quantity = parseInt($("#item_quantity").text(), 10);
//         quantity = quantity +1;
//         $("#item_quantity").text(quantity);
//         alert(quantity);
//     });
// });
$(document).ready(function() {
    $(".quantity-button1").click(function() {
        const itemID = $(this).data('item-id');
        const quantityElement = $('#' + itemID + ' .item_quantity');
        const currentQuantity = parseInt(quantityElement.text());
        const PriceElement = $('#' + itemID + ' .price');
        const Price = parseInt(PriceElement.text());
        console.log("Price",price);
         const newQuantity = currentQuantity - 1;
            quantityElement.text(newQuantity);
            const totalPriceElement = $('#' + itemID + ' .total');
        const newTotal = Price * newQuantity;
        totalPriceElement.text(newTotal.toFixed(2));
          console.log("total",total);
        let item_name=$("#item_name").text()
        updateQuantityOnServer(newQuantity,item_name,newTotal);
    
       
        
        // console.log("clicked");
        // let quantity = parseInt($("#item_quantity").text(), 10);
        // quantity = quantity - 1;
        // $("#item_quantity").text(quantity);
        // let item_name=$("#item_name").text()
        // let price=$("#price").text()
        
        // total_amnt=price * quantity
        // $("#total").text(total_amnt);
        // console.log("quantity,price,item_name",quantity,price,item_name);
        // updateQuantityOnServer(quantity,item_name,total_amnt);
    });

    $(".quantity-button2").click(function() {
        const itemID = $(this).data('item-id');
        const quantityElement = $('#' + itemID + ' .item_quantity');
        const currentQuantity = parseInt(quantityElement.text());
        const PriceElement = $('#' + itemID + ' .price');
        const Price = parseInt(PriceElement.text());
        console.log("Price",price);
         const newQuantity = currentQuantity + 1;
            quantityElement.text(newQuantity);
            const totalPriceElement = $('#' + itemID + ' .total');
        const newTotal = Price * newQuantity;
        totalPriceElement.text(newTotal.toFixed(2));
          console.log("total",total);
        let item_name=$("#item_name").text()
        updateQuantityOnServer(newQuantity,item_name,newTotal);
        
    });
});

function updateQuantityOnServer(newQuantity,item_name,newTotal) {
    
    console.log("item_name",item_name);
    const cart_item =  add_to_cart()
        console.log(cart_item);

   
    async function add_to_cart() {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'X-Frappe-CSRF-Token': '{{ csrf_token }}'
        }

        const response = await fetch("/api/method/shop.api.update_quantity", {
            method: 'POST',
            body: JSON.stringify({
                docname: item_name,
                quantity:newQuantity,
                total:newTotal
            }),
            headers,
            credentials: 'same-origin',

        })

        if (response.ok) {
            const orderData = (await response.json()).message // frappe wraps the response inside "message" key

            const options = {
                // "key": orderData.key_id,
                // "order_id": orderData.order_id,
                "handler": (res) => {
                    window.location = "/shop/success";
                }
            }

            return options
        } else {
            // EXERCISE: Better handling 
            alert("Something went wrong")
            throw Error("")
        }
    }

    // const docname = $("#item_name").text();
    // frappe.call({
    //     method: 'shop.api.update_quantity',
    //     args: {
    //         docname: docname,
    //         quantity: quantity
    //     },
    //     callback: function(response) {
    //         if (response.message === 'success') {
    //             frappe.msgprint('Quantity updated successfully.');
    //         } else {
    //             frappe.msgprint('Failed to update quantity.');
    //         }
    //     },
    //     error: function(xhr, textStatus, errorThrown) {
    //         console.log('Error:', textStatus, errorThrown);
    //         frappe.msgprint('An error occurred while updating quantity.');
    //     }
    // });
}

