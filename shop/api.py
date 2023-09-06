import frappe
import razorpay

from frappe.utils.password import get_decrypted_password

def get_razorpay_client():

    key_id = frappe.db.get_single_value("Razorpay Settings", "key_id")
    key_secret = get_decrypted_password("Razorpay Settings", "Razorpay Settings", "key_secret")
    return razorpay.Client(auth=(key_id, key_secret))

@frappe.whitelist(allow_guest=True)
def add_to_cart(item_name,price):
    existed_cart=frappe.db.get_list('Cart',
    filters={
        'user':frappe.session.user,
		'item':item_name
    },)
    print(existed_cart)
   
    if(len(existed_cart)>0):
        
        new_cart=existed_cart[0]
        doc=frappe.get_doc("Cart",new_cart)
       
        doc.quantity += 1
        
        # doc.total=price
        doc.save()
    else:
        new_cart=frappe.new_doc("Cart")
        new_cart.item=item_name
        new_cart.total=price
        new_cart.user=frappe.session.user
        new_cart.insert(ignore_permissions=True)

   
	
    

@frappe.whitelist()
def create_item_order(item_name):
    item_price_inr = frappe.db.get_value("Items", item_name, "price")
    if item_price_inr is not None:
        order_data = {"amount": item_price_inr * 100, "currency": "INR"}  # convert to paisa
        client = get_razorpay_client()
        razorpay_order = client.order.create(data=order_data)

        return {
            "key_id": client.auth[0],
            "order_id": razorpay_order["id"],
        }
    else:
        frappe.throw("Item price not found.")

@frappe.whitelist()
def create_cart_order(price):
    print(price)
    
    if price is not None:
        price_amnt=int(str(price).split('.')[0])

        order_data = {"amount": price_amnt * 100, "currency": "INR"}  # convert to paisa
        client = get_razorpay_client()
        razorpay_order = client.order.create(data=order_data)

        return {
            "key_id": client.auth[0],
            "order_id": razorpay_order["id"],
        }
    else:
        frappe.throw("Item price not found.")

@frappe.whitelist()
def update_quantity(docname,quantity,total):
    print("total_amnt",total)
    doc = frappe.get_doc("Cart", docname)
    doc.quantity =quantity
    doc.total =total
    doc.save()
