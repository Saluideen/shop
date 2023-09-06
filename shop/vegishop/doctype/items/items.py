# Copyright (c) 2023, Ideenkreise and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.website.utils import cleanup_page_name
no_cache=True
class Items(WebsiteGenerator):
	# pass
	def validate(self):
		if not self.route:
			self.route = f"items/{cleanup_page_name(self.name)}"
	
	
	def get_context(self, context):
		context.csrf_token = frappe.sessions.get_csrf_token()
		user = frappe.session.user
		count_result = frappe.db.sql("""select count(*) from `tabCart` where user=%(user)s""", values={'user': user})
		cart_count = count_result[0][0] if count_result else 0
		context['cart_count'] = cart_count

