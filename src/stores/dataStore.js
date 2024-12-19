import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        authStore: useAuthStore(),
        projects: [],
        projects_total: null,
        project_states: [],
        tasks: [],
        tasks_total: null,
        errorCode: "",
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
        async get_project_states(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/project_state', {
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    }
                });
                this.project_states = response.data;
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
        },
        async create_project(formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backendUrl + '/project', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.authStore.token
                    }
                });
                this.errorCpde = response.data.code;
                this.errorMessage = response.data.message;
            } catch(error) {
                if(error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async update_project(id, formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backendUrl + '/project/' + id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + this.authStore.token
                    }
                });
                this.errorCpde = response.data.code;
                this.errorMessage = response.data.message;
            } catch(error) {
                if(error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async delete_project(id) {
            this.errorMessage = "";
            try {
                const response = await axios.delete(backendUrl + '/project/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    }
                });
                this.errorCpde = response.data.code;
                this.errorMessage = response.data.message;
            } catch(error) {
                if(error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        }
    }
});