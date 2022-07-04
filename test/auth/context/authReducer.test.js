import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types"

describe('authReducer test', () => { 


  test('debe de devolver el valor por defecto', () => { 
    
    const auth = authReducer({ logged: false }, '')

    expect(auth).toEqual({ logged: false })

  })


  test('debe de hacer login y establecer los valores', () => { 
    
    const action = { 
        type: types.login, 
        payload: { 
          id: '123', 
          name: 'Ismael' 
        } 
      }

    const auth = authReducer({ logged: false }, action)

    expect(auth).toEqual({ logged: true, user: action.payload })

  })

  test('debe de hacer logout y establecer los valores', () => { 
    
    const auth = authReducer({ logged: true, user: { id: '123', name: 'Ismael' } }, { type: types.logout })

    expect(auth).toEqual({ logged: false })

  })

 })