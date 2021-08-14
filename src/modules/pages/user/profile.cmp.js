import {ref, computed, reactive} from 'vue'
import {storeGlobal} from '@modules/store.cmp.js'

/** clientStore --------------- **/
const { clientStore, user } = storeGlobal()

/** UserBasic --------------- **/
export const userUpdateBasic = () => {
  const updateUser = ({field, value}) => {
    user.value[field] = value
    clientStore.updateClient({[field]: value})
  }

  return {updateUser}
}

export const deleteAccount = () => {
  const deleteUser = ($q) => {
    $q.dialog({title: 'Eliminar mi cuenta de usuario', message: 'Esta seguro que quiere eliminarla?. Puede arrepentirse.', cancel: 'No', ok: 'Si'}).onOk(() => {
      $q.loading.show()
      clientStore.deleteClient()
      setTimeout(() => location.reload(), 700)
    })
  }

  return {deleteUser}
}

/** locations --------------- **/
export const userUpdateLocations = () => {

  const addStatusLocation = ref(false)
  const editAddress = ref(false)

  const updateLocation = ({field, value, key}) => {
    user.value.locations[key][field] = value
    clientStore.updateClient({locations: user.value.locations})
  }
  const deleteLocation = (index) => {
    user.value.locations.splice(index, 1)
    clientStore.updateClient({locations: user.value.locations})
  }
  const blurLocation = (field) => {
    if (_.isEmpty(field)) {
      if (addStatusLocation.value) {
        user.value.locations.pop()
        setTimeout(function() {
          addStatusLocation.value = false
        }, 250)
      }
    }
  }
  const addLocation = (field) => {
    addStatusLocation.value = true
    editAddress.value = true
    user.value.locations.push({address: '', reference: ''})
  }

  return {updateLocation, deleteLocation, blurLocation, addLocation, editAddress}
}

/** Phones --------------- **/
export const userUpdatePhones = () => {

  const addStatusPhone = ref(false)
  const editPhone = ref(false)

  const updatePhone = ({value, key}) => {
    user.value.phones[key] = value
    clientStore.updateClient({phones: user.value.phones})
  }
  const deletePhone = (index) => {
    user.value.phones.splice(index, 1)
    clientStore.updateClient({phones: user.value.phones})
  }
  const blurPhone = (field) => {
    if (_.isEmpty(field)) {
      if (addStatusPhone.value) {
        user.value.phones.pop()
        setTimeout(function() {
          addStatusPhone.value = false
        }, 250)
      }
    }
  }
  const addPhone = () => {
    addStatusPhone.value = true
    editPhone.value = true
    user.value.phones.push('')
  }

  return {deletePhone, updatePhone, editPhone, blurPhone, addPhone}
}
