import frappe

def get_home_page():
    print("demo")
    """Get the homepage URL for redirection after login."""
    website_settings = frappe.get_single('Website Settings')
    home_page = website_settings.get('home')
    if not home_page:
        home_page = '/'

    return home_page

@frappe.whitelist(allow_guest=True)
def redirect_after_login():
    """Redirect users to the appropriate page after login."""
    home_page = get_home_page()

    if frappe.session.user == 'Administrator':
          # Redirect logged-in users to the desk after login
        frappe.local.response['type'] = 'redirect'
        frappe.local.response['location'] = '/desk'
       
    else:
      
         # Redirect guest users to the website after login
        frappe.local.response['type'] = 'redirect'
        frappe.local.response['location'] = home_page
