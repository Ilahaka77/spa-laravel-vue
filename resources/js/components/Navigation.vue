<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <router-link :to="{ name: 'home' }" class="navbar-brand">SPA Laravel</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav mr-auto"></ul>

                    <ul class="navbar-nav ml-auto" v-if="! user.authenticated">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto" v-if="user.authenticated">
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" href="#" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ user.data.name }}
                                <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <router-link class="dropdown-item" :to="{ name: 'profile' }">Profile</router-link>
                                <a href="#" class="dropdown-item">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    }
}
</script>