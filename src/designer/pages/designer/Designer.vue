<template>
  <div class="main">
    <div class="top1">
      <ToolBar :toolbars="toolbars" />
    </div>
    <div class="content">
      <div class="left o-scroll">
        <Toggle
          :direction="leftDreiction"
          :x="leftWidth"
          location="left"
          @click="collapsedLeft = !collapsedLeft"
        />
        <LeftSideBar
          :iscollapsed="collapsedLeft"
          @update:iscollapsed="
            (value) => {
              collapsedLeft = value
            }
          "
        />
      </div>
      <Canvas class="canvas border border-gray-500" />
      <div class="right o-scroll">
        <Toggle
          :x="rightWidth"
          location="right"
          :direction="rightDreiction"
          @click="collapsedRight = !collapsedRight"
        />
        <RightSideBar
          v-model:iscollapsed="collapsedRight"
          @update:iscollapsed="
            (value) => {
              collapsedRight = value
            }
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useData, useProp } from 'open-data-v/base'
import { useCanvasState } from 'open-data-v/designer/index'
import { computed, onUnmounted, provide, readonly, ref } from 'vue'

import LeftSideBar from '../../Pane/LeftSideBar'
import RightSideBar from '../../Pane/RightSideBar'
import ToolBar from '../../Pane/Toolsbar'
import Canvas from './Canvas.vue'
import Toggle from './Toggle.vue'

defineProps({
  toolbars: {
    type: Array,
    default: () => []
  }
})
const canvasState = useCanvasState()

const collapsedLeft = ref(true)
const collapsedRight = ref(true)
provide('HOOKS', readonly({ useProp, useData }))
const setLayoutData = (data) => {
  canvasState.setLayoutData(data)
}
defineExpose({ setLayoutData })

onUnmounted(() => {
  canvasState.clearCanvas()
})
const leftWidth = computed(() => (collapsedLeft.value ? '18rem' : '4rem'))
const leftDreiction = computed(() => (collapsedLeft.value ? 'left' : 'right'))

const rightWidth = computed(() => (collapsedRight.value ? '18rem' : '4rem'))
const rightDreiction = computed(() => (collapsedRight.value ? 'right' : 'left'))

const canvasWidth = computed(() => `calc(100vw - ${leftWidth.value} - ${rightWidth.value})`)
</script>
<style scoped lang="less">
@import 'open-data-v/css/index.less';

.main {
  .top1 {
    height: 4rem;
  }
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100vw;
    height: calc(95vh - 4rem);

    .canvas {
      transition-property: width;
      transition-duration: 0.5s;
      width: v-bind(canvasWidth);
    }

    .left {
      transition-property: width;
      transition-duration: 0.5s;
      width: v-bind(leftWidth);
      overflow: hidden;
    }

    .right {
      transition-property: width;
      transition-duration: 0.5s;
      width: v-bind(rightWidth);
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
