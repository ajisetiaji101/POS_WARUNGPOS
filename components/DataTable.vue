<template>
    <div>
        <div>
            <!-- Header -->
            <div>
                <form @submit.prevent>
                    <input type="text" :value="query.search" @input="query.search = $event.target.value" />
                </form>
                <form @submit.prevent v-if="selectedResources.length">
                    <select v-model="selectedAction">
                        <option :value="null">{{ selectedResources.length }} selected</option>
                        <option v-for="action in actions" :key="`actions-${action}`">{{ action }}</option>
                    </select>
                </form>
            </div>
            <!-- Table -->
            <table>
                <thead>
                    <tr>
                        <th width="1%">
                            <input type="checkbox" :checked="isAllSelected"
                                @click="isAllSelected ? deselectAll() : selectAll()" />
                        </th>
                        <th v-for="column in columns" :key="`columns-${column.name}`">
                            <a href="#" v-if="column.sortable" @click.prevent="sortBy(column.sortable)">
                                <span>{{ column.name }}</span>
                                <span v-if="query.sortAttribute === column.sortable">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path v-if="query.sortDirection === 'asc'" fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                        <path v-else fill-rule="evenodd"
                                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </a>
                            <span v-else>
                                {{ column.name }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="resource in resources.data" :key="resource.id">
                        <td>
                            <input type="checkbox" :value="resource.id" v-model="selectedResources" />
                        </td>
                        <td v-for="column in columns" :key="`cell-${resource.id}-${column.name}`">
                            <slot name="cell" v-bind="{ column, resource }">
                                {{ resource[column.attribute] }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Footer -->
            <div>
                <div>
                    <span>Showing:</span>
                    <form @submit.prevent>
                        <select v-model="query.perPage">
                            <option v-for="perPageOption in perPageOptions" :key="`per-page-options-${perPageOption}`"
                                :value="perPageOption">
                                {{ perPageOption }}
                            </option>
                        </select>
                    </form>
                </div>
                <div>
                    {{ `${resources.from}-${resources.to} of ${resources.total}` }}
                </div>
                <div>
                    <button v-if="resources.prev_page_url" @click="getResources(resources.prev_page_url)">
                        Previous
                    </button>
                    <span v-else>
                        Previous
                    </span>
                    <button v-if="resources.next_page_url" @click="getResources(resources.next_page_url)">
                        Next
                    </button>
                    <span v-else>
                        Next
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { pickBy, debounce } from 'lodash'

export default {
    props: {
        columns: Array,
        perPageOptions: Array,
        request: Object,
        resources: Object,
    },

    data: vm => ({
        query: vm.request,
        selectedAction: null,
        selectedResources: [],
    }),

    computed: {
        isAllSelected() {
            return this.resources.data.length === this.resources.data
                .filter(resource => this.isSelected(resource))
                .length
        },
    },

    methods: {
        isSelected(resource) {
            return this.selectedResources.includes(resource.id)
        },

        selectAll() {
            this.resources.data
                .filter(resource => !this.isSelected(resource))
                .forEach(resource => this.selectedResources.push(resource.id))
        },

        deselectAll() {
            this.selectedResources.splice(0, this.selectedResources.length)
        },

        sortBy(sortAttribute) {
            if (this.query.sortAttribute !== sortAttribute) {
                this.query.sortAttribute = sortAttribute
            } else {
                this.query.sortDirection = this.query.sortDirection === 'asc' ? 'desc' : 'asc'
            }
        },

        getResources(url) {
            this.$emit('refetch', url)
        }
    },

    watch: {
        query: {
            deep: true,
            handler: debounce(function (value) {
                let url = window.location.href.split('?')[0]
                let params = new URLSearchParams(pickBy(value)).toString()
                this.getResources(`${url}?${params}`)
            }, 300)
        },

        selectedAction: function (value) {
            if (!value) return

            if (window.confirm(`${value} selected items?`)) {
                this.$emit('click:action', value)
            }
        },
    }
}
</script>