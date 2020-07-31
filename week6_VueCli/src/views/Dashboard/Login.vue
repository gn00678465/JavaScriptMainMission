<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
    :can-cancel="true"
    :is-full-page="true"></loading>
    <div class="form">
      <div class="form-toggle"></div>
      <div class="form-panel one">
        <div class="form-header">
          <p class="title">後台系統登入</p>
        </div>
        <div class="form-content">
          <LoginForm @submit="login"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import mixin from '@/assets/Backend_mixin';

export default {
  name: 'Login',
  components: { LoginForm },
  mixins: [mixin],
  data() {
    return {
      err: {},
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
// Font Family
$body-font: "Roboto";

// Font Weights
$thin: 100;
$light: 300;
$regular: 400;
$semibold: 500;
$bold: 700;
$ultra: 800;

// Base Font
$base-font-family: $body-font, sans-serif;
$base-font-size: 14px;
$base-font-weight: $regular;
$base-line-height: 1.6em;

// Colors
$black: #000000;
$dark-gray: rgba($black, 0.8);
$gray: rgba($black, 0.6);
$light-gray: rgba($black, 0.4);
$lighter-gray: rgba($black, 0.2);
$white: #FFFFFF;
$accent: #4285F4;

// Form Settings
$max-width: 600px;
$max-height: 400px;
$gutters: 24px;

html,
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $gray;
  font-family: $base-font-family;
  font-size: $base-font-size;
  line-height: $base-line-height;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  background: rgba($black, 0.8);
  width: 100%;
  height: 100%;
}

.form {
  z-index: 15;
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  width: $max-width;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba($black, 0.1);
  box-sizing: border-box;
  margin: 100px auto 10px;
  overflow: hidden;

  // Toggle
  &-toggle {
    z-index: 10;
    position: absolute;
    top: 60px;
    right: 60px;
    background: $white;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    transform-origin: center;
    transform: translate(0, -25%) scale(0);
    opacity: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      height: 4px;
      background: $accent;
      transform: translate(-50%, -50%);
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &.visible {
      transform: translate(0, -25%) scale(1);
      opacity: 1;
    }
  }

  // group
  ::v-deep &-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 0 20px;

    &:last-child {
      margin: 0;
    }

    label {
      display: block;
      margin: 0 0 10px;
      color: $gray;
      font-size: 12px;
      font-weight: $semibold;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 0.2em;

      .two & {
        color: $white;
      }
    }

    input {
      outline: none;
      display: block;
      background: rgba($black, 0.1);
      width: 100%;
      border: 1px solid #ced4da;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 12px 20px;
      color: $gray;
      font-family: inherit;
      font-size: inherit;
      font-weight: $semibold;
      line-height: inherit;
      transition: 0.3s ease;

      &:focus {
        color: $dark-gray;
      }

      .two & {
        color: $white;

        &:focus {
          color: $white;
        }
      }

      & {
        padding-right: calc(1.5em + .75rem);
        background-repeat: no-repeat;
        background-position: right calc(.375em + .1875rem) center;
        background-size: calc(.75em + .375rem) calc(.75em + .375rem);
        &.is-valid {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
          border-color: #28a745;
        }
        &.is-invalid {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
          border-color: #dc3545;
          + .error {
            color: #dc3545;
            margin-top: 5px;
          }
        }
      }
    }

    button {
      outline: none;
      background: $accent;
      width: 100%;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      color: $white;
      font-family: inherit;
      font-size: inherit;
      font-weight: $semibold;
      line-height: inherit;
      text-transform: uppercase;
      cursor: pointer;

      .two & {
        background: $white;
        color: $accent;
      }

      &:disabled {
        cursor: auto;
        opacity: 0.65;
      }
    }

    .form-remember {
      font-size: 12px;
      font-weight: $regular;
      letter-spacing: 0;
      text-transform: none;

      input[type="checkbox"] {
        display: inline-block;
        width: auto;
        margin: 0 10px 0 0;
      }
    }

    .form-recovery {
      color: $accent;
      font-size: 12px;
      text-decoration: none;
    }
  }

  // Panel
  &-panel {
    padding: 60px calc(5% + 60px) 60px 60px;
    box-sizing: border-box;

    // Panel One
    &.one {
      &:before {
        @extend .overlay;

        content: "";
        display: block;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease;
      }

      &.hidden {
        &:before {
          display: block;
          opacity: 1;
          visibility: visible;
        }
      }
    }

    // Panel Two
    &.two {
      z-index: 5;
      position: absolute;
      top: 0;
      left: 95%;
      background: $accent;
      width: 100%;
      min-height: 100%;
      padding: 60px calc(10% + 60px) 60px 60px;
      transition: 0.3s ease;
      cursor: pointer;

      &:before,
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 60px;
        left: 1.5%;
        background: rgba($white, 0.2);
        height: 30px;
        width: 2px;
        transition: 0.3s ease;
      }

      &:after {
        left: 3%;
      }

      &:hover {
        left: 93%;
        box-shadow: 0 0 10px rgba($black, 0.2);

        &:before,
        &:after {
          opacity: 0;
        }
      }

      &.active {
        left: 10%;
        box-shadow: 0 0 10px rgba($black, 0.2);
        cursor: default;

        &:before,
        &:after {
          opacity: 0;
        }
      }
    }
  }
  // Header
  &-header {
    margin: 0 0 30px;

    .title {
      padding: 4px 0;
      color: $accent;
      font-size: 24px;
      font-weight: $bold;
      text-transform: uppercase;

      .two & {
        position: relative;
        z-index: 40;
        color: $white;
      }
    }
  }
}
</style>
