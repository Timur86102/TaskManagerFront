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
        :first="offset"
        selectionMode="single"
        v-model:selection="selectedProject">
        <template #header>
            <div class="flex gap-2">
                <Button @click="createProject" icon="pi pi-plus" label="Добавить"/>
                <!-- <Button text type="button" @click="editProject" icon="pi pi-pencil" label="Изменить" severity="secondary" raised v-bind:disabled="!selectedProject"/>
                <Button text type="button" @click="deleteProject" icon="pi pi-trash" label="Удалить" severity="danger" raised v-bind:disabled="!selectedProject"/> -->
            </div>
        </template>
        <Column field="id" header="№"/>
        <Column field="name" header="Наименование проекта"/>
        <Column field="state.name" header="Состояние"/>
        <Column field="manager.name" header="Руководитель"/>
        <Column header="Иконка">
            <template #body="{data}">
                <img :src="data.picture_url" style="width: 50px;" />
            </template>
      </Column>
    </DataTable>
    <DynamicDialog/>
</template>
<script>
    import DataTable from "primevue/datatable";
    import Column from "primevue/column";
    import Button from "primevue/button";
    import CreateProject from '@/components/CreateProject.vue';
    import DynamicDialog from "primevue/dynamicdialog";
    import { useDialog } from 'primevue/usedialog';
    import { useDataStore } from "@/stores/dataStore";
    export default {
        name: "Projects",
        components: { DataTable, Column, Button, CreateProject, DynamicDialog },
        data() {
            return {
                dataStore: useDataStore(),
                dialog: useDialog(),
                perpage: 5,
                offset: 0,
                selectedProject: null
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
            },
            createProject() {
                this.dialog.open(CreateProject, {
                    props: {
                        header: 'Добавление проекта',
                        style: { width: '25rem' },
                        modal: true
                    }
                });
            },
            editProject() {
                this.dialog.open(CreateProject, {
                    data: {
                        project: this.selectedProject
                    },           
                    props: {
                        header: 'Редактирование',
                        modal: true
                    }
                });
            },
            async deleteProject() {
                await this.dataStore.delete_project(this.selectedProject.id);
            }
        }
    }
</script>