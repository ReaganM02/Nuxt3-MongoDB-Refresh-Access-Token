<script lang="ts" setup>

</script>
<template>
    <main class="h-screen">
        <div class="h-screen grid grid-cols-2">
            <div class="bg-gradient-to-br from-sky-700 via-violet-500 to-red-700 grid place-items-center">
                <div>
                    <div class="text-white font-extrabold text-[37px] uppercase">
                        Authentication
                    </div>
                    <div class="text-center text-white">
                        Nuxt3 • MongoDB • JWT • Refresh Token
                    </div>
                </div>
            </div>
            <div class="grid place-items-center">
                <div class="max-w-lg w-full">
                    <slot />
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped lang="css">
svg {
    max-width: 100%;
}

.e-albania {
    height: 100px;
    position: relative;
    width: 100px;
}

.e-albania svg:not(#orbit) {
    animation-name: logo_kinetics;
    animation-duration: 2.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: forwards;
    position: absolute;
    top: -50%;
    left: 0;
    transform-origin: bottom center;
}

@keyframes logo_kinetics {
    to {
        transform: rotate(360deg);
    }
}

.logo-title {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: normal;
    color: #fff;
    font-size: 22px;
    margin-top: 4px;
    margin-bottom: 4px;
}
</style>
