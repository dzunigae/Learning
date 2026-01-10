<template>
    <div class="ui secondary menu">
        <div class="ui container">
            <div class="left menu">
                <router-link class="item" to="/">
                    <img class="ui small image" src="../assets/logo.png" alt="Ecomerce" />
                    <p>Categorias...</p>
                </router-link>
            </div>
            <div class="right menu">
                <router-link class="item" to="/login">
                    Iniciar sesión
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
    };
</script>

<style lang="scss" scoped>
    .ui.menu.secondary {
        background-color: #16202b;
        .item {
            color: #ffffff;
            &:hover {
                color: #1fa1f1;
            }
        }
        .menu.left {
            width: 50%;
            .ui.image {
                width: 70px;
            }
        }
        .menu.right {
            width: 50%;
            justify-content: flex-end;
            .logout,
            .cart {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
</style>