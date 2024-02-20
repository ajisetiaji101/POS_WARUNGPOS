<template>
    <div v-if="error" class=" bg-red-400 text-white w-full px-2 py-4 font-light text-xs mt-2 text-center">
        {{ error }}
    </div>
</template>

<script>
export default {
    props: {
        error: String,
    },
};
</script>