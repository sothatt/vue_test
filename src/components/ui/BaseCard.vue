<template>
    <div class="col-md-6 col-lg-3" v-for="article in articles" :key="article.id">
        <router-link :to="`/article/${article.id}`">
            <div class="card h-100 border-0 shadow-sm article-card">
            <img :src="article.thumbnail" class="card-img-top" alt="article thumbnail"
                style="height: 200px; object-fit: cover;" />

            <div class="card-body d-flex flex-column">

                <span class="badge bg-info text-dark mb-2 align-self-start">
                    {{ article.category?.name }}
                </span>
                <h5 class="fw-bold mb-2 text-truncate">
                    {{ article.title }}
                </h5>
                <!-- Content preview -->
                <p class="text-muted small flex-grow-1">
                    {{ article.content.slice(0, 80) }}...
                </p>
                <!-- Author + Date -->
                <div class="d-flex align-items-center mb-3">
                    <img :src="article.creator.avatar" class="rounded-circle me-2" width="32" height="32"
                        alt="author" />
                    <div class="small text-muted">
                        {{ article.creator.firstName }} {{ article.creator.lastName }}<br>
                        <span>{{ new Date(article.createdAt).toLocaleDateString() }}</span>
                    </div>
                </div>



            </div>
        </div>
        </router-link>
    </div>
</template>
<script setup>
let props = defineProps(
    { articles: Array, default: [] }
)
</script>