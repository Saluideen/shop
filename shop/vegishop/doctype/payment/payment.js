frappe.ui.form.on('Payment', {
    refresh: function(frm) {
        frappe.call({
            method: "shop.vegishop.doctype.payment.payment.get_project",
            callback: function(r) {
                if (!r.exc) {
                    let project_details = r.message;
                    const html = frappe.render_template("project", {projects: project_details});
                    frm.fields_dict.project.$wrapper.html(html);
                }
            }
        });
        // const html = frappe.render_template("project");
        // frm.fields_dict.project.$wrapper.html(html);
       // Load the external project.html into the HTML field
    // $.get('project.html', function(data) {
    //     frm.fields_dict.project.$wrapper.html(data);
    // }).fail(function() {
    //     frm.fields_dict.project.$wrapper.html('<p>Failed to load project content.</p>');
    // });
        // Add a custom "Pay Now" button on the form
        frm.add_custom_button(__('Pay Now'), function() {
            if (window.Razorpay) {
                frm.trigger('show_payment_screen');
            } else {
                frappe.msgprint(__('Razorpay script not loaded. Please try again later.'));
            }
        });
        
        // Dynamically load Razorpay script if not already loaded
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = function() {
                console.log('Razorpay script loaded successfully');
            };
            script.onerror = function() {
                frappe.msgprint(__('Failed to load Razorpay script. Please refresh the page and try again.'));
            };
            document.head.appendChild(script);
        }
        

    },

    show_payment_screen: function(frm) {
        // Define Razorpay options
        const options = {
            "key": "rzp_test_UUaTB2z21rLaqS", // Replace with your Razorpay Key ID
            "amount": frm.doc.price * 100, // Convert amount to paisa (e.g., ₹500 => 50000)
            "currency": "INR",
            "name": "IDEENKREISE TECH.",
            "description": "Payment for Invoice #" + frm.doc.name,
            // "image": "/assets/your_app/images/logo.png", // Optional logo
            "handler": function(response) {
                frappe.msgprint(__('Payment Successful! Payment ID: ' + response.razorpay_payment_id));
                
                // Optionally save the payment details to the backend
                frappe.call({
                    method: "shop.vegishop.doctype.payment.payment.save_payment",
                    args: {
                        payment_id: response.razorpay_payment_id,
                        docname: frm.doc.name
                    },
                    callback: function(r) {
                        if (!r.exc) {
                            frappe.msgprint(__('Payment details saved successfully.'));
                            frm.reload_doc(); // Reload the form to reflect changes
                        }
                    }
                });
            },
            "prefill": {
                "name": frm.doc.customer_name1 || "Guest",
                // "email": frm.doc.customer_email || "",
                // "contact": frm.doc.customer_phone || ""
            },
            "theme": {
                "color": "#F37254" // Optional theme color
            }
        };

        // Open the Razorpay payment screen
        const razorpay = new Razorpay(options);
        razorpay.open();

        // Handle payment failure (optional)
        razorpay.on('payment.failed', function(response) {
            frappe.msgprint(__('Payment failed. Please try again.'));
            console.error(response.error);
        });
    }
});
