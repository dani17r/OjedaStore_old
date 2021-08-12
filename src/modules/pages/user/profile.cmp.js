import { ref, computed } from 'vue'
import { storeGlobal } from '@modules/store.cmp.js'

/** clientStore --------------- **/
const { clientStore, user } = storeGlobal()

/** UserBasic --------------- **/
export const userUpdateBasic = () => {
  const updateUser = ({field, value}) => {
    clientStore.$patch(store => {
      store.user[field] = value
      clientStore.update({[field]: value})
    })
  }

  return {
    updateUser
  }
}

export const deleteAccount = () => {
  const deleteUser = ($q) => {
    $q.dialog({
      title: 'Eliminar mi cuenta de usuario',
      message: 'Esta seguro que quiere eliminarla?. Puede arrepentirse.',
      cancel: 'No',
      ok: 'Si'
    }).onOk(() => {
      $q.loading.show()
      clientStore.delete()
      setTimeout(() => location.reload(), 700)
    })
  }

  return {
    deleteUser
  }
}


/** locations --------------- **/
export const userUpdateLocations = () => {

    const addStatusLocation = ref(false)
    const editAddress = ref(false)

    const updateLocation = ({ field, value, key }) => {
      clientStore.$patch(({ user }) => {
        user.locations[key][field] = value
        clientStore.update({ locations: user.locations })
      })
    }
    const deleteLocation = (index) => {
      clientStore.$patch(({ user }) => {
        user.locations.splice(index, 1)
        clientStore.update({ locations: user.locations })
      })
    }
    const blurLocation = (field) => {
      if (_.isEmpty(field)) {
        if (addStatusLocation.value) {
          clientStore.$patch(({ user }) => {
            user.locations.pop()
          })
          setTimeout(function() {
            addStatusLocation.value = false
          }, 250)
        }
      }
    }
    const addLocation = (field) => {
      addStatusLocation.value = true
      editAddress.value = true
      clientStore.$patch(({ user }) => {
        user.locations.push({
          address: '',
          reference: '',
        })
      })
    }

  return {
    updateLocation,
    deleteLocation,
    blurLocation,
    addLocation,
    editAddress,
  }
}

/** Phones --------------- **/
export const userUpdatePhones = () => {

    const addStatusPhone = ref(false)
    const editPhone = ref(false)

    const updatePhone = ({ value, key }) => {
      clientStore.$patch(({ user }) => {
        user.phones[key] = value
        clientStore.update({ phones: user.phones })
      })
    }
    const deletePhone = (index) => {
      clientStore.$patch(({ user }) => {
        user.phones.splice(index, 1)
        clientStore.update({ phones: user.phones })
      })
    }
    const blurPhone = (field) => {
      if (_.isEmpty(field)) {
        if (addStatusPhone.value) {
          clientStore.$patch(({ user }) => {
            user.phones.pop()
          })
          setTimeout(function() {
            addStatusPhone.value = false
          }, 250)
        }
      }
    }
    const addPhone = () => {
      addStatusPhone.value = true
      editPhone.value = true
      clientStore.$patch(({user}) => {
        user.phones.push('')
      })
    }

  return {
    deletePhone,
    updatePhone,
    editPhone,
    blurPhone,
    addPhone,
  }
}
