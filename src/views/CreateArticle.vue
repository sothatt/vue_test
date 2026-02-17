<template>
    <div>
        <!-- Top Navbar -->
        <Navbar></Navbar>
        <div class="d-flex">
            <!-- Sidebar -->
            <Sidebar></Sidebar>
            <!-- Main Content -->
            <div class="row justify-content-center w-100 my-5">
                <div class="col-12 col-md-10 col-lg-6">
                    <div class="card p-4">
                        <h5 class="fw-bold mb-3">Create New Article</h5>
                        <form @submit.prevent="handleCreate">
                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input type="text" class="form-control" placeholder="Enter article title"
                                    v-model="form.title" />
                                <span class="text-danger">{{ err.title }}</span>
                            </div>

                            <!-- Category -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-select" v-model="form.categoryId">
                                    <option selected disabled>Choose category</option>
                                    <option v-for="category in categoryStore.categories" :key="category.id"
                                        :value="category.id">{{ category.name }}</option>
                                </select>
                                <p class="text-danger">{{ err.category }}</p>
                            </div>
                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input type="file" @change="handleFile" class="form-control" />
                                <p class="text-danger">{{ err.thumbnail }}</p>
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" rows="5" placeholder="Write your article content..."
                                    v-model="form.content"></textarea>
                                <p class="text-danger">{{ err.content }}</p>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <button type="reset" class="btn btn-outline-secondary">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <div v-if="isCreate" class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                   <span v-else> Publish Article</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import Navbar from '@/components/layout/Navbar.vue';
import { useCategoryStore } from '@/stores/category';
let categoryStore = useCategoryStore();
import { onMounted } from 'vue';
import { ref, reactive } from 'vue';
import api from '@/api/http';
import router from '@/router';
import { validate, required, isContent } from '@/utils/validate';
import { nofity } from '@/utils/toast';
let form = ref({
    title: "",
    content: "",
    categoryId: "",
})
// ========validate
let err = reactive({
    title: "",
    content: "",
    category: "",
    thumbnail: ""
})
function validator() {
    err.title = validate(form.value.title, [
        (v) => required(v, "This field is required"),
    ]);
    err.content = validate(form.value.content, [
        (v) => required(v, "Content is required"),
        (p) => isContent(p, "must 8 charactor")
    ]);
    err.thumbnail = validate(form.value.thumbnail, [
        (v) => required(v, "Content is required"),
    ]);
    err.category = validate(form.value.categoryId, [
        (v) => required(v, "Content is required"),
    ]);

    return !err.title && !err.content;
}



let file = ref(null);
let isCreate = ref(false)
onMounted(() => {
    categoryStore.fetchCategory(1, 10);
})
const handleCreate = async () => {
    console.log(form.value);
    if (!validator()) {
        console.log(1);

        return
    };
    isCreate.value = true;
    nofity.success('Login success','/article');
    try {
        let res = await api.post('/articles', form.value);
        let articleID = res.data.data.id;
        console.log(res.data.data.id);

        console.log(file.value);
        if (file.value) {
            let formData = new FormData();
            formData.append('thumbnail', file.value)
            let res = await api.post(`/articles/${articleID}/thumbnail`, formData);
            console.log(res);
            router.push('/article')
        }
    } catch (err) {
        console.error(err)
    }
}

const handleFile = (event) => {
    let selectFile = event.target.files[0];
    console.log(selectFile);
    if (selectFile) {
        file.value = selectFile
    }
}


</script>