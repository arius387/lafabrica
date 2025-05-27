async function submitForm(formId, formType) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://qxzxmlzfndsibkdhdvde.functions.supabase.co/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY',
                },
                body: JSON.stringify({ formType, data }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Form submitted successfully!');
                form.reset();
                // Re-disable submit button after submission
                if (formId === 'order-form') {
                    const submitButton = document.getElementById('submit-order');
                    submitButton.disabled = true;
                    submitButton.classList.add('bg-gray-400', 'cursor-not-allowed', 'opacity-50', 'blur-sm');
                    submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'dark:hover:bg-blue-500');
                    document.getElementById('quantity-3l').value = 0;
                    document.getElementById('quantity-5l').value = 0;
                }
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            alert('Error submitting form: ' + error.message);
        }
    });
}

// Initialize form submissions
submitForm('contact-form', 'contact');
submitForm('order-form', 'order');
