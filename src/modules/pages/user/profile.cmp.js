import { ref, computed } from 'vue'
import { storeGlobal } from '@modules/store.cmp.js'

/** userStore --------------- **/
const { userStore, user } = storeGlobal()

/** UserBasic --------------- **/
export const userUpdateBasic = () => {
  const updateUser = ({field, value}) => {
    userStore.$patch(store => {
      store.user[field] = value
      userStore.updateUser({[field]: value})
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
      userStore.deleteUser()
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
      userStore.$patch(({ user }) => {
        user.locations[key][field] = value
        userStore.updateUser({ locations: user.locations })
      })
    }
    const deleteLocation = (index) => {
      userStore.$patch(({ user }) => {
        user.locations.splice(index, 1)
        userStore.updateUser({ locations: user.locations })
      })
    }
    const blurLocation = (field) => {
      if (_.isEmpty(field)) {
        if (addStatusLocation.value) {
          userStore.$patch(({ user }) => {
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
      userStore.$patch(({ user }) => {
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
      userStore.$patch(({ user }) => {
        user.phones[key] = value
        userStore.updateUser({ phones: user.phones })
      })
    }
    const deletePhone = (index) => {
      userStore.$patch(({ user }) => {
        user.phones.splice(index, 1)
        userStore.updateUser({ phones: user.phones })
      })
    }
    const blurPhone = (field) => {
      if (_.isEmpty(field)) {
        if (addStatusPhone.value) {
          userStore.$patch(({ user }) => {
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
      userStore.$patch(({user}) => {
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
