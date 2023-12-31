import { defineComponent, ref, watch } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";
import { Feature } from "@/interfaces/places";

export default defineComponent({
  name: 'SearchResults',
  setup() {

    const { isLoadingPlaces, places } = usePlacesStore();
    const { map, setPlaceMarkers } = useMapStore();
    const activePlace = ref('');

    watch(places, (newPlaces) => {
      activePlace.value = '';
      setPlaceMarkers(newPlaces);
    })

    return {
      isLoadingPlaces,
      places,
      activePlace,

      onPlaceClicked: ( place: Feature ) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;
        // Get the coords to move the camera on that site
        map.value?.flyTo({
          center: [lng, lat],
          zoom: 14,
        })
      }
    }
  }
});
