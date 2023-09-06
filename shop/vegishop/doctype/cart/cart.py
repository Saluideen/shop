# Copyright (c) 2023, Ideenkreise and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Cart(Document):
	pass



@frappe.whitelist()
def create_item_order(item_name):
	print("item_name",item_name)