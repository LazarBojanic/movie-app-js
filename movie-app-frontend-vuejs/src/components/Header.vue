<script>
export default {
    name: 'Header',
    
    props: {
      title: String
    }
  }
</script>

<template>
    <div>
      <h1>{{ title }}</h1>
    </div>
</template>