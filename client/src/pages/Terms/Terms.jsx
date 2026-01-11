import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: January 11, 2026</p>

            <div className="prose prose-slate max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-slate-600">
                        By accessing and using MedLink, you accept and agree to be bound by the terms and
                        provision of this agreement. If you do not agree to these terms, please do not use
                        our service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Service Description</h2>
                    <p className="text-slate-600">
                        MedLink is a platform that connects patients with healthcare providers. We facilitate
                        appointment booking, medical record management, and healthcare communication. We do
                        not provide medical advice or treatment directly.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
                    <p className="text-slate-600 mb-4">You agree to:</p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                        <li>Provide accurate and complete information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Notify us immediately of any unauthorized use</li>
                        <li>Use the service lawfully and ethically</li>
                        <li>Attend scheduled appointments or cancel with adequate notice</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Medical Disclaimer</h2>
                    <p className="text-slate-600">
                        MedLink does not provide medical advice. All medical advice and treatment are
                        provided by licensed healthcare professionals. Always seek the advice of your
                        physician or qualified health provider with questions regarding a medical condition.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Payments and Refunds</h2>
                    <p className="text-slate-600">
                        All fees are charged according to the pricing displayed at the time of booking.
                        Refunds are processed according to the cancellation policy of the specific
                        healthcare provider.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
                    <p className="text-slate-600">
                        MedLink shall not be liable for any indirect, incidental, special, consequential,
                        or punitive damages resulting from your use or inability to use the service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Termination</h2>
                    <p className="text-slate-600">
                        We reserve the right to  terminate or suspend your account at any time for violation
                        of these terms or for any other reason at our sole discretion.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to Terms</h2>
                    <p className="text-slate-600">
                        We reserve the right to modify these terms at any time. We will notify users of
                        any material changes via email or through the platform.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Information</h2>
                    <p className="text-slate-600">
                        For questions about these Terms, contact us at:<br />
                        Email: legal@medlink.com<br />
                        Phone: 1-800-MEDLINK
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
