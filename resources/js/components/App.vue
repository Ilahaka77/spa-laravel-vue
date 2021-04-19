<template>
    <div>
        <navigation></navigation>
        <main class="py-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
    components: {
        Navigation
    }
    
}
</script>

