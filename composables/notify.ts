
import { useQuasar } from 'quasar'

export const notify= () =>  {

    const $q = useQuasar()

    console.log($q.platform.is.ios)

    // showing an example on a method, but
    // can be any part of Vue script
    function show () {
      // prints out Quasar version
      console.log($q.version)
    }

    return {
      show
    }
  
}
