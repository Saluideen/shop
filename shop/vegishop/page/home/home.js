frappe.pages['home'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Vegishop',
		single_column: true
	});
}