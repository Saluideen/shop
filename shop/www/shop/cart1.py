import frappe
no_cache=True


def get_context(context):
	print("hiii")
	total=0
	qunty=0
	

	context['items']=frappe.get_all("Items",fields=['name','image','price','route'])
	user = frappe.session.user
	count_result = frappe.db.sql("""select count(*) from `tabCart`  where user=%(user)s""", values={'user': user})
	cart_count = count_result[0][0] if count_result else 0
	context['cart_count'] = cart_count
	cart_items=frappe.db.sql("""select name,item,price,image,quantity,total from `tabCart` where user=%(user)s""",
	values={'user':user},as_dict=1)
	context['cart_items']=cart_items
	print("cart_itmes",cart_items)
	for r in cart_items:
		
		total=total+r.total
		

	context['total']=total
	context.csrf_token = frappe.sessions.get_csrf_token()
    