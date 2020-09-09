<template>
  <div class="container">
    <div class="row">
      <div class="col-md col-12">
        <h1>EVENTS PAGE</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quam placeat magnam quia neque necessitatibus perferendis, pariatur sint porro veritatis possimus alias consequatur numquam ab voluptatibus. Veniam, rem beatae? Enim.</p>
      </div>
      <div class="col-md col-12">
        <h1>Next</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quam placeat magnam quia neque necessitatibus perferendis, pariatur sint porro veritatis possimus alias consequatur numquam ab voluptatibus. Veniam, rem beatae? Enim.</p>
      </div>
    </div>
    <hr>
    <ScheduleComponent />
  </div>
</template>

<script>
import ScheduleComponent from '../components/Schedule';
export default {
    components: {
        ScheduleComponent,
    }
};
</script>

<style scoped>
hr {
    height: 30px;
}
</style>