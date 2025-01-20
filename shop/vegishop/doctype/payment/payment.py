# Copyright (c) 2025, Ideenkreise and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Payment(Document):
	pass
@frappe.whitelist()
def save_payment(payment_id, docname):
    doc = frappe.get_doc("Payment", docname)
    doc.payment_id = payment_id  # Assuming you have a field for storing the payment ID
    doc.payment_status = "Paid"  # Update status
    doc.save()
    frappe.db.commit()
    return "Payment saved successfully."
@frappe.whitelist()
def get_project():
    # Fetch project details including the total, completed, and pending tasks
    project_details = frappe.get_all(
        "Project", 
        fields=["name", "start_date", "end_date", "total", "completed", "pending"]
    )
    return project_details


