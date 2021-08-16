<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { centralStore } from "@store/centralStore.js";
import { tiendas } from "@falses/stores.js";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { capitalize } from "lodash";

export default {
  name: "page-home",
  components: {
    Carousel,
    Slide,
    Navigation
  },
  setup() {
    const router = useRouter();
    const leftDrawerState = computed(() => centralStore.state.leftDrawerOpen);

    const classMut = computed(() => {
      return [leftDrawerState.value ? null : "move-margin", "carousel-style"];
    });

    const settings = reactive({
      itemsToShow: 4,
      snapAlign: "center",
      wrapAround: false
    });

    const breakpoints = {
      335: { itemsToShow: 1 },
      425: { itemsToShow: 2 },
      768: { itemsToShow: 3 },
      1024: { itemsToShow: 4 },
      1440: { itemsToShow: 5 },
      2560: { itemsToShow: 8 }
    };

    const showProfileStore = () => {
      return router.push({
        name: "store-profile",
        params: {
          name: "other"
        }
      });
    };

    return {
      tiendas,
      settings,
      breakpoints,
      capitalize,
      classMut,
      showProfileStore
    };
  }
};
</script>

<template>
<div class="content-carousel q-pa-sm">
  <Carousel :settings="settings" :breakpoints="breakpoints" :class="classMut">
    <Slide v-for="(tienda, index) in tiendas" :key="index">
      <div class="carousel__item flex q-pa-sm" style="width: 100%;">
        <q-card style="width:100%">
          <div class="flex justify-center q-pt-sm" style="margin: -6px -9px 0;">
            <q-img :src="tienda.image" width="90%" style="border-radius: 3px 3px 0px 0px;" :ratio="16 / 14" fit="cover" :key="tienda.image" no-native-menu no-transition no-spinner />
          </div>

          <q-card-section style="padding: 5px 8px;">
            <span>
              <q-icon name="label" />
              {{ capitalize(tienda.type) }}
            </span><br />
            <strong>
              <q-icon name="store" />
              {{ capitalize(tienda.name) }}
            </strong>
          </q-card-section>

          <q-separator />

          <q-card-section style="padding:8px">
            <i>
              <q-icon name="room" />
              {{ capitalize(tienda.ubicacion) }}
            </i>
          </q-card-section>

          <div style="padding: 2px;">
            <q-btn color="one" class="full-width" no-caps label="Ver" @click="showProfileStore" style="border-radius: 0px 0px 3px 3px;" />
          </div>
        </q-card>
      </div>
    </Slide>
    <Slide>
      <div class="carousel__item" style="width: 200px;"></div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</div>
</template>

<style lang="scss">
@import "vue3-carousel/dist/carousel.css";
.content-carousel {
    position: absolute;
    width: 100%;
    display: block;
    margin-top: 30px;
    height: fit-content;
    background-color: #58537e;
    .carousel__slide {
        align-items: start !important;
    }
    .carousel * {
        text-align: left;
    }
    .move-margin {
        .carousel__track {
            padding-right: 177px;
        }
    }
}
.carousel-style {
    width: 96%;
    height: fit-content;
    margin: 0 auto;
    .carousel__next,
    .carousel__prev {
        background-color: white;
        color: #58537e;
    }
}
.mode--dark {
    .carousel-style {
        .q-card {
            background: #4f4f4f;
            color: #fff;
        }
        .carousel__next,
        .carousel__prev {
            background-color: #4f4f4f;
            color: white;
        }
    }

}
</style>
