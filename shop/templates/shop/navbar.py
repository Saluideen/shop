import frappe


def get_context(context):
    
	

	context['items']=frappe.get_list("Items",fields=['name','image','price','route'])
    print(context)