import frappe

def get_context(context):
    context['users'] = frappe.get_all('User')