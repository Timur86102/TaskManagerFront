<template>
    <DataTable
        :value="projects"
        :lazy="true"
        :loading="dataStore.loading"
        :paginator="true"
        :rows="perpage"
        :rowsPerPageOptions="[2, 5, 10]"
        :totalRecords="projects_total"
        @page="onPageChange"
        responsive-alout="scroll"
        :laading="true"
        :first="offset">
        <Column field="id" header="№"/>
        <Column field="name" header="Наименование проекта"/>
        <Column field="state.name" header="Состояние"/>
        <Column field="manager.name" header="Руководитель"/>
    </DataTable>
</template>
<script>
    import DataTable from "primevue/datatable";
    import Column from "primevue/column";
    import { useDataStore } from "@/stores/dataStore";
    export default {
        name: "Projects",
        components: { DataTable, Column },
        data() {
            return {
                dataStore: useDataStore(),
                perpage: 5,
                offset: 0
            }
        },
        computed: {
            projects() {
                return this.dataStore.projects;
            },
            projects_total() {
                return this.dataStore.projects_total;
            }
        },
        mounted() {
            this.dataStore.get_projects();
            this.dataStore.get_projects_total();
        },
        methods: {
            onPageChange(event) {
                this.offset = event.first;
                this.perpage = event.rows;
                this.dataStore.get_projects(this.offset / this.perpage, this.perpage);
            }
        }
    }
</script>