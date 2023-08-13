<template>
  <div class="flex h-screen items-center justify-center">
    <div class="grid h-[850px] w-full max-w-[1440px] grid-cols-2 p-9">
      <img
        class="h-full object-cover rounded-3xl"
        src="~/assets/images/login.png"
      />
      <div class="px-20 flex flex-col justify-center">
        <div>
          <div class="flex flex-col items-center">
            <p>Welcome to Vedu!</p>
            <USwitch :items="actions" v-model="action" size="md" />
            <USwitch :items="roles" v-model="role" size="md" />
          </div>
          <div>
            <LazyActionLoginStudent
              v-if="action === 'login' && role === 'student'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import USwitch from "~/ui/USwitch.vue";

definePageMeta({
  layout: "empty",
});

const actions = [
  {
    label: "Login",
    value: "login",
  },
  {
    label: "Register",
    value: "register",
  },
];
const action = ref("login");

const roles = [
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Instructor",
    value: "instructor",
  },
];
const role = ref("student");

const email = ref("");
</script>

<style scoped></style>
