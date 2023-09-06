import frappe
from frappe.website.doctype.website_settings.website_settings import get_website_settings
def get_home_page():
    """Get the homepage URL for redirection after login."""
    website_settings = get_website_settings()
    home_page = website_settings.get('home')
    if not home_page:
        home_page = '/'

    return home_page

def my_custom_login_function(username, password):
    """Your custom login function."""
    # Your login logic here
    # Example: Verify username and password

    if login_is_successful:  # Replace this condition with your actual login verification
        # Fetch user document
        user = frappe.get_doc('User', username)
        print("user///////",user)

        if user and 'System Manager' in user.roles:
            # Redirect administrators to the Desk after login
            frappe.local.response['type'] = 'redirect'
            frappe.local.response['location'] = '/desk'
        else:
            # Redirect non-admin users to the website after login
            home_page = get_home_page()
            frappe.local.response['type'] = 'redirect'
            frappe.local.response['location'] = home_page
    else:
        # Handle login failure logic
        pass

