<template>
    <BasicLayouts>
        <h1>Estamos en Login</h1>
        <RouterLink to="/register">
            Crear una cuenta
        </RouterLink>
    </BasicLayouts>
</template>

<script>
import BasicLayouts from '@/layouts/BasicLayouts.vue';

    export default {
        name: "Login",
        components: {
            BasicLayouts,
        }
    }
</script>

<style>

</style>