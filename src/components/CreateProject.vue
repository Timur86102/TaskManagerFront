<template>
    <div class="flex">
        <InputText type="text" placeholder="Введите наименование" v-model="this.projectName" class="flex-auto"/>
    </div>
    <div class="flex mt-4">
        <Textarea placeholder="Введите описание" v-model="this.projectNote" rows="5" class="flex-auto"/>
    </div>
    <div class="flex mt-4">
        <Select v-model="this.projectState" :options="projectStates" optionLabel="name" placeholder="Выберите статус" class="flex-auto"/>
    </div>
    <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
            <span class="pi pi-upload mx-3"></span>Выбрать изображение</label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*">
    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" @click="createProject" label="Сохранить"/>
        <Button type="button" @click="this.dialogRef.close()" severity="secondary" label="Закрыть"/>
    </div>
    <Toast position="bottom-right"/>
</template>
<script>
    import { inject } from "vue";
    import InputText from "primevue/inputtext";
    import Textarea from 'primevue/textarea';
    import Select from 'primevue/select';
    import Button from "primevue/button";
    import Toast from "primevue/toast";
    import { useDataStore } from "@/stores/dataStore";
    export default {
        name: "CreateProject",
        components: { InputText, Textarea, Select, Button, Toast },
        data() {
            return {
                dataStore: useDataStore(),
                projectName: '',
                projectNote: '',
                projectState: null,
                projectImage: null,
                dialogRef: inject('dialogRef')
            }
        },
        computed: {
            projectStates() {
                return this.dataStore.project_states;
            },
            errorMessage() {
                return this.dataStore.errorMessage;
            },
            errorCode() {
                return this.dataStore.errorCode;
            }
        },
        mounted() {
            this.dataStore.get_project_states();
        },
        methods: {
            changeCaption(event) {
                const file = event.target.files[0];
                if(file) {
                    document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
                    this.projectImage = file;
                } else {
                    document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
                    this.projectImage = null;        
                }
            },
            async createProject() {
                const formData = new FormData();
                formData.append('name', this.projectName);
                formData.append('note', this.projectNote);
                formData.append('state_id', this.projectState.id);
                formData.append('image', this.projectImage);
                await this.dataStore.create_project(formData);
                if(this.errorCode > 0) {
                    this.$toast.add({ severity: 'error', summary: 'Ошибка добавления данных', detail: this.errorMessage, life: 4000 });
                } else {
                    this.$toast.add({ severity: 'success', summary: 'Данные успешно добавлены', detail: this.errorMessage, life: 4000 });
                    setTimeout(() => {
                        this.dialogRef.close();
                    }, 4000);
                }
            }
        }
    }
</script>
<style scoped>
    .input-textarea {
        border: 1px solid #ccc; /* Рамка */
        background-color: #f9f9f9; /* Цвет фона */
        padding: 8px; /* Внутренний отступ */
        font-size: 16px; /* Размер шрифта */
        width: 100vw; /* Ширина поля на всю ширину окна */
        box-sizing: border-box; /* Учитываем рамки и внутренние отступы в ширину */
    }
</style>