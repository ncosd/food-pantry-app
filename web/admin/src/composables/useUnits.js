import { ref } from 'vue'

export function useUnits() {

  const units = ref([
    {
      'name':'ounces',
      'displayName': 'Ounces (dry)',
    },
    {
      'name': 'ounces-liquid',
      'displayName': 'Ounces (liquid)',
    },
    {
      'name': 'pounds',
      'displayName': 'Pounds',
    }
  ])

  return {
    units
  }
}
