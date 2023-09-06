import frappe


def get_context(context):
	

	context['items']=frappe.get_all("Items",fields=['name','image','price','route'])
	user = frappe.session.user
	count_result = frappe.db.sql("""select count(*) from `tabCart`  where user=%(user)s""", values={'user': user})
	cart_count = count_result[0][0] if count_result else 0
	context['cart_count'] = cart_count
	cart_items=frappe.db.sql("""select * from `tabCart` where user=%(user)s""",
	values={'user':user})
	context['cart_items']=cart_items