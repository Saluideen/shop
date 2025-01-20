# Copyright (c) 2023, Ideenkreise and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class RazorpaySettings(Document):
	pass

def get_razorpay_keys():
    settings = frappe.get_single("Razorpay Settings")
    return {
        "key": settings.key_id,
        "secret": settings.key_secret
    }