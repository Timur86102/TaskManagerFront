<template>
    <DataTable
        :value="tasks"
        :lazy="true"
        :loading="dataStore.loading"
        :paginator="true"
        :rows="perpage"
        :rowsPerPageOptions="[2, 5, 10]"
        :totalRecords="tasks_total"
        @page="onPageChange"
        responsive-alout="scroll"
        :laading="true"
        :first="offset">
        <Column field="id" header="№"/>
        <Column field="name" header="Наименование задачи"/>
        <Column field="state.name" header="Состояние"/>
        <Column field="user.name" header="Исполнитель"/>
        <Column field="project.name" header="Проект"/>
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
            tasks() {
                return this.dataStore.tasks;
            },
            tasks_total() {
                return this.dataStore.tasks_total;
            }
        },
        mounted() {
            this.dataStore.get_tasks();
            this.dataStore.get_tasks_total();
        },
        methods: {
            onPageChange(event) {
                this.offset = event.first;
                this.perpage = event.rows;
                this.dataStore.get_tasks(this.offset / this.perpage, this.perpage);
            }
        }
    }
</script>