import stripe from "../../lib/stripe.js";

import {
    processSuccessfulCardPayment,
    markCardPaymentFailed,
} from "../order/order.service.js";


export const stripeWebhook = async (
    req,
    res
) => {

    const signature =
        req.headers["stripe-signature"];


    let event;


    try {

        event =
            stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );

    } catch (error) {

        console.error(
            "Stripe webhook signature verification failed:",
            error.message
        );


        return res.status(400).send(
            `Webhook Error: ${error.message}`
        );

    }


    try {

        switch (event.type) {


            /* =================================================
               STRIPE CHECKOUT COMPLETED
            ================================================= */

            case "checkout.session.completed": {

                const checkoutSession =
                    event.data.object;


                if (
                    checkoutSession.payment_status !==
                    "paid"
                ) {

                    console.log(
                        "Checkout completed but payment is not paid:",
                        checkoutSession.id
                    );

                    break;

                }


                if (
                    !checkoutSession.payment_intent
                ) {

                    console.warn(
                        "Checkout Session does not contain a PaymentIntent:",
                        checkoutSession.id
                    );

                    break;

                }


                const paymentIntent =
                    await stripe.paymentIntents.retrieve(
                        checkoutSession.payment_intent
                    );


                const order =
                    await processSuccessfulCardPayment(
                        paymentIntent
                    );


                console.log(
                    `Stripe Checkout order ${order.orderNumber} successfully marked as PAID.`
                );


                break;

            }


            /* =================================================
               PAYMENT INTENT SUCCESS

               Kept for safety and webhook idempotency.
            ================================================= */

            case "payment_intent.succeeded": {

                const paymentIntent =
                    event.data.object;


                const order =
                    await processSuccessfulCardPayment(
                        paymentIntent
                    );


                console.log(
                    `Card order ${order.orderNumber} successfully marked as PAID.`
                );


                break;

            }


            /* =================================================
               PAYMENT FAILED
            ================================================= */

            case "payment_intent.payment_failed": {

                const paymentIntent =
                    event.data.object;


                const order =
                    await markCardPaymentFailed(
                        paymentIntent
                    );


                if (order) {

                    console.log(
                        `Card payment failed for order ${order.orderNumber}.`
                    );

                } else {

                    console.warn(
                        "Unable to find order for failed PaymentIntent:",
                        paymentIntent.id
                    );

                }


                break;

            }


            /* =================================================
               CHECKOUT SESSION EXPIRED
            ================================================= */

            case "checkout.session.expired": {

                const checkoutSession =
                    event.data.object;


                console.log(
                    `Stripe Checkout Session expired: ${checkoutSession.id}`
                );


                break;

            }


            /* =================================================
               UNHANDLED STRIPE EVENT
            ================================================= */

            default: {

                console.log(
                    `Unhandled Stripe event: ${event.type}`
                );

            }

        }


        return res.status(200).json({

            received: true,

        });


    } catch (error) {

        console.error(
            "Stripe webhook processing error:",
            error
        );


        return res.status(500).json({

            received: false,

            message:
                "Webhook processing failed.",

        });

    }

};