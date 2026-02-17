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
                        <h5 class="fw-bold mb-3">Update New Article</h5>
                        <form @submit.prevent="handleUpdate">
                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input type="text" class="form-control" placeholder="Enter article title" v-model="form.title" />
                            </div>

                            <!-- Category -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <!-- {{ categoryStore.categories }} -->
                                <select class="form-select" v-model="form.categoryId">
                                    <option selected disabled>Choose category</option>
                                    <option v-for="category in categoryStore.categories" :key=category.id  
                                    :value="category.id">
                                    {{ category.name }}
                                </option>
                                </select>
                            </div>
                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input type="file"  class="form-control" @change="handleFile" />
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" rows="5" v-model="form.content"
                                    placeholder="Write your article content..."></textarea>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <button type="reset" class="btn btn-outline-secondary">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Update Article
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
import { useRoute } from 'vue-router';
import api from '@/api/http';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const categoryStore = useCategoryStore()
import { onMounted } from 'vue';
let id = route.params.id;
let file = ref(null)
let form = ref({
    title:'',
    content:'',
    categoryId:''
})

onMounted ( async () =>{
    categoryStore.fetchCategory();
    try{
        let res = await api.get(`/articles/${id}`);
        let article = res.data.data;
        form.value.title = article.title
        form.value.content = article.content
        form.value.categoryId = article.category?.id
    }catch(error){
        console.error(error)
    }
})
const handleUpdate = async () =>{
    console.log(form.value);
    try{
        let res = await api.put('/articles/'+ id, form.value);
        console.log(res);
        let articleID = res.data.data.id;
        if(file.value){
            let formData = new FormData();
            formData.append('thumbnail', file.value)
            let res = await api.post(`/articles/${articleID}/thumbnail`, formData);
        }
        router.push('/article');
    }catch(err){
        console.error(err)
    }
}

const handleFile = (event) => {
    let selectFile = event.target.files[0];
    console.log(selectFile);
    if(selectFile){
        file.value = selectFile
    }
}
</script>