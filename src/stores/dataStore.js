import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        authStore: useAuthStore(),
        projects: [],
        projects_total: null,
        tasks: [],
        tasks_total: null,
        errorMessage: ""
    }),
    actions: {
        async get_projects(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/project', {
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    },
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.projects = response.data;
            } catch(error) {
                if(error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_projects_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/project_total', {
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    }
                });
                this.projects_total = response.data;
            } catch(error) {
                if(error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_tasks(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/task', {
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    },
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.tasks = response.data;
            } catch(error) {
                if(error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_tasks_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/task_total', {
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    }
                });
                this.tasks_total = response.data;
            } catch(error) {
                if(error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        }
    }
});