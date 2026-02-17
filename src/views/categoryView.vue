<template>
    <div>
        <!-- Top Navbar -->
        <Navbar></Navbar>
        <div class="d-flex">
            <!-- Sidebar -->
            <Sidebar></Sidebar>
            <!-- Main Content -->
            <div class=" content w-100 ">
                <div class="w-100 p-4 d-flex">
                    <h1>Caregory</h1>
                    <button class="btn btn-success ms-auto" @click="showCreate">Create</button>
                </div>

                <!-- ================table -->

                <BaseTable :columns="columns" :rows="categoryStore.categories" @delete="deleteCategory"
                    @edit="handleEdit" :loading="categoryStore.isLoading"></BaseTable>


                <BasePagination :totalPages=categoryStore.pagination.totalPages
                    :current=categoryStore.pagination.currentPage @update:page=handleNexPage></BasePagination>

                <!-- ===========create  -->

                <BaseModal v-if="showModal" :title="title" @close="showModal = false">
                    <div>
                        <label for="">Input :</label>
                        <input type="text" class="form-control" v-model="name" @keyup="validate">
                        <p class="text-danger">{{ emtyName }}</p>
                    </div>
                    <template #footer>
                        <button class="btn btn-secondary" @click="cancelModal">Cancel</button>
                        <button class="btn btn-success" @click="handleCreate">{{ titleBtn }}</button>
                    </template>
                </BaseModal>
                <!-- ==================Delete -->

                <BaseModal v-if="modalDelete" @close="cancelDelete">
                    <div>
                        <p class="text-center">Are you Delete Category ?</p>
                    </div>
                    <template #footer>
                        <button class="btn btn-primary me-auto px-5 ms-5" @click="cancelDelete">Cancel</button>
                        <button class="btn btn-danger px-5 me-5" @click="confirmDelete">Delete</button>
                    </template>

                </BaseModal>

                <!-- ==============Edit  -->

            </div>
        </div>
    </div>
</template>
<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { useCategoryStore } from '@/stores/category';
import BaseTable from '@/components/ui/BaseTable.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { onMounted, ref, watch } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import api from '@/api/http';




// ================ALL VARAIBLE
const name = ref('')
const emtyName = ref('');
const title = ref("Create category")
const showModal = ref(false)
const per_page = ref(10);
const categoryStore = useCategoryStore();
const modalDelete = ref(false)
const titleBtn = ref("create");
const isEdit = ref(false)
const columns = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
]

// ==========================Fetch data from API category

onMounted(async () => {
    await categoryStore.fetchCategory(1, per_page.value);
})

// -=================create 
function cancelModal() {
    showModal.value = false;
    emtyName.value = "";
    name.value = "";
}

function showCreate() {
    showModal.value = true;
    titleBtn.value = "Create"
    title.value = "Create"
}

const handleCreate = async () => {
    try {
        if (!isEdit.value) {
            console.log(name.value);
            let res = await api.post(`/categories`, { name: name.value });
            // await categoryStore.fetchCategory()
            console.log(res);
            // showModal.value = false

        } else {
            let res = await api.put(`/categories/${isEdit.value}`, { name: name.value }
            );
            console.log(res);
            isEdit.value = false
            await categoryStore.fetchCategory(1, per_page.value);
        }
    }

    catch (e) {
        console.error(e)
    }
    finally{
        name.value = "";
        showModal.value = false
    }
}

// =======================Edit

const handleEdit = async (id) => {

    isEdit.value = id;
    showModal.value = true;
    title.value = 'Update Category'
    titleBtn.value = 'Update'
    let res = await api.get(`/categories/${id}`);
    name.value = res.data.data.name;
}


// =========================Delete

function cancelDelete() {
    modalDelete.value = false;
}

let deleteId = ref(null)
function deleteCategory(id) {
    modalDelete.value = true;
    deleteId.value = id
}

const confirmDelete = async () => {
    try {
        let res = await api.delete(`/categories/${deleteId.value}`);
        modalDelete.value = false;
        await categoryStore.fetchCategory(1, per_page.value);
    }
    catch (e) {
        console.error(e);
    }
}


// ==================================2. pagination

const handleNexPage = async (page) => {
    await categoryStore.fetchCategory(page, per_page.value);
}



</script>