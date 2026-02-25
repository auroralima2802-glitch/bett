<template>
  <div class="side-scroll-container">
    <div class="title-section">
      <div v-if="title && icon" style="display: flex; gap: 10px; justify-content: center; align-items: self-end;">
        <img style="height: 20px" :src="require(`../../assets/${icon}`)" alt="a" />
        <span>{{title}}</span>
      </div>
      <div v-else/>
      <div class="arrow-container">
        <div class="arrow left"><i class="fas fa-arrow-left"></i></div>
        <div class="arrow right"><i class="fas fa-arrow-right"></i></div>
      </div>
    </div>

    <div/>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SideScroll",

  props: {
    title: String,
    icon: String,
  },

  data() {
    return {
      slider: 0,
      left: 0,
      right: 0,
      
      isDown: false,
      startX: 0,
      scrollLeft: 0,
    }
  },
  mounted() {
    this.slider = this.title == 'Tradicional' ? this.$el.querySelector(':nth-child(4)') : this.$el.querySelector(':nth-child(3)');    
    this.left =  this.$el.querySelector('.arrow-container > .arrow.left')
    this.right = this.$el.querySelector('.arrow-container > .arrow.right')

    // A cada click desliza 85% do tamanho do container para a direção especificada
    this.left.addEventListener( 'click',()=>{this.slider.scrollLeft -= 350})
    this.right.addEventListener('click',()=>{this.slider.scrollLeft += 350})

    
    this.slider.addEventListener('scroll',(e)=>{
      const maxScroll = e.target.scrollWidth - e.target.offsetWidth
      const currentScroll = e.target.scrollLeft
      const hideAt = 15
      // const left =  this.$el.querySelector('.result-container .arrow.left')
      // const right = this.$el.querySelector('.result-container .arrow.right')

      // Esconde o botao se estiver no inicio ou no final
      this.left.classList.remove('gray')
      this.right.classList.remove('gray')
      if (currentScroll <= hideAt)  this.left.classList.add('gray')
      if (currentScroll >= maxScroll - hideAt) this.right.classList.add('gray')

    })

    this.slider.addEventListener('mousedown', (e) => {
      this.isDown = true;
      this.$el.classList.add('active');
      this.startX = e.pageX - this.slider.offsetLeft;
      this.scrollLeft = this.slider.scrollLeft;
    });
    document.addEventListener('mouseup', () => {
      this.isDown = false;
      this.$el.classList.remove('active');
    });
    document.addEventListener('mousemove', (e) => {
      if(!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.slider.offsetLeft;
      const walk = (x - this.startX) * 2; //scroll-fast
      this.slider.scrollLeft = this.scrollLeft - walk;
    });
  }
}
</script>

<style lang="scss" scoped>
.side-scroll-container {
  display: block;
  position: relative;
  cursor:grab;

  .gray {
    color: gray !important;
  }

  .title-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    span {
      color: white;
      font-size: 16px;
      font-weight: bold;
    }

    .arrow-container {
      font-weight: bold;
      display: flex;
      align-items: center;
    }

  }

 
  :nth-child(3), :nth-child(4){
    scroll-behavior: smooth;
  }
  &.active :nth-child(3){
    scroll-behavior: revert;
  }
  &.active :nth-child(4){
    scroll-behavior: revert;
  }
  
  &.active{
    cursor:grabbing;
  }
  
  .arrow {
    background: transparent;
    border: none;
    color: white;
    font-size: 14px;
    padding: 7px 20px;
    cursor: pointer;
    background: var(--bg-secondary);

    &.right {
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
      border-bottom: solid var(--border-color) 1px;
      border-top: solid var(--border-color) 1px;
      border-right: solid var(--border-color) 1px;
    }

    &.left {
      border: solid var(--border-color) 1px;
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }
  }
}


/* TESTE */


</style>