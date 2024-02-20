<template>
    <div v-if="data" class=" bg-green-400 text-white w-full px-2 py-4 font-light text-xs mt-2 text-center">
        {{ data }}
    </div>
</template>

<script>
export default {
    props: {
        data: String,
    },
};
</script>