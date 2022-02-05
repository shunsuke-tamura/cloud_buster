<template>
  <div id="selection-container">
    <div id="lu">左上</div>
    <div id="ru">右上</div>
    <div id="ld">左下</div>
    <div id="rd">右下</div>
  </div>
</template>

<script>
export default {
  name: "Selection"
}
</script>

<style>
#selection-container {
  display: grid;
  grid-template-columns: 246px 246px;
  grid-template-rows: 100px 100px;
}
#lu {
  border: 3px solid;
  grid-row: 1; grid-column: 1;
  margin: 10px 2.5px 2.5px 10px;
}
#ru {
  border: 3px solid;
  grid-row: 1; grid-column: 2;
  margin: 10px 10px 2.5px 2.5px;
}
#ld {
  border: 3px solid;
  grid-row: 2; grid-column: 1;
  margin: 2.5px 2.5px 10px 10px;
}
#rd {
  border: 3px solid;
  grid-row: 2; grid-column: 2;
  margin: 2.5px 10px 10px 2.5px;
}
</style>