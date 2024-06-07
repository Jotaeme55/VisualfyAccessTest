<template>
    <main>
      <h1>Payment</h1>

      <p>Enable more payment method types <a
        href="https://dashboard.stripe.com/settings/payment_methods" target="_blank">in your
        dashboard</a>.</p>

      <form id="payment-form">
        <div id="link-authentication-element">
          <!-- Elements will create authentication element here -->
        </div>
        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
        <button id="submit">Pay now</button>
        <div id="error-message">
          <!-- Display error message to your customers here -->
        </div>
      </form>

      <div id="messages" role="alert" style="display: none;"></div>
    </main>
  </template>
  
  <script>
  import Stripe from 'stripe';
  
  export default {
    data() {

    },
    mounted() {
      // Reemplaza 'YOUR_STRIPE_PUBLISHABLE_KEY' con tu clave pública de Stripe
      let stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
      console.log(stripe)
    //   let elements = stripe.elements();
    //   this.card = elements.create('card');
    //   this.card.mount(this.$refs.card);
    },
    methods: {
      processPayment: async function () {
        const { token, error } = await this.stripe.createToken(this.card);
  
        if (error) {
          console.error('Error al crear el token de pago:', error.message);
        } else {
          // Aquí puedes enviar el token de pago a tu backend para procesar el pago
          console.log('Token de pago:', token.id);
          // Luego, redirige al usuario a una página de éxito o muestra un mensaje de éxito en esta página.
        }
      },
    },
  };
  </script>
  